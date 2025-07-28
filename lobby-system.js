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
        this.startSyncTimer();
    }

    // Загрузка данных из localStorage
    loadData() {
        const savedChallenges = localStorage.getItem('lobby_challenges');
        const savedRatings = localStorage.getItem('lobby_ratings');
        
        if (savedChallenges) {
            this.activeChallenges = JSON.parse(savedChallenges);
        }
        
        if (savedRatings) {
            this.ratings = JSON.parse(savedRatings);
        }
    }

    // Сохранение данных в localStorage
    saveData() {
        localStorage.setItem('lobby_challenges', JSON.stringify(this.activeChallenges));
        localStorage.setItem('lobby_ratings', JSON.stringify(this.ratings));
    }

    // Таймер для синхронизации данных между вкладками
    startSyncTimer() {
        setInterval(() => {
            this.loadData(); // Перезагружаем данные каждые 2 секунды
        }, 2000);
    }

    // Проверить, есть ли уже активный вызов от пользователя
    hasActiveChallenge(playerId) {
        return this.activeChallenges.some(challenge => 
            challenge.challenger === playerId && 
            challenge.status === 'active'
        );
    }

    // Создать публичный вызов
    createPublicChallenge(player, bet, minLevel = 1, password = '') {
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
        this.saveData();
        
        // Очищаем старые вызовы
        this.cleanupOldChallenges();
        
        return challenge;
    }

    // Принять публичный вызов
    acceptPublicChallenge(challengeId, player, password = '') {
        const challenge = this.activeChallenges.find(c => c.id === challengeId);
        if (!challenge || challenge.status !== 'active') {
            return { error: 'Вызов не найден или уже неактивен' };
        }

        // Проверяем, что игрок не принимает свой собственный вызов
        if (challenge.challenger === player.id) {
            return { error: 'Вы не можете принять свой собственный вызов' };
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

        challenge.status = 'accepted';
        challenge.acceptor = player.id;
        challenge.acceptorName = player.name;
        challenge.acceptedAt = Date.now();

        this.saveData();
        return challenge;
    }

    // Отменить вызов
    cancelChallenge(challengeId, playerId) {
        const challenge = this.activeChallenges.find(c => c.id === challengeId);
        if (challenge && challenge.challenger === playerId) {
            challenge.status = 'cancelled';
            challenge.cancelledAt = Date.now();
            this.saveData();
            return true;
        }
        return false;
    }

    // Получить активные вызовы
    getActiveChallenges(searchTerm = '', showPrivate = true) {
        let challenges = this.activeChallenges.filter(challenge => 
            challenge.status === 'active' && 
            challenge.expiresAt > Date.now()
        );

        // Фильтруем приватные вызовы
        if (!showPrivate) {
            challenges = challenges.filter(challenge => !challenge.isPrivate);
        }

        // Фильтруем по поисковому запросу
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            challenges = challenges.filter(challenge => 
                challenge.challengerName.toLowerCase().includes(term) ||
                challenge.bet.toString().includes(term)
            );
        }

        // Сортируем по времени создания (новые сверху)
        challenges.sort((a, b) => b.createdAt - a.createdAt);

        return challenges;
    }

    // Очистка старых вызовов
    cleanupOldChallenges() {
        const now = Date.now();
        this.activeChallenges = this.activeChallenges.filter(challenge => 
            challenge.expiresAt > now || challenge.status === 'accepted'
        );
        this.saveData();
    }

    // Получить вызовы пользователя
    getUserChallenges(playerId) {
        return this.activeChallenges.filter(challenge => 
            challenge.challenger === playerId
        );
    }

    // Записать результат дуэли
    recordDuelResult(winner, loser, bet) {
        const result = {
            winner: winner.id,
            winnerName: winner.name,
            loser: loser.id,
            loserName: loser.name,
            bet: bet,
            timestamp: Date.now()
        };

        // Обновляем рейтинги
        this.updateRating(this.ratings.daily, winner, loser, bet, 'daily');
        this.updateRating(this.ratings.weekly, winner, loser, bet, 'weekly');
        this.updateRating(this.ratings.monthly, winner, loser, bet, 'monthly');

        this.saveData();
        return result;
    }

    // Обновление рейтинга
    updateRating(ratingArray, winner, loser, bet, period) {
        const now = Date.now();
        const periodStart = this.getPeriodStart(period);

        // Очищаем старые записи
        ratingArray = ratingArray.filter(record => record.timestamp >= periodStart);

        // Добавляем новую запись
        ratingArray.push({
            winner: winner.id,
            winnerName: winner.name,
            loser: loser.id,
            loserName: loser.name,
            bet: bet,
            timestamp: now
        });

        // Обновляем соответствующий массив
        this.ratings[period] = ratingArray;
    }

    // Получить начало периода
    getPeriodStart(period) {
        const now = new Date();
        switch (period) {
            case 'daily':
                return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            case 'weekly':
                return this.getWeekStart();
            case 'monthly':
                return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
            default:
                return now.getTime();
        }
    }

    // Получить начало недели
    getWeekStart() {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(now.setDate(diff)).getTime();
    }

    // Получить топ игроков
    getTopPlayers(period = 'daily', limit = 10) {
        const records = this.ratings[period] || [];
        const playerStats = {};

        // Подсчитываем статистику для каждого игрока
        records.forEach(record => {
            if (!playerStats[record.winner]) {
                playerStats[record.winner] = { wins: 0, losses: 0, totalBet: 0, name: record.winnerName };
            }
            if (!playerStats[record.loser]) {
                playerStats[record.loser] = { wins: 0, losses: 0, totalBet: 0, name: record.loserName };
            }

            playerStats[record.winner].wins++;
            playerStats[record.winner].totalBet += record.bet;
            playerStats[record.loser].losses++;
            playerStats[record.loser].totalBet += record.bet;
        });

        // Преобразуем в массив и сортируем
        const topPlayers = Object.entries(playerStats)
            .map(([id, stats]) => ({
                id: parseInt(id),
                name: stats.name,
                wins: stats.wins,
                losses: stats.losses,
                totalBet: stats.totalBet,
                winRate: stats.wins / (stats.wins + stats.losses)
            }))
            .sort((a, b) => b.winRate - a.winRate || b.totalBet - a.totalBet)
            .slice(0, limit);

        return topPlayers;
    }

    // Получить статистику игрока
    getPlayerStats(playerId) {
        const stats = {
            daily: { wins: 0, losses: 0, totalBet: 0 },
            weekly: { wins: 0, losses: 0, totalBet: 0 },
            monthly: { wins: 0, losses: 0, totalBet: 0 }
        };

        ['daily', 'weekly', 'monthly'].forEach(period => {
            const records = this.ratings[period] || [];
            records.forEach(record => {
                if (record.winner === playerId) {
                    stats[period].wins++;
                    stats[period].totalBet += record.bet;
                } else if (record.loser === playerId) {
                    stats[period].losses++;
                    stats[period].totalBet += record.bet;
                }
            });
        });

        return stats;
    }

    // Очистка старых данных
    cleanupOldData() {
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        const weekMs = 7 * dayMs;
        const monthMs = 30 * dayMs;

        // Очищаем старые записи рейтингов
        this.ratings.daily = this.ratings.daily.filter(record => 
            now - record.timestamp < dayMs
        );
        this.ratings.weekly = this.ratings.weekly.filter(record => 
            now - record.timestamp < weekMs
        );
        this.ratings.monthly = this.ratings.monthly.filter(record => 
            now - record.timestamp < monthMs
        );

        // Очищаем старые вызовы
        this.cleanupOldChallenges();

        this.saveData();
    }
}

// Создаем глобальный экземпляр
window.lobbySystem = new LobbySystem(); 