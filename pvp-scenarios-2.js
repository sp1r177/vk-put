// Дополнительные PvP сценарии (51-500)

const pvpScenarios2 = [
    // === СОЦИАЛЬНЫЕ ДИЛЕММЫ (51-150) ===
    {
        id: 51,
        text: "Ваш друг просит помочь скрыть его измену. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю честно рассказать", morality: 25, xp: 35, logic: 9 },
            { text: "Помогаю", morality: -25, xp: 0, logic: 2 },
            { text: "Сообщаю партнеру", morality: 15, xp: 25, logic: 7 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 52,
        text: "Вы видите, как подростки издеваются над ребенком. Что делаете?",
        options: [
            { text: "Останавливаю издевательства", morality: 35, xp: 45, logic: 9 },
            { text: "Вызываю полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Убегаю", morality: -30, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 10, xp: 20, logic: 5 }
        ]
    },
    {
        id: 53,
        text: "Ваш сосед просит соврать о его алиментах. Что делаете?",
        options: [
            { text: "Отказываюсь", morality: 20, xp: 30, logic: 8 },
            { text: "Соглашаюсь", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю честно решить вопрос", morality: 25, xp: 35, logic: 9 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 54,
        text: "Вы нашли украденные вещи у знакомого. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую знакомого", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 55,
        text: "Ваш друг просит помочь сбежать от кредиторов. Что делаете?",
        options: [
            { text: "Отказываюсь и предлагаю решить проблему", morality: 25, xp: 35, logic: 8 },
            { text: "Помогаю", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю помощь в реструктуризации", morality: 30, xp: 40, logic: 9 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 56,
        text: "Вы видите, как кто-то пытается изнасиловать человека. Что делаете?",
        options: [
            { text: "Останавливаю насильника", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -45, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 5 }
        ]
    },
    {
        id: 57,
        text: "Ваш коллега просит помочь с мошенничеством. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю начальству", morality: 30, xp: 40, logic: 9 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -20, xp: 0, logic: 2 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 58,
        text: "Вы нашли украденные документы у друга. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую друга", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 59,
        text: "Ваш друг просит помочь скрыть его преступление. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю сдаться", morality: 35, xp: 45, logic: 9 },
            { text: "Помогаю", morality: -35, xp: 0, logic: 1 },
            { text: "Сообщаю в полицию", morality: 30, xp: 40, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 }
        ]
    },
    {
        id: 60,
        text: "Вы видите, как кто-то пытается похитить ребенка. Что делаете?",
        options: [
            { text: "Останавливаю похитителя", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -45, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 61,
        text: "Ваш сосед просит соврать о его доходах. Что делаете?",
        options: [
            { text: "Отказываюсь", morality: 20, xp: 30, logic: 8 },
            { text: "Соглашаюсь", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю честно заполнить декларацию", morality: 25, xp: 35, logic: 9 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 62,
        text: "Вы нашли украденные деньги у родственника. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую родственника", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 63,
        text: "Ваш друг просит помочь сбежать от суда. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю сдаться", morality: 30, xp: 40, logic: 8 },
            { text: "Помогаю", morality: -30, xp: 0, logic: 1 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 7 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 64,
        text: "Вы видите, как кто-то пытается отравить человека. Что делаете?",
        options: [
            { text: "Останавливаю отравителя", morality: 45, xp: 55, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 5 }
        ]
    },
    {
        id: 65,
        text: "Ваш коллега просит помочь с коррупцией. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в прокуратуру", morality: 35, xp: 45, logic: 9 },
            { text: "Соглашаюсь", morality: -35, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -25, xp: 0, logic: 2 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 66,
        text: "Вы нашли украденные картины у знакомого. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую знакомого", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 67,
        text: "Ваш друг просит помочь скрыть его наркоторговлю. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю сдаться", morality: 35, xp: 45, logic: 9 },
            { text: "Помогаю", morality: -40, xp: 0, logic: 1 },
            { text: "Сообщаю в полицию", morality: 30, xp: 40, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 }
        ]
    },
    {
        id: 68,
        text: "Вы видите, как кто-то пытается угнать машину. Что делаете?",
        options: [
            { text: "Останавливаю угонщика", morality: 35, xp: 45, logic: 9 },
            { text: "Вызываю полицию", morality: 30, xp: 40, logic: 10 },
            { text: "Убегаю", morality: -30, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 69,
        text: "Ваш сосед просит соврать о его имуществе. Что делаете?",
        options: [
            { text: "Отказываюсь", morality: 20, xp: 30, logic: 8 },
            { text: "Соглашаюсь", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю честно оформить документы", morality: 25, xp: 35, logic: 9 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 70,
        text: "Вы нашли украденные драгоценности у друга. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую друга", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 71,
        text: "Ваш друг просит помочь сбежать из страны. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю остаться", morality: 25, xp: 35, logic: 8 },
            { text: "Помогаю", morality: -25, xp: 0, logic: 2 },
            { text: "Предлагаю помощь в решении проблем", morality: 30, xp: 40, logic: 9 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 72,
        text: "Вы видите, как кто-то пытается поджечь здание. Что делаете?",
        options: [
            { text: "Останавливаю поджигателя", morality: 40, xp: 50, logic: 9 },
            { text: "Вызываю пожарных и полицию", morality: 35, xp: 45, logic: 10 },
            { text: "Убегаю", morality: -35, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 73,
        text: "Ваш коллега просит помочь с отмыванием денег. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в ФСБ", morality: 35, xp: 45, logic: 9 },
            { text: "Соглашаюсь", morality: -35, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -25, xp: 0, logic: 2 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 74,
        text: "Вы нашли украденные антикварные вещи у знакомого. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую знакомого", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 75,
        text: "Ваш друг просит помочь скрыть его убийство. Что делаете?",
        options: [
            { text: "Отказываюсь и вызываю полицию", morality: 45, xp: 55, logic: 10 },
            { text: "Помогаю", morality: -45, xp: 0, logic: 1 },
            { text: "Сообщаю в спецслужбы", morality: 40, xp: 50, logic: 9 },
            { text: "Игнорирую", morality: -20, xp: 0, logic: 2 }
        ]
    },
    {
        id: 76,
        text: "Вы видите, как кто-то пытается похитить женщину. Что делаете?",
        options: [
            { text: "Останавливаю похитителя", morality: 45, xp: 55, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 77,
        text: "Ваш сосед просит соврать о его доходах в налоговой. Что делаете?",
        options: [
            { text: "Отказываюсь", morality: 20, xp: 30, logic: 8 },
            { text: "Соглашаюсь", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю честно заполнить декларацию", morality: 25, xp: 35, logic: 9 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 78,
        text: "Вы нашли украденные документы у родственника. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую родственника", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 79,
        text: "Ваш друг просит помочь сбежать из тюрьмы. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю отсидеть", morality: 30, xp: 40, logic: 8 },
            { text: "Помогаю", morality: -35, xp: 0, logic: 1 },
            { text: "Сообщаю администрации", morality: 25, xp: 35, logic: 7 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 80,
        text: "Вы видите, как кто-то пытается поджечь лес. Что делаете?",
        options: [
            { text: "Останавливаю поджигателя", morality: 40, xp: 50, logic: 9 },
            { text: "Вызываю МЧС и полицию", morality: 35, xp: 45, logic: 10 },
            { text: "Убегаю", morality: -35, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 6 }
        ]
    },
    {
        id: 81,
        text: "Ваш коллега просит помочь с мошенничеством с клиентами. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю руководству", morality: 30, xp: 40, logic: 9 },
            { text: "Соглашаюсь", morality: -30, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -20, xp: 0, logic: 2 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 82,
        text: "Вы нашли украденные деньги у друга. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую друга", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 83,
        text: "Ваш друг просит помочь скрыть его наркоторговлю. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю сдаться", morality: 35, xp: 45, logic: 9 },
            { text: "Помогаю", morality: -40, xp: 0, logic: 1 },
            { text: "Сообщаю в полицию", morality: 30, xp: 40, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 }
        ]
    },
    {
        id: 84,
        text: "Вы видите, как кто-то пытается взорвать здание. Что делаете?",
        options: [
            { text: "Останавливаю террориста", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю спецслужбы", morality: 45, xp: 55, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 2 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 85,
        text: "Ваш сосед просит соврать о его имуществе в суде. Что делаете?",
        options: [
            { text: "Отказываюсь", morality: 20, xp: 30, logic: 8 },
            { text: "Соглашаюсь", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю честно оформить документы", morality: 25, xp: 35, logic: 9 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 86,
        text: "Вы нашли украденные картины у родственника. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую родственника", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 87,
        text: "Ваш друг просит помочь сбежать с украденными деньгами. Что делаете?",
        options: [
            { text: "Отказываюсь и убеждаю вернуть деньги", morality: 35, xp: 45, logic: 9 },
            { text: "Помогаю", morality: -35, xp: 0, logic: 1 },
            { text: "Сообщаю в полицию", morality: 30, xp: 40, logic: 8 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 88,
        text: "Вы видите, как кто-то пытается отравить человека. Что делаете?",
        options: [
            { text: "Останавливаю отравителя", morality: 45, xp: 55, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 15, xp: 25, logic: 5 }
        ]
    },
    {
        id: 89,
        text: "Ваш коллега просит помочь с коррупционной схемой. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в СК", morality: 35, xp: 45, logic: 9 },
            { text: "Соглашаюсь", morality: -35, xp: 0, logic: 1 },
            { text: "Шантажирую коллегу", morality: -25, xp: 0, logic: 2 },
            { text: "Игнорирую", morality: -10, xp: 5, logic: 4 }
        ]
    },
    {
        id: 90,
        text: "Вы нашли украденные драгоценные камни у знакомого. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую знакомого", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 91,
        text: "Ваш друг просит помочь скрыть его убийство. Что делаете?",
        options: [
            { text: "Отказываюсь и вызываю полицию", morality: 45, xp: 55, logic: 10 },
            { text: "Помогаю", morality: -45, xp: 0, logic: 1 },
            { text: "Сообщаю в спецслужбы", morality: 40, xp: 50, logic: 9 },
            { text: "Игнорирую", morality: -20, xp: 0, logic: 2 }
        ]
    },
    {
        id: 92,
        text: "Вы видите, как кто-то пытается похитить ребенка. Что делаете?",
        options: [
            { text: "Останавливаю похитителя", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -45, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 93,
        text: "Ваш сосед просит соврать о его доходах в банке. Что делаете?",
        options: [
            { text: "Отказываюсь", morality: 20, xp: 30, logic: 8 },
            { text: "Соглашаюсь", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю честно заполнить анкету", morality: 25, xp: 35, logic: 9 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 94,
        text: "Вы нашли украденные документы у друга. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую друга", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 95,
        text: "Ваш друг просит помочь сбежать из тюрьмы с оружием. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю администрации", morality: 35, xp: 45, logic: 9 },
            { text: "Помогаю", morality: -40, xp: 0, logic: 1 },
            { text: "Сообщаю в спецслужбы", morality: 30, xp: 40, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 }
        ]
    },
    {
        id: 96,
        text: "Вы видите, как кто-то пытается похитить женщину. Что делаете?",
        options: [
            { text: "Останавливаю похитителя", morality: 45, xp: 55, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -40, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    },
    {
        id: 97,
        text: "Ваш сосед просит соврать о его имуществе в налоговой. Что делаете?",
        options: [
            { text: "Отказываюсь", morality: 20, xp: 30, logic: 8 },
            { text: "Соглашаюсь", morality: -20, xp: 0, logic: 2 },
            { text: "Предлагаю честно оформить документы", morality: 25, xp: 35, logic: 9 },
            { text: "Игнорирую", morality: -5, xp: 10, logic: 4 }
        ]
    },
    {
        id: 98,
        text: "Вы нашли украденные антикварные вещи у родственника. Что делаете?",
        options: [
            { text: "Убеждаю вернуть владельцу", morality: 30, xp: 40, logic: 9 },
            { text: "Сообщаю в полицию", morality: 25, xp: 35, logic: 8 },
            { text: "Игнорирую", morality: -15, xp: 0, logic: 3 },
            { text: "Шантажирую родственника", morality: -20, xp: 0, logic: 1 }
        ]
    },
    {
        id: 99,
        text: "Ваш друг просит помочь сбежать с государственными секретами. Что делаете?",
        options: [
            { text: "Отказываюсь и сообщаю в ФСБ", morality: 45, xp: 55, logic: 10 },
            { text: "Помогаю", morality: -50, xp: 0, logic: 1 },
            { text: "Сообщаю в спецслужбы", morality: 40, xp: 50, logic: 9 },
            { text: "Игнорирую", morality: -20, xp: 0, logic: 2 }
        ]
    },
    {
        id: 100,
        text: "Вы видите, как кто-то пытается похитить ребенка. Что делаете?",
        options: [
            { text: "Останавливаю похитителя", morality: 50, xp: 60, logic: 9 },
            { text: "Вызываю полицию", morality: 40, xp: 50, logic: 10 },
            { text: "Убегаю", morality: -45, xp: 0, logic: 1 },
            { text: "Снимаю на видео", morality: 20, xp: 30, logic: 6 }
        ]
    }
];

// Объединяем с основными PvP сценариями
if (window.pvpScenarios) {
    window.pvpScenarios = window.pvpScenarios.concat(pvpScenarios2);
} else {
    window.pvpScenarios = pvpScenarios2;
} 