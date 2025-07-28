// Система игрового лобби для PvP дуэлей

class LobbySystem {
    constructor() {
        this.activeChallenges = [];
        this.players = [];
        this.ratings = {
            daily: [],
            weekly: [],
            monthly: []
        };
        this.loadData();
        this.startGlobalSync();
    }

    // Загрузка данных из localStorage и серверного файла
    async loadData() {
        const savedChallenges = localStorage.getItem('global_lobby_challenges');
        const savedRatings = localStorage.getItem('lobby_ratings');
        
        if (savedChallenges) {
            this.activeChallenges = JSON.parse(savedChallenges);
        }
        
        if (savedRatings) {
            this.ratings = JSON.parse(savedRatings);
        }

        // Пытаемся загрузить данные с сервера
        try {
            const response = await fetch('challenges-server.json');
            if (response.ok) {
                const serverData = await response.json();
                if (serverData.challenges && serverData.challenges.length > 0) {
                    // Объединяем данные с сервера и локальные
                    const serverChallenges = serverData.challenges.filter(c => c.status === 'active');
                    this.activeChallenges = [...this.activeChallenges, ...serverChallenges];
                    // Удаляем дубликаты
                    this.activeChallenges = this.activeChallenges.filter((challenge, index, self) => 
                        index === self.findIndex(c => c.id === challenge.id)
                    );
                }
            }
        } catch (error) {
            console.log('Не удалось загрузить данные с сервера:', error);
        }
    }

    // Сохранение данных в localStorage и на сервер
    async saveData() {
        localStorage.setItem('global_lobby_challenges', JSON.stringify(this.activeChallenges));
        localStorage.setItem('lobby_ratings', JSON.stringify(this.ratings));

        // Сохраняем на сервер
        try {
            const serverData = {
                challenges: this.activeChallenges,
                lastUpdate: new Date().toISOString(),
                version: "1.0"
            };
            
            // В реальном приложении здесь был бы POST запрос
            // Пока сохраняем в localStorage как fallback
            localStorage.setItem('server_challenges_backup', JSON.stringify(serverData));
        } catch (error) {
            console.log('Не удалось сохранить на сервер:', error);
        }
    }

    // Запуск глобальной синхронизации
    startGlobalSync() {
        // Проверяем обновления каждые 3 секунды
        setInterval(() => {
            this.syncWithGlobalStorage();
        }, 3000);

        // Слушаем изменения в localStorage других вкладок
        window.addEventListener('storage', (e) => {
            if (e.key === 'global_lobby_challenges') {
                this.loadData();
                this.broadcastChallengeUpdate();
            }
        });
    }

    // Синхронизация с глобальным хранилищем
    syncWithGlobalStorage() {
        const globalChallenges = localStorage.getItem('global_lobby_challenges');
        if (globalChallenges) {
            try {
                const globalData = JSON.parse(globalChallenges);
                // Принудительно обновляем активные вызовы
                this.activeChallenges = globalData.filter(c => c.status === 'active');
                console.log('Синхронизация: загружено', this.activeChallenges.length, 'активных вызовов');
                this.broadcastChallengeUpdate();
            } catch (error) {
                console.error('Ошибка синхронизации:', error);
            }
        } else {
            // Если нет данных в localStorage, сохраняем текущие
            this.saveData();
        }
    }

    // Проверить, есть ли уже активный вызов от игрока
    hasActiveChallenge(playerId) {
        return this.activeChallenges.some(c => 
            c.challenger === playerId && c.status === 'active'
        );
    }

    // Создать публичный вызов
    async createPublicChallenge(player, bet, minLevel = 1, password = '') {
        // Проверяем, нет ли уже активного вызова от этого игрока
        if (this.hasActiveChallenge(player.id)) {
            return { error: 'У вас уже есть активный вызов. Отмените его перед созданием нового.' };
        }

        const challenge = {
            id: Date.now() + Math.random(),
            challenger: player.id,
            challengerName: player.name,
            challengerLevel: player.level,
            bet: bet,
            minLevel: minLevel,
            password: password, // Пароль для приватных вызовов
            isPrivate: password.length > 0, // Приватный ли вызов
            status: 'active',
            createdAt: Date.now(),
            expiresAt: Date.now() + (30 * 60 * 1000) // 30 минут
        };

        this.activeChallenges.push(challenge);
        await this.saveData();
        
        // Обновляем данные в реальном времени для других игроков
        this.broadcastChallengeUpdate();
        
        return challenge;
    }

    // Принять публичный вызов
    acceptPublicChallenge(challengeId, player, password = '') {
        const challenge = this.activeChallenges.find(c => c.id === challengeId);
        if (!challenge || challenge.status !== 'active') {
            return { error: 'Вызов не найден или уже неактивен' };
        }

        // Проверяем пароль для приватных вызовов
        if (challenge.isPrivate && challenge.password !== password) {
            return { error: 'Неверный пароль для этого вызова' };
        }

        // Проверяем уровень
        if (player.level < challenge.minLevel) {
            return { error: 'Недостаточный уровень для этого вызова' };
        }

        // Проверяем XP
        if (player.xp < challenge.bet) {
            return { error: 'Недостаточно XP для принятия вызова' };
        }

        // Проверяем, не пытается ли игрок принять свой собственный вызов
        if (challenge.challenger === player.id) {
            return { error: 'Вы не можете принять свой собственный вызов' };
        }

        challenge.status = 'accepted';
        challenge.acceptor = player.id;
        challenge.acceptorName = player.name;
        challenge.acceptedAt = Date.now();

        this.saveData();
        
        // Обновляем данные в реальном времени
        this.broadcastChallengeUpdate();
        
        return challenge;
    }

