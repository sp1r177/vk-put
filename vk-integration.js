// Интеграция с VK API для PvP системы

class VKIntegration {
    constructor() {
        this.vkBridge = null;
        this.currentUser = null;
        this.friends = [];
        this.appUsers = [];
        this.initVKBridge();
    }

    // Инициализация VK Bridge
    initVKBridge() {
        if (typeof vkBridge !== 'undefined') {
            this.vkBridge = vkBridge;
            this.vkBridge.send('VKWebAppInit');
            
            this.vkBridge.subscribe((e) => {
                if (e.detail.type === 'VKWebAppInitResult') {
                    console.log('VK Bridge инициализирован');
                    // НЕ загружаем данные автоматически - только по запросу
                }
            });
        } else {
            // Симуляция VK API для тестирования в браузере
            console.log('VK Bridge не найден, используем симуляцию');
            this.simulateVKAPI();
        }
    }

    // Симуляция VK API для тестирования
    simulateVKAPI() {
        this.vkBridge = {
            send: async (method, params = {}) => {
                console.log('VK API симуляция:', method, params);
                
                switch (method) {
                    case 'VKWebAppGetUserInfo':
                        return { data: { id: 12345, first_name: 'Тест', last_name: 'Пользователь' } };
                    
                    case 'VKWebAppGetFriends':
                        return { 
                            data: [
                                { id: 1, first_name: 'Анна', last_name: 'Иванова' },
                                { id: 2, first_name: 'Петр', last_name: 'Сидоров' },
                                { id: 3, first_name: 'Мария', last_name: 'Козлова' },
                                { id: 4, first_name: 'Дмитрий', last_name: 'Петров' },
                                { id: 5, first_name: 'Елена', last_name: 'Смирнова' }
                            ] 
                        };
                    
                    case 'VKWebAppGetAppUsers':
                        return { data: [1, 3, 5] }; // Пользователи 1, 3, 5 в приложении
                    
                    case 'VKWebAppShowInviteBox':
                        alert('Симуляция: Приглашение отправлено через VK!');
                        return { success: true };
                    
                    case 'VKWebAppShowWallPostBox':
                        alert('Симуляция: Результат опубликован на стене VK!');
                        return { success: true };
                    
                    default:
                        return { success: true };
                }
            }
        };
        
        // НЕ загружаем данные автоматически
        console.log('VK API симуляция готова');
    }

    // Загрузка данных пользователя
    async loadUserData() {
        try {
            // Получаем информацию о текущем пользователе
            const userResult = await this.vkBridge.send('VKWebAppGetUserInfo');
            this.currentUser = userResult.data;
            
            // Получаем список друзей
            await this.loadFriends();
            
            // Получаем пользователей приложения
            await this.loadAppUsers();
            
            console.log('Данные VK загружены:', this.currentUser);
        } catch (error) {
            console.error('Ошибка загрузки данных VK:', error);
        }
    }

    // Загрузка списка друзей
    async loadFriends() {
        try {
            const friendsResult = await this.vkBridge.send('VKWebAppGetFriends');
            this.friends = friendsResult.data || [];
            console.log('Друзья загружены:', this.friends.length);
        } catch (error) {
            console.error('Ошибка загрузки друзей:', error);
            this.friends = [];
        }
    }

    // Загрузка пользователей приложения
    async loadAppUsers() {
        try {
            // Получаем пользователей, которые уже в приложении
            const appUsersResult = await this.vkBridge.send('VKWebAppGetAppUsers');
            this.appUsers = appUsersResult.data || [];
            console.log('Пользователи приложения загружены:', this.appUsers.length);
        } catch (error) {
            console.error('Ошибка загрузки пользователей приложения:', error);
            this.appUsers = [];
        }
    }

    // Проверка, находится ли пользователь в приложении
    isUserInApp(userId) {
        return this.appUsers.includes(userId);
    }

    // Получить друзей, которые в приложении
    getAppFriends() {
        return this.friends.filter(friend => this.isUserInApp(friend.id));
    }

    // Получить друзей, которые НЕ в приложении
    getNonAppFriends() {
        return this.friends.filter(friend => !this.isUserInApp(friend.id));
    }

    // Отправить приглашение другу
    async inviteFriend(friendId) {
        try {
            const result = await this.vkBridge.send('VKWebAppShowInviteBox');
            console.log('Приглашение отправлено:', result);
            return true;
        } catch (error) {
            console.error('Ошибка отправки приглашения:', error);
            return false;
        }
    }

