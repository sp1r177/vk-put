// Системы турниров, гильдий и PvP дуэлей для "Путь Героя"

// === PvP СИСТЕМА ДУЭЛЕЙ ===
class PvPSystem {
    constructor() {
        this.activeDuels = new Map();
        this.duelQueue = [];
        this.duelQuestions = this.generateDuelQuestions();
    }

    // Генерация специальных вопросов для дуэлей (более сложные)
    generateDuelQuestions() {
        return [
            {
                question: "В ситуации, где нужно выбрать между спасением одного близкого человека или группы незнакомцев, что выберете?",
                options: [
                    "Спасаю близкого человека",
                    "Спасаю группу незнакомцев", 
                    "Пытаюсь спасти всех, рискуя собой"
                ],
                correctAnswer: 2, // Нет правильного ответа, оценивается по логике
                difficulty: "hard"
            },
            {
                question: "Вы обнаружили, что ваш начальник нарушает закон, но это приносит пользу компании и вашей карьере. Ваши действия?",
                options: [
                    "Сообщаю в соответствующие органы",
                    "Уговариваю начальника исправиться",
                    "Молчу, так как это выгодно всем"
                ],
                correctAnswer: 1,
                difficulty: "hard"
            },
            {
                question: "В экстремальной ситуации у вас есть ресурсы только для спасения одного из двух людей. Кого выберете?",
                options: [
                    "Молодого человека с потенциалом",
                    "Пожилого человека с опытом",
                    "Бросаю жребий"
                ],
                correctAnswer: 2,
                difficulty: "extreme"
            }
        ];
    }

    // Создать вызов на дуэль
    createChallenge(challenger, target, bet = 100) {
        const challenge = {
            id: Date.now() + Math.random(),
            challenger: challenger,
            target: target,
            bet: bet,
            status: 'pending',
            createdAt: Date.now()
        };
        
        this.duelQueue.push(challenge);
        return challenge;
    }

    // Принять вызов
    acceptChallenge(challengeId, target) {
        const challenge = this.duelQueue.find(c => c.id === challengeId);
        if (!challenge || challenge.target !== target) return false;

        challenge.status = 'accepted';
        challenge.acceptedAt = Date.now();
        
        // Создаем активную дуэль
        const duel = {
            id: challengeId,
            challenger: challenge.challenger,
            target: challenge.target,
            bet: challenge.bet,
            questions: this.getRandomQuestions(10),
            challengerScore: 0,
            targetScore: 0,
            currentQuestion: 0,
            status: 'active',
            startTime: Date.now()
        };

        this.activeDuels.set(challengeId, duel);
        return duel;
    }

