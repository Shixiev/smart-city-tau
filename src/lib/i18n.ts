export type Language = 'kk' | 'ru';

export const translations = {
  kk: {
    // Navigation
    nav: {
      home: 'Басты',
      map: 'Карта',
      ecology: 'Экология',
      news: 'Жаңалықтар',
      profile: 'Профиль',
    },
    // Hero Section
    hero: {
      title: 'Smart Aktau',
      subtitle: 'Сенің қалаң, сенің бастамаң',
      description: 'Оқиғаларды қадағала, мәселелер туралы хабарла, хабарландырулар ал және Ақтауды жақсартуға көмектес',
      openMap: 'Картаны ашу',
      reportProblem: 'Мәселе туралы хабарлау',
      viewNews: 'Жаңалықтар',
      openAI: 'ИИ-көмекші',
    },
    // City Map
    map: {
      title: 'Қала картасы',
      subtitle: 'Оқиғалар, орындар және бастамалар',
      filterAll: 'Барлығы',
      filterEvents: 'Оқиғалар',
      filterPlaces: 'Орындар',
      filterInitiatives: 'Бастамалар',
      suggestEvent: 'Оқиға ұсыну',
      details: 'Толығырақ',
    },
    // Ecology
    ecology: {
      title: 'Экология мониторингі',
      subtitle: 'Қаланы жақсартуға көмектесіңіз',
      reportProblem: 'Мәселе туралы хабарлау',
      myReports: 'Менің хабарламаларым',
      status: {
        pending: 'Қаралуда',
        inProgress: 'Орындалуда',
        resolved: 'Шешілді',
        rejected: 'Қабылданбады',
      },
      categories: {
        garbage: 'Қоқыс',
        water: 'Су',
        lighting: 'Жарықтандыру',
        trees: 'Ағаштар',
        roads: 'Жолдар',
        other: 'Басқа',
      },
    },
    // Smart Alert
    alert: {
      title: 'Smart Alert',
      subtitle: 'Қала жаңалықтары мен хабарландырулар',
      filterAll: 'Барлығы',
      filterNews: 'Жаңалықтар',
      filterWarnings: 'Ескертулер',
      filterEvents: 'Оқиғалар',
      markRead: 'Оқылды деп белгілеу',
      markImportant: 'Маңызды',
    },
    // AI Assistant
    ai: {
      title: 'Smart AI',
      subtitle: 'Сенің көмекшің',
      greeting: 'Сәлем! Мен SmartAI, сенің көмекшіңмін. Не көмек керек бүгін?',
      placeholder: 'Сұрағыңызды жазыңыз...',
      send: 'Жіберу',
    },
    // Profile
    profile: {
      title: 'Профиль',
      cityRating: 'Қалалық рейтинг',
      myReports: 'Менің хабарламаларым',
      myEvents: 'Менің оқиғаларым',
      achievements: 'Жетістіктер',
      logout: 'Шығу',
    },
    // Common
    common: {
      loading: 'Жүктелуде...',
      error: 'Қате орын алды',
      success: 'Сәтті орындалды',
      cancel: 'Болдырмау',
      save: 'Сақтау',
      delete: 'Жою',
      edit: 'Өңдеу',
      close: 'Жабу',
    },
  },
  ru: {
    // Navigation
    nav: {
      home: 'Главная',
      map: 'Карта',
      ecology: 'Экология',
      news: 'Новости',
      profile: 'Профиль',
    },
    // Hero Section
    hero: {
      title: 'Smart Aktau',
      subtitle: 'Твой город, твоя инициатива',
      description: 'Следи за событиями, сообщай о проблемах, получай уведомления и помогай делать Актау лучше',
      openMap: 'Открыть карту',
      reportProblem: 'Сообщить о проблеме',
      viewNews: 'Новости города',
      openAI: 'ИИ-помощник',
    },
    // City Map
    map: {
      title: 'Карта города',
      subtitle: 'События, места и инициативы',
      filterAll: 'Все',
      filterEvents: 'События',
      filterPlaces: 'Места',
      filterInitiatives: 'Инициативы',
      suggestEvent: 'Предложить событие',
      details: 'Подробнее',
    },
    // Ecology
    ecology: {
      title: 'Экологический мониторинг',
      subtitle: 'Помогите улучшить город',
      reportProblem: 'Сообщить о проблеме',
      myReports: 'Мои обращения',
      status: {
        pending: 'На рассмотрении',
        inProgress: 'В работе',
        resolved: 'Решено',
        rejected: 'Отклонено',
      },
      categories: {
        garbage: 'Мусор',
        water: 'Вода',
        lighting: 'Освещение',
        trees: 'Деревья',
        roads: 'Дороги',
        other: 'Другое',
      },
    },
    // Smart Alert
    alert: {
      title: 'Smart Alert',
      subtitle: 'Новости и уведомления города',
      filterAll: 'Все',
      filterNews: 'Новости',
      filterWarnings: 'Предупреждения',
      filterEvents: 'События',
      markRead: 'Отметить как прочитанное',
      markImportant: 'Важное',
    },
    // AI Assistant
    ai: {
      title: 'Smart AI',
      subtitle: 'Твой помощник',
      greeting: 'Привет! Я SmartAI, твой помощник. Чем могу помочь сегодня?',
      placeholder: 'Напишите ваш вопрос...',
      send: 'Отправить',
    },
    // Profile
    profile: {
      title: 'Профиль',
      cityRating: 'Городской рейтинг',
      myReports: 'Мои обращения',
      myEvents: 'Мои события',
      achievements: 'Достижения',
      logout: 'Выйти',
    },
    // Common
    common: {
      loading: 'Загрузка...',
      error: 'Произошла ошибка',
      success: 'Успешно выполнено',
      cancel: 'Отмена',
      save: 'Сохранить',
      delete: 'Удалить',
      edit: 'Редактировать',
      close: 'Закрыть',
    },
  },
};

export const useTranslation = (lang: Language = 'ru') => {
  return translations[lang];
};
