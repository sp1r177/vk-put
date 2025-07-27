// 500 специальных сценариев для PvP дуэлей "Моральный выбор"

const pvpScenarios = [
    // === ЭКСТРЕМАЛЬНЫЕ СИТУАЦИИ (1-100) ===
    {
        id: 1,
        text: "Вы видите, как два человека дерутся на улице. Один из них ваш друг. Что делаете?",
        options: [
            { text: "Разнимаю драку", morality: 15, xp: 25, logic: 8 },
            { text: "Заступаюсь за друга", morality: 5, xp: 15, logic: 6 },
            { text: "Вызываю полицию", morality: 20, xp: 30, logic: 10 },
            { text: "Убегаю", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 2,
        text: "Ваш друг просит помочь скрыть преступление. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю сдаться", morality: 25, xp: 35, logic: 10 },
            { text: "Соглашаюсь помочь", morality: -25, xp: 0, logic: 2 },
            { text: "Сообщаю в полицию", morality: 20, xp: 30, logic: 9 },
            { text: "Игнорирую просьбу", morality: 0, xp: 10, logic: 5 }
        ]
    },
    {
        id: 3,
        text: "Вы нашли сумку с большими деньгами. Рядом никого нет. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 25, xp: 35, logic: 9 },
            { text: "Беру себе", morality: -30, xp: 0, logic: 1 },
            { text: "Жду владельца", morality: 30, xp: 40, logic: 10 },
            { text: "Беру часть", morality: -15, xp: 5, logic: 3 }
        ]
    },
    {
        id: 4,
        text: "Ваш коллега предлагает участвовать в коррупционной схеме. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю начальству", morality: 30, xp: 40, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Отказываюсь молча", morality: 15, xp: 25, logic: 7 },
            { text: "Шантажирую коллегу", morality: -20, xp: 0, logic: 2 }
        ]
    },
    {
        id: 5,
        text: "Вы видите, как кто-то грабит пожилого человека. Что делаете?",
        options: [
            { text: "Заступаюсь за пожилого", morality: 35, xp: 45, logic: 8 },
            { text: "Вызываю полицию", morality: 25, xp: 35, logic: 10 },
            { text: "Убегаю", morality: -25, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 10, xp: 20, logic: 6 }
        ]
    },
    {
        id: 6,
        text: "Ваш друг просит соврать в суде. Что делаете?",
        options: [
            { text: "Отказываюсь, объясняю последствия", morality: 30, xp: 40, logic: 10 },
            { text: "Соглашаюсь", morality: -35, xp: 0, logic: 1 },
            { text: "Сообщаю суду правду", morality: 25, xp: 35, logic: 9 },
            { text: "Уклоняюсь от вызова", morality: -10, xp: 5, logic: 3 }
        ]
    },
    {
        id: 7,
        text: "Вы случайно стали свидетелем убийства. Что делаете?",
        options: [
            { text: "Сообщаю в полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю и молчу", morality: -30, xp: 0, logic: 2 },
            { text: "Шантажирую убийцу", morality: -25, xp: 0, logic: 1 },
            { text: "Рассказываю друзьям", morality: 5, xp: 15, logic: 4 }
        ]
    },
    {
        id: 8,
        text: "Ваш начальник предлагает подписать фальшивые документы. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в соответствующие органы", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 },
            { text: "Шантажирую начальника", morality: -20, xp: 0, logic: 2 }
        ]
    },
    {
        id: 9,
        text: "Вы нашли наркотики. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Продаю", morality: -40, xp: 0, logic: 1 },
            { text: "Употребляю сам", morality: -35, xp: 0, logic: 1 },
            { text: "Выбрасываю", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 10,
        text: "Ваш друг просит помочь сбежать из страны. Что делаете?",
        options: [
            { text: "Отказываюсь, убеждаю сдаться", morality: 25, xp: 35, logic: 9 },
            { text: "Помогаю", morality: -25, xp: 0, logic: 2 },
            { text: "Сообщаю в полицию", morality: 20, xp: 30, logic: 8 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 11,
        text: "Вы видите, как кто-то пытается покончить с собой. Что делаете?",
        options: [
            { text: "Останавливаю и вызываю скорую", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -35, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: -20, xp: 0, logic: 2 },
            { text: "Вызываю полицию", morality: 25, xp: 35, logic: 8 }
        ]
    },
    {
        id: 12,
        text: "Ваш коллега предлагает украсть деньги из кассы. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю начальству", morality: 30, xp: 40, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -20, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 13,
        text: "Вы нашли оружие. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 35, xp: 45, logic: 10 },
            { text: "Беру себе", morality: -35, xp: 0, logic: 1 },
            { text: "Продаю", morality: -40, xp: 0, logic: 1 },
            { text: "Выбрасываю", morality: 10, xp: 20, logic: 5 }
        ]
    },
    {
        id: 14,
        text: "Ваш друг просит помочь скрыть тело. Что делаете?",
        options: [
            { text: "Отказываюсь и вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Помогаю", morality: -40, xp: 0, logic: 1 },
            { text: "Шантажирую друга", morality: -30, xp: 0, logic: 1 },
            { text: "Убегаю", morality: -25, xp: 0, logic: 2 }
        ]
    },
    {
        id: 15,
        text: "Вы видите, как кто-то избивает ребенка. Что делаете?",
        options: [
            { text: "Останавливаю избиение", morality: 45, xp: 55, logic: 9 },
            { text: "Вызываю полицию", morality: 35, xp: 45, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 16,
        text: "Ваш начальник предлагает подписать документы о несуществующих работах. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в прокуратуру", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую начальника", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 17,
        text: "Вы нашли взрывчатку. Что делаете?",
        options: [
            { text: "Вызываю спецслужбы", morality: 40, xp: 50, logic: 10 },
            { text: "Беру себе", morality: -40, xp: 0, logic: 1 },
            { text: "Продаю", morality: -45, xp: 0, logic: 1 },
            { text: "Выбрасываю", morality: 5, xp: 15, logic: 4 }
        ]
    },
    {
        id: 18,
        text: "Ваш друг просит помочь сбежать из тюрьмы. Что делаете?",
        options: [
            { text: "Отказываюсь, убеждаю отсидеть", morality: 30, xp: 40, logic: 9 },
            { text: "Помогаю", morality: -35, xp: 0, logic: 1 },
            { text: "Сообщаю администрации", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 3 }
        ]
    },
    {
        id: 19,
        text: "Вы видите, как кто-то пытается изнасиловать человека. Что делаете?",
        options: [
            { text: "Останавливаю насильника", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -45, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 10, xp: 20, logic: 5 }
        ]
    },
    {
        id: 20,
        text: "Ваш коллега предлагает участвовать в отмывании денег. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в ФСБ", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -35, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 21,
        text: "Вы нашли украденные драгоценности. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Беру себе", morality: -30, xp: 0, logic: 1 },
            { text: "Продаю", morality: -35, xp: 0, logic: 1 },
            { text: "Ищу владельца", morality: 35, xp: 45, logic: 9 }
        ]
    },
    {
        id: 22,
        text: "Ваш друг просит помочь убить человека. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в полицию", morality: 45, xp: 55, logic: 10 },
            { text: "Соглашаюсь", morality: -50, xp: 0, logic: 1 },
            { text: "Шантажирую друга", morality: -30, xp: 0, logic: 1 },
            { text: "Убегаю", morality: -20, xp: 0, logic: 2 }
        ]
    },
    {
        id: 23,
        text: "Вы видите, как кто-то пытается поджечь здание. Что делаете?",
        options: [
            { text: "Останавливаю поджигателя", morality: 40, xp: 50, logic: 9 },
            { text: "Вызываю пожарных и полицию", morality: 35, xp: 45, logic: 10 },
            { text: "Убегаю", morality: -35, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 24,
        text: "Ваш начальник предлагает подписать документы о несуществующих сотрудниках. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в налоговую", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую начальника", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 25,
        text: "Вы нашли контрабанду. Что делаете?",
        options: [
            { text: "Сообщаю в таможню", morality: 35, xp: 45, logic: 10 },
            { text: "Беру себе", morality: -35, xp: 0, logic: 1 },
            { text: "Продаю", morality: -40, xp: 0, logic: 1 },
            { text: "Выбрасываю", morality: 10, xp: 20, logic: 5 }
        ]
    },
    {
        id: 26,
        text: "Ваш друг просит помочь сбежать из психиатрической больницы. Что делаете?",
        options: [
            { text: "Отказываюсь, убеждаю лечиться", morality: 25, xp: 35, logic: 8 },
            { text: "Помогаю", morality: -25, xp: 0, logic: 2 },
            { text: "Сообщаю персоналу", morality: 20, xp: 30, logic: 7 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 27,
        text: "Вы видите, как кто-то пытается похитить ребенка. Что делаете?",
        options: [
            { text: "Останавливаю похитителя", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -45, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 28,
        text: "Ваш коллега предлагает участвовать в мошенничестве с клиентами. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю руководству", morality: 30, xp: 40, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -20, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 29,
        text: "Вы нашли фальшивые деньги. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Использую сам", morality: -30, xp: 0, logic: 1 },
            { text: "Продаю", morality: -35, xp: 0, logic: 1 },
            { text: "Выбрасываю", morality: 10, xp: 20, logic: 5 }
        ]
    },
    {
        id: 30,
        text: "Ваш друг просит помочь скрыть наркотики. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю сдаться", morality: 30, xp: 40, logic: 9 },
            { text: "Помогаю", morality: -30, xp: 0, logic: 1 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 3 }
        ]
    },
    {
        id: 31,
        text: "Вы видите, как кто-то пытается взорвать здание. Что делаете?",
        options: [
            { text: "Останавливаю террориста", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю спецслужбы", morality: 45, xp: 55, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 32,
        text: "Ваш начальник предлагает подписать документы о несуществующих поставках. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в прокуратуру", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую начальника", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 33,
        text: "Вы нашли украденные документы. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Беру себе", morality: -30, xp: 0, logic: 1 },
            { text: "Продаю", morality: -35, xp: 0, logic: 1 },
            { text: "Ищу владельца", morality: 35, xp: 45, logic: 9 }
        ]
    },
    {
        id: 34,
        text: "Ваш друг просит помочь сбежать из страны с украденными деньгами. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю вернуть деньги", morality: 35, xp: 45, logic: 9 },
            { text: "Помогаю", morality: -35, xp: 0, logic: 1 },
            { text: "Сообщаю в полицию", morality: 30, xp: 40, logic: 8 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 3 }
        ]
    },
    {
        id: 35,
        text: "Вы видите, как кто-то пытается отравить человека. Что делаете?",
        options: [
            { text: "Останавливаю отравителя", morality: 45, xp: 55, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 36,
        text: "Ваш коллега предлагает участвовать в коррупционной схеме с госзаказами. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в СК", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -35, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 37,
        text: "Вы нашли украденные картины. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Беру себе", morality: -30, xp: 0, logic: 1 },
            { text: "Продаю", morality: -35, xp: 0, logic: 1 },
            { text: "Ищу владельца", morality: 35, xp: 45, logic: 9 }
        ]
    },
    {
        id: 38,
        text: "Ваш друг просит помочь скрыть убийство. Что делаете?",
        options: [
            { text: "Отказываюсь и вызываю полицию", morality: 45, xp: 55, logic: 10 },
            { text: "Помогаю", morality: -45, xp: 0, logic: 1 },
            { text: "Шантажирую друга", morality: -30, xp: 0, logic: 1 },
            { text: "Убегаю", morality: -25, xp: 0, logic: 2 }
        ]
    },
    {
        id: 39,
        text: "Вы видите, как кто-то пытается угнать машину. Что делаете?",
        options: [
            { text: "Останавливаю угонщика", morality: 35, xp: 45, logic: 9 },
            { text: "Вызываю полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Убегаю", morality: -30, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 40,
        text: "Ваш начальник предлагает подписать документы о несуществующих исследованиях. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в академию наук", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую начальника", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 41,
        text: "Вы нашли украденные драгоценные камни. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Беру себе", morality: -30, xp: 0, logic: 1 },
            { text: "Продаю", morality: -35, xp: 0, logic: 1 },
            { text: "Ищу владельца", morality: 35, xp: 45, logic: 9 }
        ]
    },
    {
        id: 42,
        text: "Ваш друг просит помочь сбежать из тюрьмы с оружием. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю администрации", morality: 35, xp: 45, logic: 9 },
            { text: "Помогаю", morality: -40, xp: 0, logic: 1 },
            { text: "Сообщаю в спецслужбы", morality: 30, xp: 40, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 2 }
        ]
    },
    {
        id: 43,
        text: "Вы видите, как кто-то пытается похитить женщину. Что делаете?",
        options: [
            { text: "Останавливаю похитителя", morality: 45, xp: 55, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 44,
        text: "Ваш коллега предлагает участвовать в мошенничестве с инвесторами. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в ЦБ", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -35, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 45,
        text: "Вы нашли украденные антикварные вещи. Что делаете?",
        options: [
            { text: "Сдаю в полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Беру себе", morality: -30, xp: 0, logic: 1 },
            { text: "Продаю", morality: -35, xp: 0, logic: 1 },
            { text: "Ищу владельца", morality: 35, xp: 45, logic: 9 }
        ]
    },
    {
        id: 46,
        text: "Ваш друг просит помочь скрыть труп. Что делаете?",
        options: [
            { text: "Отказываюсь и вызываю полицию", morality: 45, xp: 55, logic: 10 },
            { text: "Помогаю", morality: -45, xp: 0, logic: 1 },
            { text: "Шантажирую друга", morality: -30, xp: 0, logic: 1 },
            { text: "Убегаю", morality: -25, xp: 0, logic: 2 }
        ]
    },
    {
        id: 47,
        text: "Вы видите, как кто-то пытается поджечь лес. Что делаете?",
        options: [
            { text: "Останавливаю поджигателя", morality: 40, xp: 50, logic: 9 },
            { text: "Вызываю МЧС и полицию", morality: 35, xp: 45, logic: 10 },
            { text: "Убегаю", morality: -35, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 48,
        text: "Ваш начальник предлагает подписать документы о несуществующих услугах. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в налоговую", morality: 35, xp: 45, logic: 10 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую начальника", morality: -25, xp: 0, logic: 2 },
            { text: "Отказываюсь молча", morality: 20, xp: 30, logic: 7 }
        ]
    },
    {
        id: 49,
        text: "Вы нашли украденные документы государственной важности. Что делаете?",
        options: [
            { text: "Сдаю в ФСБ", morality: 40, xp: 50, logic: 10 },
            { text: "Беру себе", morality: -40, xp: 0, logic: 1 },
            { text: "Продаю иностранцам", morality: -50, xp: 0, logic: 1 },
            { text: "Ищу владельца", morality: 35, xp: 45, logic: 8 }
        ]
    },
    {
        id: 50,
        text: "Ваш друг просит помочь сбежать из страны с государственными секретами. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в ФСБ", morality: 45, xp: 55, logic: 10 },
            { text: "Помогаю", morality: -50, xp: 0, logic: 1 },
            { text: "Сообщаю в спецслужбы", morality: 40, xp: 50, logic: 9 },
            { text: "Игнорирую", morality: -20, xp: 0, logic: 2 }
        ]
    }
];

// Экспорт для использования в PvP системе
window.pvpScenarios = pvpScenarios; 