    // Получить случайные вопросы для дуэли
    getRandomQuestions(count) {
        const shuffled = [...this.duelQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Ответить на вопрос дуэли
    answerDuelQuestion(duelId, playerId, answerIndex, timeSpent) {
        const duel = this.activeDuels.get(duelId);
        if (!duel || duel.status !== 'active') return null;

        const question = duel.questions[duel.currentQuestion];
        const isChallenger = playerId === duel.challenger;
        
        // Оценка ответа (более сложная логика)
        const score = this.evaluateAnswer(answerIndex, question, timeSpent);
        
        if (isChallenger) {
            duel.challengerScore += score;
        } else {
            duel.targetScore += score;
        }

        duel.currentQuestion++;
        
        // Проверяем, закончилась ли дуэль
        if (duel.currentQuestion >= duel.questions.length) {
            return this.finishDuel(duelId);
        }

        return {
            type: 'answer',
            score: score,
            currentScore: isChallenger ? duel.challengerScore : duel.targetScore,
            nextQuestion: duel.questions[duel.currentQuestion]
        };
    }

    // Оценка ответа
    evaluateAnswer(answerIndex, question, timeSpent) {
        let baseScore = 10;
        
        // Бонус за быстрый ответ
        if (timeSpent < 5000) baseScore += 5;
        if (timeSpent < 3000) baseScore += 5;
        
        // Бонус за сложность
        if (question.difficulty === 'hard') baseScore += 10;
        if (question.difficulty === 'extreme') baseScore += 20;
        
        // Логическая оценка ответа
        const logicBonus = this.evaluateLogic(answerIndex, question);
        
        return baseScore + logicBonus;
    }

    // Оценка логики ответа
    evaluateLogic(answerIndex, question) {
        // Здесь можно добавить более сложную логику оценки
        const logicScores = [5, 15, 10]; // Примерные оценки для каждого варианта
        return logicScores[answerIndex] || 5;
    }

    // Завершить дуэль
    finishDuel(duelId) {
        const duel = this.activeDuels.get(duelId);
        if (!duel) return null;

        const winner = duel.challengerScore > duel.targetScore ? duel.challenger : duel.target;
        const loser = winner === duel.challenger ? duel.target : duel.challenger;

        duel.status = 'finished';
        duel.winner = winner;
        duel.finalScore = {
            challenger: duel.challengerScore,
            target: duel.targetScore
        };

        return {
            type: 'finished',
            winner: winner,
            loser: loser,
            finalScore: duel.finalScore,
            bet: duel.bet
        };
    }
}

// === СИСТЕМА ТУРНИРОВ ===
class TournamentSystem {
    constructor() {
        this.tournaments = new Map();
        this.activeTournaments = new Map();
        this.initializeTournaments();
    }

    initializeTournaments() {
        // Еженедельный турнир мудрости
        this.createTournament({
            id: 'weekly_wisdom',
            name: '🔥 Испытание Мудрости',
            description: 'Еженедельный турнир на лучшие решения сложных моральных дилемм',
            type: 'weekly',
            duration: 7 * 24 * 60 * 60 * 1000, // 7 дней
            prize: { xp: 5000, title: 'Мудрец недели', coins: 1000 },
            requirements: { level: 5 },
            maxParticipants: 100,
            questionsPerRound: 15
        });

        // Месячный турнир титанов
        this.createTournament({
            id: 'monthly_titans',
            name: '⚡ Битва Титанов',
            description: 'Месячный турнир лучших игроков сервера',
            type: 'monthly',
            duration: 30 * 24 * 60 * 60 * 1000, // 30 дней
            prize: { xp: 20000, title: 'Титан', coins: 5000, special: 'Золотая аватарка' },
            requirements: { level: 20 },
            maxParticipants: 50,
            questionsPerRound: 25
        });
    }

    createTournament(config) {
        const tournament = {
            ...config,
            participants: [],
            brackets: [],
            currentRound: 0,
            status: 'upcoming',
            startTime: null,
            endTime: null,
            questions: this.generateTournamentQuestions(config.questionsPerRound)
        };

        this.tournaments.set(config.id, tournament);
        return tournament;
    }

    generateTournamentQuestions(count) {
        // Генерация специальных вопросов для турниров
        const questions = [];
        for (let i = 0; i < count; i++) {
            questions.push({
                question: `Турнирный вопрос ${i + 1}: ${this.getRandomScenario()}`,
                options: this.generateOptions(),
                difficulty: this.getRandomDifficulty(),
                points: 10 + (i * 2) // Увеличивающаяся сложность
            });
        }
        return questions;
    }

    getRandomScenario() {
        const scenarios = [
            "В ситуации морального выбора между личной выгодой и общественным благом...",
            "Когда нужно принять решение, влияющее на жизни многих людей...",
            "В условиях ограниченных ресурсов и времени...",
            "При столкновении с системной несправедливостью..."
        ];
        return scenarios[Math.floor(Math.random() * scenarios.length)];
    }

    generateOptions() {
        return [
            "Выбираю путь чести и справедливости",
            "Ищу компромиссное решение",
            "Действую в интересах большинства",
            "Следую интуиции и опыту"
        ];
    }

    getRandomDifficulty() {
        const difficulties = ['medium', 'hard', 'extreme'];
        return difficulties[Math.floor(Math.random() * difficulties.length)];
    }

    // Зарегистрироваться на турнир
    registerForTournament(tournamentId, player) {
        const tournament = this.tournaments.get(tournamentId);
        if (!tournament || tournament.status !== 'upcoming') return false;

        // Проверка требований
        if (!this.checkRequirements(player, tournament.requirements)) return false;

        // Проверка лимита участников
        if (tournament.participants.length >= tournament.maxParticipants) return false;

        // Проверка, не зарегистрирован ли уже
        if (tournament.participants.find(p => p.id === player.id)) return false;

        tournament.participants.push({
            id: player.id,
            name: player.name,
            level: player.level,
            score: 0,
            eliminated: false
        });

        return true;
    }

    checkRequirements(player, requirements) {
        if (requirements.level && player.level < requirements.level) return false;
        if (requirements.honor && player.honor < requirements.honor) return false;
        if (requirements.wisdom && player.wisdom < requirements.wisdom) return false;
        return true;
    }

    // Начать турнир
    startTournament(tournamentId) {
        const tournament = this.tournaments.get(tournamentId);
        if (!tournament || tournament.status !== 'upcoming') return false;

        tournament.status = 'active';
        tournament.startTime = Date.now();
        tournament.endTime = tournament.startTime + tournament.duration;

        // Создаем сетку турнира
        this.createBrackets(tournament);

        this.activeTournaments.set(tournamentId, tournament);
        return tournament;
    }

    createBrackets(tournament) {
        const participants = [...tournament.participants];
        const brackets = [];

        // Создаем пары для первого раунда
        while (participants.length > 1) {
            const player1 = participants.splice(Math.floor(Math.random() * participants.length), 1)[0];
            const player2 = participants.splice(Math.floor(Math.random() * participants.length), 1)[0];
            
            brackets.push({
                round: 1,
                player1: player1,
                player2: player2,
                winner: null,
                status: 'pending'
            });
        }

        tournament.brackets = brackets;
    }

    // Ответить на вопрос турнира
    answerTournamentQuestion(tournamentId, playerId, questionIndex, answerIndex, timeSpent) {
        const tournament = this.activeTournaments.get(tournamentId);
        if (!tournament || tournament.status !== 'active') return null;

        const question = tournament.questions[questionIndex];
        const participant = tournament.participants.find(p => p.id === playerId);
        
        if (!participant || participant.eliminated) return null;

        const score = this.evaluateTournamentAnswer(answerIndex, question, timeSpent);
        participant.score += score;

        return {
            score: score,
            totalScore: participant.score,
            nextQuestion: tournament.questions[questionIndex + 1]
        };
    }

    evaluateTournamentAnswer(answerIndex, question, timeSpent) {
        let score = question.points;
        
        // Бонусы за скорость
        if (timeSpent < 3000) score += 5;
        if (timeSpent < 1000) score += 10;
        
        // Бонусы за сложность
        if (question.difficulty === 'hard') score += 10;
        if (question.difficulty === 'extreme') score += 20;
        
        return score;
    }
}

// === СИСТЕМА ГИЛЬДИЙ ===
class GuildSystem {
    constructor() {
        this.guilds = new Map();
        this.playerGuilds = new Map(); // playerId -> guildId
        this.initializeGuilds();
    }

    initializeGuilds() {
        const guilds = [
            {
                id: 'justice_knights',
                name: '⚔️ Рыцари Справедливости',
                description: 'Гильдия для тех, кто ценит честность и справедливость',
                level: 8,
                maxMembers: 50,
                requirements: { honor: 30 },
                bonus: { honorMultiplier: 1.5, xpBonus: 20 },
                members: [],
                treasury: 10000,
                achievements: []
            },
            {
                id: 'wise_sages',
                name: '🧠 Мудрецы Пути',
                description: 'Объединение мыслителей, ищущих глубинный смысл',
                level: 7,
                maxMembers: 40,
                requirements: { wisdom: 25 },
                bonus: { wisdomMultiplier: 1.5, xpBonus: 15 },
                members: [],
                treasury: 8000,
                achievements: []
            },
            {
                id: 'power_warriors',
                name: '💪 Воины Силы',
                description: 'Гильдия решительных лидеров',
                level: 9,
                maxMembers: 60,
                requirements: { power: 35 },
                bonus: { powerMultiplier: 1.5, xpBonus: 25 },
                members: [],
                treasury: 12000,
                achievements: []
            }
        ];

        guilds.forEach(guild => this.guilds.set(guild.id, guild));
    }

    // Вступить в гильдию
    joinGuild(guildId, player) {
        const guild = this.guilds.get(guildId);
        if (!guild) return { success: false, message: 'Гильдия не найдена' };

        // Проверка требований
        if (!this.checkGuildRequirements(player, guild.requirements)) {
            return { success: false, message: 'Не соответствуете требованиям гильдии' };
        }

        // Проверка лимита участников
        if (guild.members.length >= guild.maxMembers) {
            return { success: false, message: 'Гильдия переполнена' };
        }

        // Проверка, не состоит ли уже в гильдии
        if (this.playerGuilds.has(player.id)) {
            return { success: false, message: 'Вы уже состоите в гильдии' };
        }

        // Добавляем игрока в гильдию
        guild.members.push({
            id: player.id,
            name: player.name,
            level: player.level,
            joinDate: Date.now(),
            contribution: 0,
            rank: 'member'
        });

        this.playerGuilds.set(player.id, guildId);

        return { success: true, message: `Добро пожаловать в ${guild.name}!` };
    }

    checkGuildRequirements(player, requirements) {
        if (requirements.honor && player.honor < requirements.honor) return false;
        if (requirements.wisdom && player.wisdom < requirements.wisdom) return false;
        if (requirements.power && player.power < requirements.power) return false;
        return true;
    }

    // Покинуть гильдию
    leaveGuild(playerId) {
        const guildId = this.playerGuilds.get(playerId);
        if (!guildId) return { success: false, message: 'Вы не состоите в гильдии' };

        const guild = this.guilds.get(guildId);
        if (!guild) return { success: false, message: 'Гильдия не найдена' };

        // Удаляем игрока из гильдии
        guild.members = guild.members.filter(m => m.id !== playerId);
        this.playerGuilds.delete(playerId);

        return { success: true, message: 'Вы покинули гильдию' };
    }

    // Получить бонусы гильдии
    getGuildBonus(playerId) {
        const guildId = this.playerGuilds.get(playerId);
        if (!guildId) return null;

        const guild = this.guilds.get(guildId);
        return guild ? guild.bonus : null;
    }

    // Внести вклад в гильдию
    contributeToGuild(playerId, amount) {
        const guildId = this.playerGuilds.get(playerId);
        if (!guildId) return { success: false, message: 'Вы не состоите в гильдии' };

        const guild = this.guilds.get(guildId);
        const member = guild.members.find(m => m.id === playerId);
        
        if (!member) return { success: false, message: 'Участник не найден' };

        guild.treasury += amount;
        member.contribution += amount;

        // Повышение ранга за вклад
        if (member.contribution >= 10000 && member.rank === 'member') {
            member.rank = 'veteran';
        } else if (member.contribution >= 50000 && member.rank === 'veteran') {
            member.rank = 'elite';
        }

        return { success: true, message: `Внесено ${amount} в казну гильдии` };
    }
}

// === СИСТЕМА ОГРАНИЧЕНИЙ ===
class LimitationSystem {
    constructor() {
        this.dailyLimits = new Map(); // playerId -> { questions: 0, lastReset: timestamp }
        this.questionsPerDay = 20; // Лимит вопросов в день
        this.resetTime = 24 * 60 * 60 * 1000; // 24 часа
    }

    // Проверить, может ли игрок отвечать на вопросы
    canAnswerQuestion(playerId) {
        const playerLimits = this.dailyLimits.get(playerId);
        if (!playerLimits) return true; // Первый раз играет

        // Проверяем, нужно ли сбросить счетчик
        if (Date.now() - playerLimits.lastReset > this.resetTime) {
            this.resetDailyLimits(playerId);
            return true;
        }

        return playerLimits.questions < this.questionsPerDay;
    }

    // Записать ответ на вопрос
    recordQuestionAnswer(playerId) {
        let playerLimits = this.dailyLimits.get(playerId);
        
        if (!playerLimits) {
            playerLimits = { questions: 0, lastReset: Date.now() };
        }

        playerLimits.questions++;
        this.dailyLimits.set(playerId, playerLimits);
    }

    // Сбросить дневные лимиты
    resetDailyLimits(playerId) {
        this.dailyLimits.set(playerId, { questions: 0, lastReset: Date.now() });
    }

    // Получить информацию о лимитах
    getLimitsInfo(playerId) {
        const playerLimits = this.dailyLimits.get(playerId);
        if (!playerLimits) {
            return { questions: 0, limit: this.questionsPerDay, remaining: this.questionsPerDay };
        }

        const remaining = Math.max(0, this.questionsPerDay - playerLimits.questions);
        return {
            questions: playerLimits.questions,
            limit: this.questionsPerDay,
            remaining: remaining
        };
    }

    // Получить время до сброса
    getTimeUntilReset(playerId) {
        const playerLimits = this.dailyLimits.get(playerId);
        if (!playerLimits) return 0;

        const timePassed = Date.now() - playerLimits.lastReset;
        return Math.max(0, this.resetTime - timePassed);
    }
}

// Экспорт систем
window.GameSystems = {
    PvPSystem,
    TournamentSystem,
    GuildSystem,
    LimitationSystem
}; 