    // Отправить вызов на дуэль другу
    async sendDuelChallenge(friendId, bet) {
        try {
            // Проверяем, находится ли друг в приложении
            const isInApp = this.isUserInApp(friendId);
            
            if (!isInApp) {
                // Если друг не в приложении, предлагаем пригласить его
                const shouldInvite = confirm("Этот друг не в игре. Хотите пригласить его?");
                if (shouldInvite) {
                    await this.inviteFriend(friendId);
                }
                return null;
            }
            
            // Создаем вызов в нашей системе
            const challenge = {
                id: Date.now() + Math.random(),
                challenger: this.currentUser.id,
                challengerName: this.currentUser.first_name + ' ' + this.currentUser.last_name,
                target: friendId,
                bet: bet,
                status: 'pending',
                createdAt: Date.now()
            };

            // Сохраняем вызов в localStorage (в реальном приложении - на сервере)
            this.saveChallenge(challenge);

            // Отправляем уведомление через VK
            await this.sendVKNotification(friendId, challenge);
            
            return challenge;
        } catch (error) {
            console.error('Ошибка отправки вызова:', error);
            return null;
        }
    }

    // Отправить уведомление через VK
    async sendVKNotification(userId, challenge) {
        try {
            // В реальном приложении здесь был бы вызов к VK API
            // для отправки push-уведомления пользователю
            console.log('Уведомление отправлено пользователю:', userId);
            
            // Симуляция отправки уведомления
            if (this.vkBridge.send.toString().includes('simulateVKAPI')) {
                // В симуляции просто логируем
                console.log(`Симуляция: Уведомление о дуэли отправлено пользователю ${userId}`);
            } else {
                // В реальном VK приложении здесь был бы вызов к VK API
                // для отправки push-уведомления
                console.log('VK API: Отправка push-уведомления о дуэли');
            }
        } catch (error) {
            console.error('Ошибка отправки уведомления:', error);
        }
    }

    // Сохранить вызов
    saveChallenge(challenge) {
        const challenges = JSON.parse(localStorage.getItem('vk_duel_challenges') || '[]');
        challenges.push(challenge);
        localStorage.setItem('vk_duel_challenges', JSON.stringify(challenges));
    }

    // Получить активные вызовы
    getActiveChallenges() {
        const challenges = JSON.parse(localStorage.getItem('vk_duel_challenges') || '[]');
        return challenges.filter(c => c.target === this.currentUser.id && c.status === 'pending');
    }

    // Принять вызов
    acceptChallenge(challengeId) {
        const challenges = JSON.parse(localStorage.getItem('vk_duel_challenges') || '[]');
        const challenge = challenges.find(c => c.id === challengeId);
        
        if (challenge) {
            challenge.status = 'accepted';
            challenge.acceptedAt = Date.now();
            localStorage.setItem('vk_duel_challenges', JSON.stringify(challenges));
            return challenge;
        }
        
        return null;
    }

    // Отклонить вызов
    declineChallenge(challengeId) {
        const challenges = JSON.parse(localStorage.getItem('vk_duel_challenges') || '[]');
        const challenge = challenges.find(c => c.id === challengeId);
        
        if (challenge) {
            challenge.status = 'declined';
            challenge.declinedAt = Date.now();
            localStorage.setItem('vk_duel_challenges', JSON.stringify(challenges));
            return true;
        }
        
        return false;
    }

    // Получить информацию о пользователе по ID
    async getUserInfo(userId) {
        try {
            // В реальном приложении здесь был бы запрос к VK API
            // для получения информации о пользователе
            const friend = this.friends.find(f => f.id === userId);
            return friend || { id: userId, first_name: 'Пользователь', last_name: 'VK' };
        } catch (error) {
            console.error('Ошибка получения информации о пользователе:', error);
            return { id: userId, first_name: 'Пользователь', last_name: 'VK' };
        }
    }

    // Поделиться результатом дуэли
    async shareDuelResult(result) {
        try {
            const shareResult = await this.vkBridge.send('VKWebAppShowWallPostBox', {
                message: `Я ${result.isWinner ? 'победил' : 'проиграл'} в моральной дуэли! ${result.isWinner ? '🏆' : '💔'}`
            });
            console.log('Результат опубликован:', shareResult);
            return true;
        } catch (error) {
            console.error('Ошибка публикации результата:', error);
            return false;
        }
    }
}

// Экспорт для использования в основной игре
window.VKIntegration = VKIntegration; 