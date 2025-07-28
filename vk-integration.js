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
            const appUsersResult = await this.vkBridge.send('VKWebAppGetAppUsers');
            this.appUsers = appUsersResult.data || [];
            console.log('Пользователи приложения загружены:', this.appUsers.length);
        } catch (error) {
            console.error('Ошибка загрузки пользователей приложения:', error);
            this.appUsers = [];
        }
    }

    // Проверить, находится ли пользователь в приложении
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

    // Пригласить друга в приложение
    async inviteFriend(friendId) {
        try {
            const result = await this.vkBridge.send('VKWebAppShowInviteBox');
            console.log('Приглашение отправлено:', result);
            return result;
        } catch (error) {
            console.error('Ошибка отправки приглашения:', error);
            return { error: 'Не удалось отправить приглашение' };
        }
    }

    // Отправить вызов на дуэль другу
    async sendDuelChallenge(friendId, bet) {
        try {
            // Создаем вызов в локальной системе
            const challenge = {
                id: Date.now() + Math.random(),
                challenger: this.currentUser.id,
                challengerName: `${this.currentUser.first_name} ${this.currentUser.last_name}`,
                target: friendId,
                bet: bet,
                status: 'pending',
                createdAt: Date.now()
            };

            // Сохраняем вызов
            this.saveChallenge(challenge);

            // Отправляем уведомление через VK API
            await this.sendVKNotification(friendId, challenge);

            return challenge;
        } catch (error) {
            console.error('Ошибка отправки вызова:', error);
            return { error: 'Не удалось отправить вызов' };
        }
    }

    // Отправить VK уведомление
    async sendVKNotification(userId, challenge) {
        try {
            // В реальном VK API здесь был бы вызов для отправки уведомления
            // Но в мини-приложениях это ограничено, поэтому используем симуляцию
            console.log('VK уведомление отправлено пользователю', userId);
            
            // Альтернативно можно использовать VK API для отправки сообщения
            // Но это требует дополнительных разрешений
            
            return { success: true };
        } catch (error) {
            console.error('Ошибка отправки VK уведомления:', error);
            return { error: 'Не удалось отправить уведомление' };
        }
    }

    // Сохранить вызов локально
    saveChallenge(challenge) {
        const challenges = JSON.parse(localStorage.getItem('vk_challenges') || '[]');
        challenges.push(challenge);
        localStorage.setItem('vk_challenges', JSON.stringify(challenges));
    }

    // Получить активные вызовы
    getActiveChallenges() {
        const challenges = JSON.parse(localStorage.getItem('vk_challenges') || '[]');
        return challenges.filter(c => c.status === 'pending' && c.target === this.currentUser.id);
    }

    // Принять вызов
    acceptChallenge(challengeId) {
        const challenges = JSON.parse(localStorage.getItem('vk_challenges') || '[]');
        const challenge = challenges.find(c => c.id === challengeId);
        
        if (challenge && challenge.target === this.currentUser.id) {
            challenge.status = 'accepted';
            challenge.acceptedAt = Date.now();
            localStorage.setItem('vk_challenges', JSON.stringify(challenges));
            return challenge;
        }
        
        return null;
    }

    // Отклонить вызов
    declineChallenge(challengeId) {
        const challenges = JSON.parse(localStorage.getItem('vk_challenges') || '[]');
        const challenge = challenges.find(c => c.id === challengeId);
        
        if (challenge && challenge.target === this.currentUser.id) {
            challenge.status = 'declined';
            challenge.declinedAt = Date.now();
            localStorage.setItem('vk_challenges', JSON.stringify(challenges));
            return true;
        }
        
        return false;
    }

    // Получить информацию о пользователе
    async getUserInfo(userId) {
        try {
            // В реальном VK API здесь был бы запрос к API
            // Но в мини-приложениях это ограничено
            const friend = this.friends.find(f => f.id === userId);
            if (friend) {
                return {
                    id: friend.id,
                    first_name: friend.first_name,
                    last_name: friend.last_name,
                    name: `${friend.first_name} ${friend.last_name}`
                };
            }
            return null;
        } catch (error) {
            console.error('Ошибка получения информации о пользователе:', error);
            return null;
        }
    }

    // Поделиться результатом дуэли
    async shareDuelResult(result) {
        try {
            const message = `🎯 Результат дуэли в "Моральный выбор"!\n\n` +
                          `🏆 Победитель: ${result.winnerName}\n` +
                          `💀 Проигравший: ${result.loserName}\n` +
                          `💰 Ставка: ${result.bet} XP\n\n` +
                          `Присоединяйся к игре и развивай свою моральную интуицию!`;

            const shareResult = await this.vkBridge.send('VKWebAppShowWallPostBox', {
                message: message,
                attachments: 'photo-123456_789012' // ID фото приложения
            });

            console.log('Результат опубликован:', shareResult);
            return shareResult;
        } catch (error) {
            console.error('Ошибка публикации результата:', error);
            return { error: 'Не удалось опубликовать результат' };
        }
    }
}

// Создаем глобальный экземпляр
window.vkIntegration = new VKIntegration(); 