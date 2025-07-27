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

    // Создать публичный вызов
    createPublicChallenge(player, bet, minLevel = 1) {
        const challenge = {
            id: Date.now() + Math.random(),
            challenger: player.id,
            challengerName: player.name,
            challengerLevel: player.level,
            bet: bet,
            minLevel: minLevel,
            status: 'active',
            createdAt: Date.now(),
            expiresAt: Date.now() + (30 * 60 * 1000) // 30 минут
        };

        this.activeChallenges.push(challenge);
        this.saveData();
        return challenge;
    }

    // Принять публичный вызов
    acceptPublicChallenge(challengeId, player) {
        const challenge = this.activeChallenges.find(c => c.id === challengeId);
        if (!challenge || challenge.status !== 'active') {
            return null;
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
    getActiveChallenges() {
        const now = Date.now();
        // Удаляем просроченные вызовы
        this.activeChallenges = this.activeChallenges.filter(c => 
            c.status === 'active' && c.expiresAt > now
        );
        this.saveData();
        
        return this.activeChallenges.filter(c => c.status === 'active');
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

    // Очистить старые данные
    cleanupOldData() {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Очищаем старые рейтинги
        this.ratings.daily = this.ratings.daily.filter(r => 
            new Date(r.period) > oneDayAgo
        );
        this.ratings.weekly = this.ratings.weekly.filter(r => 
            new Date(r.period) > oneWeekAgo
        );
        this.ratings.monthly = this.ratings.monthly.filter(r => 
            new Date(r.period) > oneMonthAgo
        );

        this.saveData();
    }
}

// Экспорт для использования в основной игре
window.LobbySystem = LobbySystem; 