    // Отменить вызов
    async cancelChallenge(challengeId, playerId) {
        const challenge = this.activeChallenges.find(c => c.id === challengeId);
        if (challenge && challenge.challenger === playerId) {
            challenge.status = 'cancelled';
            challenge.cancelledAt = Date.now();
            await this.saveData();
            
            // Обновляем данные в реальном времени
            this.broadcastChallengeUpdate();
            
            return true;
        }
        return false;
    }

    // Получить активные вызовы
    getActiveChallenges(searchTerm = '', showPrivate = true) {
        const now = Date.now();
        // Удаляем просроченные вызовы
        this.activeChallenges = this.activeChallenges.filter(c => 
            c.status === 'active' && c.expiresAt > now
        );
        this.saveData();
        
        let challenges = this.activeChallenges.filter(c => c.status === 'active');
        
        // Фильтруем по поиску
        if (searchTerm) {
            challenges = challenges.filter(c => 
                c.challengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.bet.toString().includes(searchTerm) ||
                c.minLevel.toString().includes(searchTerm)
            );
        }
        
        // Фильтруем приватные вызовы
        if (!showPrivate) {
            challenges = challenges.filter(c => !c.isPrivate);
        }
        
        return challenges;
    }

    // Обновить данные в реальном времени
    broadcastChallengeUpdate() {
        // В реальном приложении здесь был бы WebSocket или Server-Sent Events
        // Для MVP используем localStorage как источник истины
        localStorage.setItem('lobby_last_update', Date.now().toString());
        
        // Вызываем событие для обновления UI
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('lobbyUpdate', {
                detail: { challenges: this.activeChallenges }
            }));
        }
    }

    // Записать результат дуэли
    recordDuelResult(winner, loser, bet) {
        const now = Date.now();
        const today = new Date().toDateString();
        const weekStart = this.getWeekStart();
        const monthStart = this.getMonthStart();

        // Обновляем рейтинги
        this.updateRating(this.ratings.daily, winner, loser, bet, today);
        this.updateRating(this.ratings.weekly, winner, loser, bet, weekStart);
        this.updateRating(this.ratings.monthly, winner, loser, bet, monthStart);

        this.saveData();
    }

    // Обновить рейтинг
    updateRating(ratingArray, winner, loser, bet, period) {
        // Находим или создаем записи для игроков
        let winnerRecord = ratingArray.find(r => r.playerId === winner.id && r.period === period);
        let loserRecord = ratingArray.find(r => r.playerId === loser.id && r.period === period);

        if (!winnerRecord) {
            winnerRecord = {
                playerId: winner.id,
                playerName: winner.name,
                period: period,
                wins: 0,
                losses: 0,
                totalBet: 0,
                rating: 1000
            };
            ratingArray.push(winnerRecord);
        }

        if (!loserRecord) {
            loserRecord = {
                playerId: loser.id,
                playerName: loser.name,
                period: period,
                wins: 0,
                losses: 0,
                totalBet: 0,
                rating: 1000
            };
            ratingArray.push(loserRecord);
        }

        // Обновляем статистику
        winnerRecord.wins++;
        winnerRecord.totalBet += bet;
        winnerRecord.rating += 25;

        loserRecord.losses++;
        loserRecord.totalBet += bet;
        loserRecord.rating = Math.max(0, loserRecord.rating - 15);

        // Сортируем по рейтингу
        ratingArray.sort((a, b) => b.rating - a.rating);
    }

    // Получить начало недели
    getWeekStart() {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        return new Date(now.setDate(diff)).toDateString();
    }

    // Получить начало месяца
    getMonthStart() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1).toDateString();
    }

    // Получить топ игроков
    getTopPlayers(period = 'daily', limit = 10) {
        const ratings = this.ratings[period] || [];
        return ratings.slice(0, limit);
    }

    // Получить статистику игрока
    getPlayerStats(playerId) {
        const stats = {
            daily: this.ratings.daily.find(r => r.playerId === playerId),
            weekly: this.ratings.weekly.find(r => r.playerId === playerId),
            monthly: this.ratings.monthly.find(r => r.playerId === playerId)
        };

        return {
            daily: stats.daily || { wins: 0, losses: 0, rating: 1000 },
            weekly: stats.weekly || { wins: 0, losses: 0, rating: 1000 },
            monthly: stats.monthly || { wins: 0, losses: 0, rating: 1000 }
        };
    }

    // Очистка старых данных
    cleanupOldData() {
        const now = Date.now();
        const oneDayAgo = now - (24 * 60 * 60 * 1000);
        const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

        // Очищаем старые вызовы
        this.activeChallenges = this.activeChallenges.filter(c => 
            c.createdAt > oneDayAgo || c.status === 'active'
        );

        // Очищаем старые рейтинги
        this.ratings.daily = this.ratings.daily.filter(r => 
            new Date(r.period).getTime() > oneDayAgo
        );
        this.ratings.weekly = this.ratings.weekly.filter(r => 
            new Date(r.period).getTime() > oneWeekAgo
        );
        this.ratings.monthly = this.ratings.monthly.filter(r => 
            new Date(r.period).getTime() > oneMonthAgo
        );

        this.saveData();
    }
}

// Экспортируем для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LobbySystem;
} 