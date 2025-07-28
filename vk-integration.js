// Интеграция с VK API для мини-приложения

class VKIntegration {
    constructor() {
        this.vkBridge = null;
        this.currentUser = null;
        this.friends = [];
        this.appUsers = [];
        this.initVKBridge();
    }

    // Инициализация VK Bridge
    async initVKBridge() {
        try {
            if (window.vkBridge) {
                this.vkBridge = window.vkBridge;
                await this.vkBridge.send('VKWebAppInit');
                console.log('VK Bridge инициализирован');
                await this.loadUserData();
            } else {
                console.log('VK Bridge не найден, используем симуляцию');
                this.simulateVKAPI();
            }
        } catch (error) {
            console.error('Ошибка инициализации VK Bridge:', error);
            this.simulateVKAPI();
        }
    }

    // Симуляция VK API для локального тестирования
    simulateVKAPI() {
        this.vkBridge = {
            send: async (method, params = {}) => {
                console.log(`Симуляция VK API: ${method}`, params);
                
                switch (method) {
                    case 'VKWebAppInit':
                        return { vk_platform: 'desktop_web' };
                    
                    case 'VKWebAppGetUserInfo':
                        return {
                            id: 123456789,
                            first_name: 'Тестовый',
                            last_name: 'Пользователь',
                            photo_100: 'https://vk.com/images/camera_100.png',
                            photo_200: 'https://vk.com/images/camera_200.png'
                        };
                    
                    case 'VKWebAppGetFriends':
                        return {
                            count: 2,
                            items: [
                                { id: 111111111, first_name: 'Друг', last_name: 'Один' },
                                { id: 222222222, first_name: 'Друг', last_name: 'Два' }
                            ]
                        };
                    
                    case 'VKWebAppGetAppUsers':
                        return {
                            count: 1,
                            items: [111111111]
                        };
                    
                    case 'VKWebAppShowInviteBox':
                        return { success: true };
                    
                    case 'VKWebAppShowWallPostBox':
                        return { post_id: 12345 };
                    
                    default:
                        return { success: true };
                }
            }
        };
    }

    // Загрузить данные пользователя
    async loadUserData() {
        try {
            const userResult = await this.vkBridge.send('VKWebAppGetUserInfo');
            this.currentUser = userResult;
            console.log('Данные пользователя загружены:', this.currentUser);
            return this.currentUser;
        } catch (error) {
            console.error('Ошибка загрузки данных пользователя:', error);
            return null;
        }
    }

    // Загрузить список друзей
    async loadFriends() {
        try {
            const friendsResult = await this.vkBridge.send('VKWebAppGetFriends');
            this.friends = friendsResult.items || [];
            console.log('Список друзей загружен:', this.friends.length);
            return this.friends;
        } catch (error) {
            console.error('Ошибка загрузки друзей:', error);
            return [];
        }
    }

    // Загрузить пользователей приложения
    async loadAppUsers() {
        try {
            const appUsersResult = await this.vkBridge.send('VKWebAppGetAppUsers');
            this.appUsers = appUsersResult.items || [];
            console.log('Пользователи приложения загружены:', this.appUsers.length);
            return this.appUsers;
        } catch (error) {
            console.error('Ошибка загрузки пользователей приложения:', error);
            return [];
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

    // Получить друзей, которые не в приложении
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

    // Получить информацию о пользователе
    async getUserInfo(userId) {
        try {
            // В реальном приложении здесь был бы вызов к VK API
            // для получения информации о пользователе
            const friend = this.friends.find(f => f.id === userId);
            return friend || null;
        } catch (error) {
            console.error('Ошибка получения информации о пользователе:', error);
            return null;
        }
    }

    // Поделиться результатом дуэли
    async shareDuelResult(result) {
        try {
            const shareResult = await this.vkBridge.send('VKWebAppShowWallPostBox', {
                message: `Я ${result.winner ? 'победил' : 'проиграл'} в моральной дуэли! ${result.winner ? '🎉' : '😔'}`
            });
            console.log('Результат дуэли опубликован:', shareResult);
            return shareResult;
        } catch (error) {
            console.error('Ошибка публикации результата дуэли:', error);
            return null;
        }
    }

    // Получить текущего пользователя
    getCurrentUser() {
        return this.currentUser;
    }

    // Получить всех друзей
    getAllFriends() {
        return this.friends;
    }

    // Получить пользователей приложения
    getAppUsers() {
        return this.appUsers;
    }
}

// Экспортируем для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VKIntegration;
} 