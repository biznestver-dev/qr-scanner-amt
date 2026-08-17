/**
 * ТЕХОТДЕЛ AM — ПОЛНЫЙ ОБЪЕДИНЕННЫЙ СКРИПТ ПРИЛОЖЕНИЯ (APP.JS)
 */

const APP_STORAGE_KEYS = {
    EMPLOYEES: 'artmasters_employees_list',
    VENUES: 'artmasters_venues_list',
    SCHEDULE: 'artmasters_schedule_list',
    CHAMP_CONTACTS: 'artmasters_champ_contacts',
    EQUIPMENT_DB: 'artmasters_equipment_db',
    ACTS_HISTORY: 'artmasters_acts_history',
    CS_HISTORY: 'artmasters_callsheet_history',
    CS_TEMPLATES: 'artmasters_cs_templates'
};

const MANAGER_TITLES = {
    "Зломанов Олег Викторович": "Административно-технический директор",
    "Белоусов Алексей Алексеевич": "Системный администратор",
    "Смутный Богдан Сергеевич": "Технический менеджер",
    "Сидоренко Артем Валерьевич": "Старший технический менеджер",
    "Белоусова Анастасия Константиновна": "Офис-менеджер, ассистент технического отдела"
};

const DEFAULT_EMPLOYEES_LIST = [
    { name: "Володин Борислав Борисович", role: "Директор", phone: "+79857697535", email: "bvolodin@artmasters.ru", tg: true, max: true },
    { name: "Агапов Даниил", role: "Веб-дизайнер", phone: "+79534307790", email: "dagapov@artmasters.ru", tg: true, max: true },
    { name: "Баранова Татьяна Николаевна", role: "Ведущий специалист документационного обеспечения", phone: "+79605811818", email: "doc@artmasters.ru", tg: false, max: false },
    { name: "Бекетова Алла Александровна", role: "Администратор", phone: "+79283104564", email: "abeketova@artmasters.ru", tg: false, max: false },
    { name: "Белоусов Алексей Алексеевич", role: "Технический менеджер", phone: "+79265668913", email: "admin@artmasters.ru", tg: true, max: true },
    { name: "Белоусова Анастасия Константиновна", role: "Офис-менеджер, ассистент технического отдела", phone: "+79262363012", email: "office@artmasters.ru", tg: false, max: false },
    { name: "Буланов Кирилл Сергеевич", role: "Контент-менеджер соцсетей", phone: "+79150183176", email: "", tg: false, max: false },
    { name: "Василенко Анна Владимировна", role: "Заместитель директора по работе с органами государственной власти и развитию", phone: "+79260422211", email: "avasilenko@artmasters.ru", tg: true, max: true },
    { name: "Василец Светлана Михайловна", role: "Руководитель департамента методики и экспертизы", phone: "+79162611880", email: "spelevina@artmasters.ru", tg: true, max: true },
    { name: "Васина Светлана Сергеевна", role: "Старший специалист казначейства", phone: "+79055404903", email: "svasina@artmasters.ru", tg: false, max: false },
    { name: "Вахрушева Ольга Анатольевна", role: "Руководитель финансового отдела", phone: "+79652798776", email: "ova@artmasters.ru", tg: false, max: false },
    { name: "Гаврилова Анастасия Евгеньевна", role: "Менеджер образовательных программ и проектов", phone: "+79147592882", email: "agavrilova@artmasters.ru", tg: true, max: true },
    { name: "Глазкова Юлия Александровна", role: "Советник Директора по правовым вопросам, Генеральный директор Ассоциации «АртМастерс»", phone: "+79684541151", email: "uglazkova@artmasters.ru", tg: true, max: true },
    { name: "Даминов Булат Ильдарович", role: "Видеомонтажер", phone: "+79274985730", email: "", tg: false, max: false },
    { name: "Дашкина Зульфия", role: "Менеджер по спецпроектам", phone: "+79254432518", email: "dashkina@artmasters.ru", tg: false, max: false },
    { name: "Деликова Алина", role: "", phone: "+79689757153", email: "adelikova@artmasters.ru", tg: true, max: true },
    { name: "Ермак Виолетта Юрьевна", role: "Заместитель руководителя департамента по работе с регионами", phone: "+79154420460", email: "vermak@artmasters.ru", tg: false, max: false },
    { name: "Ермоленко Наталия Александровна", role: "Главный редактор по работе с участниками", phone: "+79161567039", email: "nermolenko@artmasters.ru", tg: true, max: true },
    { name: "Жижневская Ксения Владимировна", role: "Шеф-редактор", phone: "+79055099087", email: "kzhizhnevskaya@artmasters.ru", tg: true, max: true },
    { name: "Зёма Елизавета Алексеевна", role: "Специалист первичного контроля", phone: "+79261873271", email: "hr@artmasters.ru", tg: false, max: false },
    { name: "Зломанов Олег Викторович", role: "Административно-технический директор", phone: "+79206931013", email: "ozlomanov@artmasters.ru", tg: true, max: true },
    { name: "Иванова Александра Ивановна", role: "Линейный продюсер по направлению «Кино»", phone: "+79888800577", email: "aivanova@artmasters.ru", tg: true, max: true },
    { name: "Иванова Вероника Ивановна", role: "Секретарь", phone: "+79245486320", email: "vivanova@artmasters.ru", tg: true, max: true },
    { name: "Казакова Лариса Анастольевна", role: "Руководитель производственного департамента", phone: "+79161245600", email: "lkazakova@artmasters.ru", tg: false, max: false },
    { name: "Казаченко Владимир Анатольевич", role: "Исполнительный директор", phone: "+79138200218", email: "vkazachenko@artmasters.ru", tg: true, max: true },
    { name: "Капура Елена Николаевна", role: "Руководитель департамента образовательных программ", phone: "+79851968561", email: "ekapura@artmasters.ru", tg: true, max: true },
    { name: "Караулова Татьяна", role: "Специалист информационно-аналитического отдела", phone: "+79267076336", email: "tkaraulova@artmasters.ru", tg: false, max: false },
    { name: "Кирьяненко Татьяна Викторовна", role: "Руководитель финансово-юридического департамента", phone: "+79167256902", email: "tkirianenko@artmasters.ru", tg: false, max: false },
    { name: "Кличко Анастасия Витальевна", role: "Линейный продюсер по направлению «Театр»", phone: "+79647087343", email: "aklichko@artmasters.ru", tg: false, max: false },
    { name: "Колпаков Никита Александрович", role: "Продюсер внутреннего медиапроизводства", phone: "+79164300216", email: "nkolpakov@artmasters.ru", tg: true, max: true },
    { name: "Кочеткова Алёна Алексеевна", role: "", phone: "+79850501690", email: "akochetkova@artmasters.ru", tg: true, max: true },
    { name: "Криштоб Арина Петровна", role: "Дизайнер", phone: "+79035681699", email: "akrishtob@artmasters.ru", tg: true, max: true },
    { name: "Кудасова Екатерина Владимировна", role: "Юрист", phone: "+79521662000", email: "legal@artmasters.ru", tg: false, max: false },
    { name: "Левченко Екатерина Анатольевна", role: "Линейный продюсер", phone: "+79168430171", email: "elevchenko@artmasters.ru", tg: true, max: true },
    { name: "Лукьянчикова Евгения Васильевна", role: "Секретарь-координатор Экспертного совета", phone: "+79606859282", email: "elukyanchikova@artmasters.ru", tg: false, max: false },
    { name: "Лютикова Маргарита Ефимовна", role: "Старший менеджер компетенций", phone: "+79601291238", email: "mlutikova@artmasters.ru", tg: false, max: false },
    { name: "Малашенко Александр Сергеевич", role: "Фотограф", phone: "+79773060506", email: "", tg: false, max: false },
    { name: "Матвеева Виктория Игоревна", role: "Специалист операционного отдела", phone: "+79832227633", email: "vmatveeva@artmasters.ru", tg: false, max: false },
    { name: "Минаева Ольга Анатольевна", role: "Главный бухгалтер", phone: "+79037692342", email: "ominaeva@artmasters.ru", tg: false, max: false },
    { name: "Московкина Ксения", role: "", phone: "+79267256262", email: "kmoskovkina@artmasters.ru", tg: true, max: true },
    { name: "Невзорова Александра Кирилловна", role: "Заместитель руководителя департамента по работе с партнёрами", phone: "+79262499722", email: "anevzorova@artmasters.ru", tg: true, max: true },
    { name: "Новикова Анастасия Владимировна", role: "Старший продюсер", phone: "+79629964020", email: "anovikova@artmasters.ru", tg: true, max: true },
    { name: "Омельченко Елена Евгеньевна", role: "Руководитель операционного отдела", phone: "+79851442930", email: "eomelchenko@artmasters.ru", tg: true, max: true },
    { name: "Орлов Денис Игоревич", role: "Специалист по договорной работе и отчетности", phone: "+79778099594", email: "dorlov@artmasters.ru", tg: false, max: false },
    { name: "Осипова Аксинья Сергеевна", role: "Специалист-модератор", phone: "+79998579335", email: "aosipova@artmasters.ru", tg: true, max: true },
    { name: "Плотникова Елена Вадимовна", role: "Арт-директор", phone: "+79153154720", email: "eplotnikova@artmasters.ru", tg: true, max: true },
    { name: "Полякова Дарья Александровна", role: "Редактор по работе с участниками", phone: "+79096688887", email: "dpolyakova@artmasters.ru", tg: false, max: false },
    { name: "Посякина Татьяна Александровна", role: "Ведущий специалист операционного отдела", phone: "+79167867799", email: "tposyakina@artmasters.ru", tg: false, max: false },
    { name: "Пригарин Алексей Вячеславович", role: "", phone: "+79037240052", email: "aprigarin@artmasters.ru", tg: false, max: false },
    { name: "Разыграев Андрей Викторович", role: "Креативный директор", phone: "+79255890909", email: "arazygraev@artmasters.ru", tg: true, max: true },
    { name: "Саламатова Екатерина Константиновна", role: "Руководитель информационно-аналитического отдела, председатель счетной комиссии", phone: "+79124535791", email: "esalamatova@artmasters.ru", tg: true, max: true },
    { name: "Сафин Матвей Эдуардович", role: "Видеооператор", phone: "+79995668275", email: "", tg: false, max: false },
    { name: "Селецкая Валерия Валентиновна", role: "Заместитель руководителя департамента образовательных программ", phone: "+79147552035", email: "vseleckaya@artmasters.ru", tg: true, max: true },
    { name: "Сиверс Юлия Александровна", role: "Ведущий специалист отдела методики", phone: "+79858815399", email: "usivers@artmasters.ru", tg: true, max: true },
    { name: "Сидоренко Артём Валерьевич", role: "Старший технический менеджер", phone: "+79772772750", email: "sav@artmasters.ru", tg: true, max: false },
    { name: "Сиропова Евгения Владимировна", role: "Старший координатор", phone: "+79046281466", email: "esiropova@artmasters.ru", tg: true, max: true },
    { name: "Смутный Богдан Сергеевич", role: "Технический менеджер", phone: "+79601805290", email: "bsmutny@artmasters.ru", tg: true, max: true },
    { name: "Талеб Лина Сид-Ахмедовна", role: "Менеджер по работе с органами государственной власти", phone: "+79632225826", email: "ltaleb@artmasters.ru", tg: true, max: true },
    { name: "Тетеря Валерия Сергеевна", role: "Помощник редактора по работе с участниками", phone: "+79104074291", email: "", tg: false, max: false },
    { name: "Чикунова Анна Алексеевна", role: "Редактор по работе с участниками", phone: "+79851360339", email: "achikunova@artmasters.ru", tg: true, max: true },
    { name: "Чурилина Екатерина Владимировна", role: "Руководитель отдела методики и конкурсной документации", phone: "+79031408395", email: "echurilina@artmasters.ru", tg: true, max: true }
];

const DEFAULT_VENUES_LIST = [
    { name: "Хабаровск / Полигон креативных компетенций", address: "г. Хабаровск", manager: "Дарья Полякова", phone: "", status: "Активна" },
    { name: "Студия", address: "Москва", manager: "Маргарита Макарова", phone: "", status: "Активна" },
    { name: "Офис группы компаний ПИК", address: "Москва", manager: "Маргарита Макарова", phone: "", status: "Активна" },
    { name: "Мастерская 12 Никиты Михалкова", address: "Москва", manager: "Маргарита Макарова", phone: "", status: "Активна" },
    { name: "Театр «Маска»", address: "Москва", manager: "Владислав Скрипко", phone: "", status: "Активна" },
    { name: "Школа кино и телевидения «Индустрия»", address: "Москва", manager: "Мария Фёдорова", phone: "", status: "Активна" },
    { name: "Студия звукозаписи Игоря Матвиенко М.А.М.А.", address: "Москва", manager: "Арина Дьяконова", phone: "", status: "Активна" },
    { name: "Universal University", address: "ул. Нижняя Сыромятническая, д.10", manager: "Арина Дьяконова", phone: "", status: "Активна" },
    { name: "«КреаТех» МГТУ им. Н.Э. Баумана", address: "Москва", manager: "Оксана Ласточкина", phone: "", status: "Активна" },
    { name: "ВК", address: "Москва", manager: "Степан Новиков", phone: "", status: "Активна" },
    { name: "Фотостудии", address: "Москва", manager: "Ангелина Битарова", phone: "", status: "Активна" },
    { name: "Боярские палаты", address: "Москва", manager: "Мария Фёдорова", phone: "", status: "Активна" },
    { name: "Кинотеатр Художественный", address: "Москва", manager: "Александр Дьяченко", phone: "", status: "Активна" },
    { name: "Мосфильм", address: "ул. Мосфильмовская, д. 1", manager: "Владислав Скрипко", phone: "", status: "Активна" },
    { name: "Геликон-опера", address: "Москва", manager: "", phone: "", status: "Церемония открытия" },
    { name: "Бетховенский зал БТ", address: "Москва", manager: "", phone: "", status: "Церемония награждения" },
    { name: "Новая сцена БТ", address: "Москва", manager: "", phone: "", status: "Церемония закрытия" }
];

const DEFAULT_SCHEDULE_LIST = [
    { time: "23 августа (15:00 - 17:00)", comp: "Художник-аниматор", participant: "Участники", location: "Молодежный досуговый центр, Хабаровск, ул. Шевченко, 7а", desc: "Прибытие: 14:30 | Защита кейса" },
    { time: "26 августа (12:00 - 14:00)", comp: "Куратор выставочных пространств", participant: "Участники", location: "Музей архитектуры им. Щусева", desc: "Прибытие: 11:30 | Защита проектов" },
    { time: "26 августа (16:00 - 18:00)", comp: "Оператор механики сцены", participant: "Участники", location: "Мастерская 12 Никиты Михалкова, ул. Поварская, 33, стр. 1", desc: "Прибытие: 15:30 | Практическая защита" },
    { time: "26 августа (19:00 - 21:00)", comp: "Художник по свету", participant: "Участники", location: "Электротеатр Станиславский, Тверская ул., 23, стр. 1", desc: "Прибытие: 18:30 | Защита проекта" },
    { time: "27 августа (18:00 - 21:00)", comp: "Звукорежиссёр (FOH)", participant: "Участники", location: "Театр «Маска», Комсомольский проспект, 28", desc: "Прибытие: 17:30 | Защита и саундчек" },
    { time: "28 августа (11:00 - 13:00)", comp: "Драматург театра и кино", participant: "Участники", location: "Дом Пашкова, ул. Воздвиженка, 3/5 стр 1", desc: "Прибытие: 10:30 | Защита сценариев" },
    { time: "28 августа (13:00 - 17:00)", comp: "Креативный продюсер", participant: "Участники", location: "Школа «Индустрия», Подсосенский пер., 26, стр. 1", desc: "Прибытие: 12:30 | Защита проектов" },
    { time: "28 августа (18:00 - 19:00)", comp: "Композитор популярной музыки", participant: "Участники", location: "Мастерская 12 Никиты Михалкова (Шоу «Голоса земли»)", desc: "Прибытие: 17:00 | Презентация треков" },
    { time: "29 августа (14:00 - 16:00)", comp: "Технический продюсер", participant: "Участники", location: "«КреаТех» МГТУ им. Н.Э. Баумана, 2-я Бауманская, 5, стр. 4", desc: "Прибытие: 13:30 | Защита решений" },
    { time: "30 августа (11:00 - 13:00)", comp: "Веб-дизайнер (UX/UI)", participant: "Участники", location: "Офис ВКонтакте, Ленинградский просп., 39, стр. 79", desc: "Прибытие: 10:30 | Защита интерфейсов" },
    { time: "30 августа (12:00 - 14:00)", comp: "Графический дизайнер", participant: "Участники", location: "Арт-Центр ИСИ, Берсеневская наб., 8, стр. 1", desc: "Прибытие: 11:30 | Презентация айдентики" },
    { time: "31 августа (12:00 - 15:00)", comp: "Сценограф", participant: "Участники", location: "Боярские палаты, Сретенский бульвар, 10", desc: "Прибытие: 11:30 | Защита макетов" }
];

const DEFAULT_CHAMP_CONTACTS = [
    { dept: "Техническая служба", name: "Зломанов Олег Викторович", task: "Административно-технический директор", phone: "+79206931013" },
    { dept: "Служба логистики", name: "Смутный Богдан Сергеевич", task: "Технический менеджер", phone: "+79601805290" },
    { dept: "Координация компетенций", name: "Маргарита Лютикова", task: "Старший менеджер компетенций", phone: "+79601291238" },
    { dept: "Менеджмент", name: "Александр Дьяченко", task: "Менеджер (Оператор кино и ТВ)", phone: "+79139281656" },
    { dept: "Менеджмент", name: "Ангелина Битарова", task: "Менеджер (Фотограф)", phone: "+79194260664" },
    { dept: "Менеджмент", name: "Арина Дьяконова", task: "Менеджер (Композитор популярной музыки)", phone: "+79055851865" },
    { dept: "Менеджмент", name: "Владислав Скрипко", task: "Менеджер (Звукорежиссёр FOH)", phone: "+79194112728" },
    { dept: "Менеджмент", name: "Дарья Полякова", task: "Менеджер (Драматург театра и кино)", phone: "+79251277703" },
    { dept: "Менеджмент", name: "Иван Кондратенко", task: "Менеджер (Геймдизайнер)", phone: "+79038118802" },
    { dept: "Менеджмент", name: "Маргарита Макарова", task: "Менеджер (Куратор выставочных пространств)", phone: "+79261000043" },
    { dept: "Менеджмент", name: "Мария Фёдорова", task: "Менеджер (Креативный продюсер)", phone: "+79179461932" },
    { dept: "Менеджмент", name: "Оксана Ласточкина", task: "Менеджер (Стилист)", phone: "+79818629867" },
    { dept: "Менеджмент", name: "Степан Новиков", task: "Менеджер (Веб-дизайнер UX/UI)", phone: "+79154039226" }
];

const DEFAULT_CS_TEMPLATES = [
    {
        name: "День застройки площадки",
        shiftNum: "День монтажа и застройки",
        milestones: [
            { time: '08:00', event: 'Заезд автотранспорта, сбор технической группы' },
            { time: '09:00', event: 'Начало монтажных работ и разворачивание сетей' },
            { time: '13:00', event: 'Обед' },
            { time: '18:00', event: 'Проверка оборудования' },
            { time: '21:00', event: 'Завершение монтажа, сдача смены' }
        ],
        notes: "Форма одежды: Total Black. На площадке строго обязательна защитная обувь."
    },
    {
        name: "Соревновательный день",
        shiftNum: "Соревновательный день (Защиты кейсов)",
        milestones: [
            { time: '08:30', event: 'Сбор техгруппы на площадке, проверка связи' },
            { time: '09:30', event: 'Саундчек и тестирование экранов' },
            { time: '10:00', event: 'Старт защиты проектов участников' },
            { time: '14:00', event: 'Обеденный перерыв' },
            { time: '19:00', event: 'Подведение итогов, резервное копирование дисков' }
        ],
        notes: "Внимание: Во время защит соблюдать тишину в зоне пульта."
    },
    {
        name: "Церемония закрытия / награждения",
        shiftNum: "Церемония награждения победителей",
        milestones: [
            { time: '12:00', event: 'Монтаж света и звука на сценической площадке' },
            { time: '15:00', event: 'Генеральный прогон церемонии' },
            { time: '18:00', event: 'Сбор гостей и участников' },
            { time: '19:00', event: 'Начало прямой трансляции и церемонии' },
            { time: '22:00', event: 'Демонтаж оборудования, выезд' }
        ],
        notes: "Дресс-код: Строгий деловой / Total Black для технической службы."
    }
];

let EMPLOYEES_LIST = [];
let VENUES_LIST = [];
let SCHEDULE_LIST = [];
let CHAMP_CONTACTS_LIST = [];
let CS_TEMPLATES_LIST = [];
let currentActItems = [];
let onlineWeatherData = { temp: '', weather: '', sunrise: '', sunset: '' };
let currentStatusFilter = 'all';
let lastScannedCode = '';
let scanTimeout = null;
let isMassReturnActive = false; 
let html5QrcodeScanner = null;

let callSheetData = {
    city: "Москва",
    compMgrName: "—",
    compMgrPhone: "—",
    techDirRoleTitle: "Технический директор (АртМастерс)",
    techDirStr: "Зломанов Олег Викторович (+7 920 693 10 13)",
    stageMgrRoleTitle: "Шеф-редактор",
    stageMgrStr: "Жижневская Ксения Владимировна (+7 905 509 90 87)",
    venueTechDirName: "",
    venueTechDirPhone: "",
    venueMgrName: "",
    venueMgrPhone: "",
    extraInfo: [],
    milestones: [...DEFAULT_CS_TEMPLATES[0].milestones],
    crew: [
        { type: 'manual', time: '08:00', dept: 'Звук', name: 'Иванов Иван', phone: '+7 900 000 00 01', task: 'Монтаж FOH, размотка мультикора' },
        { type: 'manual', time: '08:30', dept: 'Свет', name: 'Петров Петр', phone: '+7 900 000 00 02', task: 'Развеска приборов, юстировка' },
        { type: 'manual', time: '09:00', dept: 'Видео', name: 'Сидоров Сергей', phone: '+7 900 000 00 03', task: 'Сетап LED-экрана, пультовая' }
    ],
    equipment: [
        { name: 'Микшерный пульт Yamaha QL5', inv: 'AM-00123', sn: 'SN987654', count: '1' },
        { name: 'Комплект радиосистем Shure ULXD', inv: 'AM-00456', sn: 'SN123456', count: '4' }
    ],
    transport: [
        { model: 'Газель NEXT', plate: 'А 123 АА 777', driver: 'Иванов Алексей', phone: '+7 999 111 22 33', task: 'Доставка звукового оборудования' }
    ],
    notes: DEFAULT_CS_TEMPLATES[0].notes
};

document.addEventListener('DOMContentLoaded', () => {
    initData();
    initUI();
    initNetworkStatusListener();
});

function initData() {
    EMPLOYEES_LIST = loadFromStore(APP_STORAGE_KEYS.EMPLOYEES, DEFAULT_EMPLOYEES_LIST);
    VENUES_LIST = loadFromStore(APP_STORAGE_KEYS.VENUES, DEFAULT_VENUES_LIST);
    SCHEDULE_LIST = loadFromStore(APP_STORAGE_KEYS.SCHEDULE, DEFAULT_SCHEDULE_LIST);
    CHAMP_CONTACTS_LIST = loadFromStore(APP_STORAGE_KEYS.CHAMP_CONTACTS, DEFAULT_CHAMP_CONTACTS);
    CS_TEMPLATES_LIST = loadFromStore(APP_STORAGE_KEYS.CS_TEMPLATES, DEFAULT_CS_TEMPLATES);

    const savedDb = localStorage.getItem(APP_STORAGE_KEYS.EQUIPMENT_DB);
    if (savedDb) {
        try { window.EQUIPMENT_DB = JSON.parse(savedDb); } 
        catch (e) { console.error('Error loading DB from localStorage'); }
    }
}

function initUI() {
    setDefaultReturnDate();
    updateInvActionButton();
    
    if (typeof Html5QrcodeScanner !== 'undefined') {
        html5QrcodeScanner = new Html5QrcodeScanner("reader", { 
            fps: 10, 
            qrbox: { width: 220, height: 220 },
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        }, false);
        html5QrcodeScanner.render(onScanSuccess, (err) => {});
    }
}

function initNetworkStatusListener() {
    const headerEl = document.querySelector('.app-header');
    if (!headerEl) return;

    let badge = document.getElementById('network-status-badge');
    if (!badge) {
        badge = document.createElement('div');
        badge.id = 'network-status-badge';
        badge.style.cssText = 'font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; text-transform: uppercase;';
        headerEl.appendChild(badge);
    }

    const updateStatus = () => {
        if (navigator.onLine) {
            badge.style.background = 'rgba(16, 185, 129, 0.15)';
            badge.style.color = '#10b981';
            badge.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            badge.innerHTML = '🟢 Онлайн';
        } else {
            badge.style.background = 'rgba(255, 42, 109, 0.15)';
            badge.style.color = '#ff2a6d';
            badge.style.border = '1px solid rgba(255, 42, 109, 0.3)';
            badge.innerHTML = '🔴 Офлайн';
        }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
}

function switchAppSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active-section'));
    const el = document.getElementById(sectionId);
    if (el) el.classList.add('active-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openCallSheetModalFromMenu() { openCallSheetModal(); }
function openContactsModalFromMenu() { openContactsModal(); }

function loadFromStore(key, def) {
    const s = localStorage.getItem(key);
    if (!s) return def;
    try { return JSON.parse(s); } catch(e) { return def; }
}

function saveToStore(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

async function syncEquipmentStatusToGoogle(inv, newStatus) {
    // Автономный режим (запросы к облачному скрипту отключены для стабильной работы)
    console.log(`Статус оборудования ${inv} обновлен локально: ${newStatus}`);
}

function formatPhoneNumber(input) {
    let val = input.value;
    if (val.trim().startsWith('@')) return;
    input.value = formatPhoneNumberStr(val);
}

function formatPhoneNumberStr(raw) {
    if (!raw) return '';
    const d = String(raw).replace(/\D/g, '');
    if (!d) return raw;
    let clean = d;
    if (clean.startsWith('7') || clean.startsWith('8')) clean = clean.substring(1);
    let res = '+7';
    if (clean.length > 0) res += ' ' + clean.substring(0, 3);
    if (clean.length >= 4) res += ' ' + clean.substring(3, 6);
    if (clean.length >= 7) res += ' ' + clean.substring(6, 8);
    if (clean.length >= 9) res += ' ' + clean.substring(8, 10);
    return res;
}

function getFormattedDate(d = new Date()) {
    const m = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()} г.`;
}

function parseCustomDate(dateStr) {
    if (!dateStr || dateStr === '—') return null;
    let parts;
    if (dateStr.includes('.')) parts = dateStr.split('.'); 
    else if (dateStr.includes('-')) parts = dateStr.split('-').reverse(); 
    else return new Date(dateStr);
    
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function getUnderlineDateStr(dateStr) {
    let d = parseCustomDate(dateStr);
    if (!d || isNaN(d.getTime())) return `«___» ___________ 20___ г.`;
    const m = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    return `«${String(d.getDate()).padStart(2,'0')}» ${m[d.getMonth()]} ${d.getFullYear()} г.`;
}

function setDefaultReturnDate() {
    const now = new Date();
    const el = document.getElementById('return-date-input');
    if (el) el.value = now.toISOString().slice(0, 10);
}

function toggleNoReturnDate(checked) {
    const dateInput = document.getElementById('return-date-input');
    if (dateInput) {
        if (checked) {
            dateInput.value = '';
            dateInput.disabled = true;
        } else {
            dateInput.disabled = false;
            setDefaultReturnDate();
        }
    }
}

function toggleMassReturnMode() {
    isMassReturnActive = !isMassReturnActive;
    const banner = document.getElementById('mass-return-banner');
    if (banner) banner.style.display = isMassReturnActive ? 'flex' : 'none';
    if (isMassReturnActive) openDbModal();
}

function findEquipment(invInput) {
    if (!invInput || !window.EQUIPMENT_DB) return null;
    const key = invInput.trim().toUpperCase();
    return window.EQUIPMENT_DB[key] || null;
}

function onInventoryChange(invVal) {
    updateInvActionButton();
    const found = findEquipment(invVal);
    if (found) document.getElementById('equipment-name').value = found.name;
}

function updateInvActionButton() {
    const invVal = document.getElementById('inv-input')?.value.trim() || '';
    const btnContainer = document.getElementById('inv-action-btn-container');
    if (!btnContainer) return;
    if (invVal.length > 0) {
        btnContainer.innerHTML = `<button class="add-quick-btn" onclick="addItemToCurrentAct()">+ Добавить</button>`;
    } else {
        btnContainer.innerHTML = `<button class="db-quick-btn" onclick="openDbModal()">📋 База МТБ</button>`;
    }
}

function onScanSuccess(decodedText) {
    const scannedInv = decodedText.trim();
    if (isMassReturnActive) {
        if (window.EQUIPMENT_DB && window.EQUIPMENT_DB[scannedInv]) {
            window.EQUIPMENT_DB[scannedInv].status = 'В офисе';
            saveToStore(APP_STORAGE_KEYS.EQUIPMENT_DB, window.EQUIPMENT_DB);
            renderDbTable();
        } else {
            alert(`Оборудование ${scannedInv} не найдено в базе МТБ!`);
        }
        return;
    }
    processStandardScan(scannedInv);
}

function processStandardScan(scannedInv) {
    if (scannedInv === lastScannedCode) return;
    lastScannedCode = scannedInv;
    clearTimeout(scanTimeout);
    scanTimeout = setTimeout(() => { lastScannedCode = ''; }, 1500);

    const invInput = document.getElementById('inv-input');
    if (invInput) invInput.value = scannedInv;
    updateInvActionButton();
    
    let equipName = 'Оборудование';
    const found = findEquipment(scannedInv);
    if (found) equipName = found.name;
    const nameInput = document.getElementById('equipment-name');
    if (nameInput) nameInput.value = equipName;

    if (scannedInv && equipName) {
        if (!currentActItems.some(item => item.inv === scannedInv)) {
            currentActItems.push({ inv: scannedInv, name: equipName });
            renderSelectedItems();
            if (invInput) invInput.value = '';
            if (nameInput) nameInput.value = '';
            updateInvActionButton();
        }
    }
}

function addItemToCurrentAct() {
    const inv = document.getElementById('inv-input')?.value.trim();
    const name = document.getElementById('equipment-name')?.value.trim();
    if (!inv || !name) { alert('Укажите инв. номер и наименование!'); return; }
    if (currentActItems.some(i => i.inv === inv)) { alert('Уже в списке!'); return; }
    currentActItems.push({ inv, name });
    document.getElementById('inv-input').value = '';
    document.getElementById('equipment-name').value = '';
    updateInvActionButton();
    renderSelectedItems();
}

function removeItemFromAct(index) {
    currentActItems.splice(index, 1);
    renderSelectedItems();
}

function renderSelectedItems() {
    const container = document.getElementById('selected-items-container');
    if (!container) return;
    const countEl = document.getElementById('items-count');
    if (countEl) countEl.innerText = currentActItems.length;

    if (currentActItems.length === 0) {
        container.innerHTML = `<p style="font-size: 13px; color: var(--text-muted);">Сканируйте QR или введите инвентарный номер</p>`;
        return;
    }

    container.innerHTML = currentActItems.map((item, index) => `
        <div class="item-row">
            <div><b style="font-family:'JetBrains Mono'; color:var(--am-cyan);">${item.inv}</b> — ${item.name}</div>
            <div style="display:flex; gap:8px;">
                <button class="add-row-btn" style="font-size:11px;" onclick="addSingleItemToCallSheet('${item.inv}', '${item.name.replace(/'/g, "\\'")}')">+ В вызывной</button>
                <button class="delete-btn" onclick="removeItemFromAct(${index})">✕</button>
            </div>
        </div>
    `).join('');
}

function openDbModal() { renderDbTable(); document.getElementById('dbModal').style.display = 'flex'; }
function closeDbModal() { document.getElementById('dbModal').style.display = 'none'; }

function setDbStatusFilter(type) {
    currentStatusFilter = type;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${type}`)?.classList.add('active');
    renderDbTable();
}

function renderDbTable() {
    const tbody = document.getElementById('dbTableBody');
    if (!tbody || !window.EQUIPMENT_DB) return;
    tbody.innerHTML = '';
    const search = (document.getElementById('dbSearchInput')?.value || '').toLowerCase().trim();

    Object.values(window.EQUIPMENT_DB).forEach(item => {
        const rawStatus = item.status || 'В офисе';
        const isFree = rawStatus.toLowerCase().includes('свобод') || rawStatus.toLowerCase().includes('офис');
        if (currentStatusFilter === 'free' && !isFree) return;
        if (currentStatusFilter === 'busy' && isFree) return;
        const text = `${item.inv} ${item.category} ${item.name} ${item.sn} ${rawStatus}`.toLowerCase();
        if (!search || text.includes(search)) {
            const badge = isFree ? 'free' : 'busy';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><b style="color:var(--am-cyan);">${item.inv}</b></td>
                <td>${item.category}</td>
                <td>${item.name}</td>
                <td>${item.sn || '—'}</td>
                <td><span class="badge-status ${badge}">${rawStatus}</span></td>
                <td>
                    <div style="display:flex;gap:6px;align-items:center;">
                        <input type="checkbox" class="db-item-checkbox" data-inv="${item.inv}" style="width:16px;height:16px;cursor:pointer;">
                        <button class="select-btn" onclick="selectEquipment('${item.inv}')">Выбрать</button>
                        ${!isFree ? `<button class="return-btn" onclick="returnEquipmentToOffice('${item.inv}')">📥 Вернуть</button>` : ''}
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });

    let massPanel = document.getElementById('db-mass-actions-panel');
    const tableWrapper = tbody.closest('.table-wrapper');
    if (!massPanel && tableWrapper) {
        massPanel = document.createElement('div');
        massPanel.id = 'db-mass-actions-panel';
        massPanel.style.cssText = 'padding: 10px 18px; background: rgba(59,38,166,0.2); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--glass-border);';
        massPanel.innerHTML = `
            <span style="font-size: 12px; color: var(--text-secondary);">Массовые действия с выбранным:</span>
            <button class="add-row-btn" onclick="addSelectedItemsToActFromDb()">+ Добавить отмеченные в акт</button>
        `;
        tableWrapper.parentNode.insertBefore(massPanel, tableWrapper);
    }
}

function filterDbTable() { renderDbTable(); }
function selectEquipment(inv) { document.getElementById('inv-input').value = inv; onInventoryChange(inv); closeDbModal(); }

function addSelectedItemsToActFromDb() {
    const checkboxes = document.querySelectorAll('.db-item-checkbox:checked');
    if (checkboxes.length === 0) { alert('Отметьте галочками позиции в таблице базы МТБ!'); return; }
    let addedCount = 0;
    checkboxes.forEach(cb => {
        const inv = cb.getAttribute('data-inv');
        const found = findEquipment(inv);
        if (found && !currentActItems.some(i => i.inv === inv)) {
            currentActItems.push({ inv: found.inv, name: found.name });
            addedCount++;
        }
    });
    renderSelectedItems();
    closeDbModal();
    alert(`Добавлено позиций в акт: ${addedCount}`);
}

function returnEquipmentToOffice(inv) {
    if (window.EQUIPMENT_DB && window.EQUIPMENT_DB[inv]) {
        window.EQUIPMENT_DB[inv].status = 'В офисе';
        saveToStore(APP_STORAGE_KEYS.EQUIPMENT_DB, window.EQUIPMENT_DB);
        renderDbTable();
    }
}

function getActsHistory() { return loadFromStore(APP_STORAGE_KEYS.ACTS_HISTORY, []); }
function saveActToHistory(act) { const h = getActsHistory(); h.unshift(act); saveToStore(APP_STORAGE_KEYS.ACTS_HISTORY, h); }

function openHistoryModal() { renderHistoryTable(); document.getElementById('historyModal').style.display = 'flex'; }
function closeHistoryModal() { document.getElementById('historyModal').style.display = 'none'; }

function renderHistoryTable() {
    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return;
    const h = getActsHistory();
    const filter = (document.getElementById('historySearchInput')?.value || '').toLowerCase().trim();
    tbody.innerHTML = '';
    
    if (h.length === 0) { 
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:20px;">История пуста</td></tr>'; 
        return; 
    }

    h.forEach(act => {
        const retDateObj = parseCustomDate(act.returnDate);
        const isOverdue = retDateObj && retDateObj < new Date();

        const rowStyle = isOverdue ? 'background: rgba(255, 42, 109, 0.1); border-left: 4px solid var(--status-busy);' : '';
        const itemsList = act.items ? act.items.map(i => i.name).join(', ') : act.name;
        const invsList = act.items ? act.items.map(i => i.inv).join(', ') : act.inv;
        const searchStr = `${act.num} ${act.date} ${act.participant} ${itemsList} ${invsList}`.toLowerCase();
        
        if (!filter || searchStr.includes(filter)) {
            const tr = document.createElement('tr');
            tr.style.cssText = rowStyle;
            tr.innerHTML = `
                <td><b>№ ${act.num}</b></td>
                <td>${act.date}</td>
                <td>${act.returnDate}</td>
                <td><span class="badge-status free">${act.role || 'Участник'}</span></td>
                <td>${act.participant}</td>
                <td>${act.contact || '—'}</td>
                <td>${itemsList} (${act.items ? act.items.length : 1} шт.)</td>
                <td>
                    <div style="display:flex;gap:6px;">
                        <button class="select-btn" onclick="editActFromHistory('${act.num}')" title="Редактировать">✏️</button>
                        <button class="select-btn" onclick="reprintAct('${act.num}')" title="Печать">🖨️</button>
                        <button class="delete-btn" onclick="deleteActFromHistory('${act.num}')" title="Удалить">🗑️</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

function deleteActFromHistory(actNum) {
    if (confirm(`Удалить Акт № ${actNum}?`)) {
        let h = getActsHistory().filter(a => a.num !== actNum);
        saveToStore(APP_STORAGE_KEYS.ACTS_HISTORY, h);
        renderHistoryTable();
    }
}

function generateAndPrintAct() {
    const data = collectActData();
    if (!data) {
        alert('Невозможно сформировать акт: проверьте, добавлено ли оборудование и заполнены ли обязательные поля.');
        return;
    }

    if (window.EQUIPMENT_DB) {
        data.items.forEach(item => {
            if (window.EQUIPMENT_DB[item.inv]) {
                const cInfo = data.contact !== '—' ? ` (${data.contact})` : '';
                const statusStr = `На площадке (${data.participant}${cInfo})`;
                window.EQUIPMENT_DB[item.inv].status = statusStr;
            }
        });
        saveToStore(APP_STORAGE_KEYS.EQUIPMENT_DB, window.EQUIPMENT_DB);
    }

    saveActToHistory(data);
    preparePrintArea(data);
    
    const printArea = document.getElementById('act-print-area');
    const callsheetArea = document.getElementById('callsheet-print-area');
    
    if (callsheetArea) {
        callsheetArea.classList.remove('active-print');
        callsheetArea.style.display = 'none';
    }
    if (printArea) {
        printArea.classList.add('active-print');
        printArea.style.display = 'block';
    } else {
        alert('Ошибка: элемент области печати #act-print-area не найден в DOM!');
        return;
    }
    
    window.setTimeout(() => {
        window.print();
        if (printArea) {
            printArea.classList.remove('active-print');
            printArea.style.display = 'none';
        }
        currentActItems = []; 
        renderSelectedItems(); 
        resetForm();
    }, 100);
}

function collectActData() {
    const invInput = document.getElementById('inv-input')?.value.trim();
    const nameInput = document.getElementById('equipment-name')?.value.trim();
    if (invInput && nameInput && !currentActItems.some(i => i.inv === invInput)) { currentActItems.push({ inv: invInput, name: nameInput }); }
    if (currentActItems.length === 0) { alert('Добавьте оборудование!'); return null; }
    const h = getActsHistory();
    const noRet = document.getElementById('no-return-date-checkbox')?.checked;
    const rawDate = document.getElementById('return-date-input')?.value;
    let retDate = '—';
    if (!noRet && rawDate) { const p = rawDate.split('-'); retDate = `${p[2]}.${p[1]}.${p[0]}`; }
    return {
        num: `2026-${String(h.length + 1).padStart(3, '0')}`,
        date: new Date().toLocaleDateString('ru-RU'),
        dateIntro: getFormattedDate(),
        returnDate: retDate,
        items: [...currentActItems],
        comp: document.getElementById('competence-select').value,
        manager: document.getElementById('manager-select').value,
        role: document.getElementById('recipient-role-select').value,
        participant: getParticipantValue() || '—',
        contact: getFullContactValue(),
        comment: document.getElementById('comment-input').value || '—'
    };
}

function preparePrintArea(act) {
    const numEl = document.getElementById('print-act-num');
    if (numEl) numEl.innerText = act.num;

    const subEl = document.getElementById('print-subtitle-container');
    if (subEl) subEl.innerHTML = getActSubtitleText(act.role, act.participant, act.comp);

    const idat = getUnderlineDateStr(act.date);
    const rdat = getUnderlineDateStr(act.returnDate);
    document.querySelectorAll('.print-underline-date-issue').forEach(e => e.innerHTML = idat);
    document.querySelectorAll('.print-underline-date-return').forEach(e => e.innerHTML = rdat);

    const mt = MANAGER_TITLES[act.manager] || "Административно-технический отдел";
    
    const mgrTitleOut = document.getElementById('print-manager-title-out');
    if (mgrTitleOut) mgrTitleOut.innerText = `Выдал ${mt.toLowerCase()}`;

    const mgrTitleIn = document.getElementById('print-manager-title-in');
    if (mgrTitleIn) mgrTitleIn.innerText = `Принял ${mt.toLowerCase()}`;

    const mgrOut = document.getElementById('print-manager-out');
    if (mgrOut) mgrOut.innerText = act.manager;

    const mgrIn = document.getElementById('print-manager-in');
    if (mgrIn) mgrIn.innerText = act.manager;

    const rt = getRecipientRoleTitle(act.role, act.participant);
    document.querySelectorAll('[id^="print-recipient-role-grid"]').forEach(e => e.innerText = rt);

    const sn = act.participant !== '—' ? act.participant : '__________________________';
    const sigEl = document.getElementById('print-participant-sig');
    if (sigEl) sigEl.innerText = sn;
    
    const tbodyEl = document.getElementById('print-table-tbody');
    if (tbodyEl) {
        tbodyEl.innerHTML = act.items.map((it, idx) => `
            <tr><td>${idx+1}</td><td style="text-align:left;">${it.name}</td><td>${it.inv}</td><td>${act.participant}</td><td>${act.contact}</td><td>1</td><td>${act.date}</td><td>${act.returnDate}</td><td style="text-align:left;">${act.comment}</td></tr>
        `).join('');
    }
}

function reprintAct(num) {
    const act = getActsHistory().find(a => a.num === num);
    if (!act) {
        alert('Акт не найден в истории!');
        return;
    }
    
    preparePrintArea(act);
    
    const printArea = document.getElementById('act-print-area');
    const callsheetArea = document.getElementById('callsheet-print-area');
    
    if (callsheetArea) {
        callsheetArea.classList.remove('active-print');
        callsheetArea.style.display = 'none';
    }
    
    if (printArea) {
        printArea.classList.add('active-print');
        printArea.style.display = 'block';
    } else {
        alert('Ошибка: элемент области печати #act-print-area не найден!');
        return;
    }
    
    closeHistoryModal(); 
    
    window.setTimeout(() => {
        window.print();
        if (printArea) {
            printArea.classList.remove('active-print');
            printArea.style.display = 'none';
        }
    }, 100);
}

function resetForm() {
    const i = document.getElementById('inv-input'); if (i) i.value = '';
    const n = document.getElementById('equipment-name'); if (n) n.value = '';
    const p = document.getElementById('participant-name'); if (p) p.value = '';
    const c = document.getElementById('contact-input'); if (c) c.value = '';
    const m = document.getElementById('comment-input'); if (m) m.value = '';
    updateInvActionButton();
}

function getFullContactValue() { return document.getElementById('contact-input')?.value.trim() || '—'; }
function getParticipantValue() { const el = document.getElementById('participant-name'); return el ? el.value.trim() : ''; }

function getRecipientRoleTitle(role, name) {
    if (role === 'Сотрудник') {
        const emp = EMPLOYEES_LIST.find(e => e.name === name);
        return emp && emp.role ? emp.role : role;
    }
    return role;
}
function getActSubtitleText(role, part, comp) {
    if (role === 'Сотрудник') return `Выдано сотруднику Артмастерс: <b>${getRecipientRoleTitle(role, part)} — ${part}</b>`;
    return `${role} компетенции — <b>${comp}</b>`;
}

function openContactsModal() { renderEmployeesDirectory(); document.getElementById('contactsModal').style.display = 'flex'; }
function closeContactsModal() { document.getElementById('contactsModal').style.display = 'none'; }

function renderEmployeesDirectory() {
    const container = document.getElementById('contactsGridContainer');
    if (!container) return;
    const search = (document.getElementById('contactsSearchInput')?.value || '').toLowerCase().trim();
    container.innerHTML = '';
    const filtered = EMPLOYEES_LIST.map((emp, originalIndex) => ({ emp, originalIndex })).filter(({ emp }) => {
        const text = `${emp.name} ${emp.role} ${emp.phone} ${emp.email || ''}`.toLowerCase();
        return !search || text.includes(search);
    });
    if (filtered.length === 0) { container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:20px;">Ничего не найдено</p>'; return; }
    filtered.forEach(({ emp, originalIndex }) => {
        const cleanPhone = emp.phone ? emp.phone.replace(/\D/g, '') : '';
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <div class="contact-actions">
                <button class="action-icon-btn" onclick="openContactEditorModal(${originalIndex})">✏️</button>
                <button class="action-icon-btn delete" onclick="deleteContact(${originalIndex})">🗑️</button>
            </div>
            <div class="contact-name">${emp.name}</div>
            <div class="contact-role">${emp.role || ''}</div>
            <div class="contact-info">
                <div>📞 <a href="tel:${emp.phone}">${formatPhoneNumberStr(emp.phone)}</a></div>
                ${emp.email ? `<div>✉️ <a href="mailto:${emp.email}">${emp.email}</a></div>` : ''}
            </div>
            <div class="contact-badges">
                ${emp.tg ? `<a href="https://t.me/+${cleanPhone}" target="_blank" class="contact-badge badge-tg">Telegram</a>` : ''}
                ${emp.max ? `<span class="contact-badge badge-max">MAX</span>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

function openContactEditorModal(index = -1) {
    document.getElementById('edit-contact-index').value = index;
    if (index >= 0) {
        const e = EMPLOYEES_LIST[index];
        document.getElementById('edit-contact-name').value = e.name;
        document.getElementById('edit-contact-role').value = e.role;
        document.getElementById('edit-contact-phone').value = formatPhoneNumberStr(e.phone);
        document.getElementById('edit-contact-email').value = e.email || '';
        document.getElementById('edit-contact-tg').checked = !!e.tg;
        document.getElementById('edit-contact-max').checked = !!e.max;
    } else {
        document.getElementById('edit-contact-name').value = '';
        document.getElementById('edit-contact-role').value = '';
        document.getElementById('edit-contact-phone').value = '';
        document.getElementById('edit-contact-email').value = '';
        document.getElementById('edit-contact-tg').checked = false;
        document.getElementById('edit-contact-max').checked = false;
    }
    document.getElementById('contactEditorModal').style.display = 'flex';
}
function closeContactEditorModal() { document.getElementById('contactEditorModal').style.display = 'none'; }

function saveContactData() {
    const idx = parseInt(document.getElementById('edit-contact-index').value);
    const data = {
        name: document.getElementById('edit-contact-name').value.trim(),
        role: document.getElementById('edit-contact-role').value.trim(),
        phone: document.getElementById('edit-contact-phone').value.trim(),
        email: document.getElementById('edit-contact-email').value.trim(),
        tg: document.getElementById('edit-contact-tg').checked,
        max: document.getElementById('edit-contact-max').checked
    };
    if (!data.name || !data.phone) { alert('Заполните обязательные поля!'); return; }
    if (idx >= 0) EMPLOYEES_LIST[idx] = data; else EMPLOYEES_LIST.unshift(data);
    saveToStore(APP_STORAGE_KEYS.EMPLOYEES, EMPLOYEES_LIST);
    closeContactEditorModal(); renderEmployeesDirectory();
}

function deleteContact(idx) {
    if (confirm(`Удалить контакт ${EMPLOYEES_LIST[idx].name}?`)) {
        EMPLOYEES_LIST.splice(idx, 1);
        saveToStore(APP_STORAGE_KEYS.EMPLOYEES, EMPLOYEES_LIST);
        renderEmployeesDirectory();
    }
}

function openVenuesModal() { renderVenuesTable(); document.getElementById('venuesModal').style.display = 'flex'; }
function closeVenuesModal() { document.getElementById('venuesModal').style.display = 'none'; }

function renderVenuesTable() {
    const container = document.getElementById('venuesGridContainer');
    if (!container) return;
    const search = (document.getElementById('venuesSearchInput')?.value || '').toLowerCase().trim();
    container.innerHTML = '';
    const filtered = VENUES_LIST.map((v, originalIndex) => ({ v, originalIndex })).filter(({ v }) => {
        const text = `${v.name} ${v.address} ${v.manager} ${v.status}`.toLowerCase();
        return !search || text.includes(search);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:20px;">Ничего не найдено</p>';
        return;
    }

    filtered.forEach(({ v, originalIndex }) => {
        const addressText = v.address || '—';
        const mapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(v.name + ', ' + addressText)}`;
        const card = document.createElement('div');
        card.className = 'venue-card';
        card.innerHTML = `
            <div class="contact-actions">
                <button class="action-icon-btn" onclick="openVenueEditorModal(${originalIndex})">✏️</button>
                <button class="action-icon-btn delete" onclick="deleteVenue(${originalIndex})">🗑️</button>
            </div>
            <div class="contact-name">${v.name}</div>
            <div class="contact-role">📍 <a href="${mapsUrl}" target="_blank" style="color: var(--am-cyan); text-decoration: none;">${addressText}</a></div>
            <div class="contact-info">
                <div>👤 <b>Ответственный:</b> ${v.manager || '—'}</div>
                ${v.phone ? `<div>📞 <a href="tel:${v.phone}">${formatPhoneNumberStr(v.phone)}</a></div>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

function openVenueEditorModal(idx = -1) {
    document.getElementById('edit-venue-index').value = idx;
    if (idx >= 0) {
        const v = VENUES_LIST[idx];
        document.getElementById('edit-venue-name').value = v.name;
        document.getElementById('edit-venue-address').value = v.address;
        document.getElementById('edit-venue-manager').value = v.manager;
        document.getElementById('edit-venue-phone').value = formatPhoneNumberStr(v.phone);
        document.getElementById('edit-venue-status').value = v.status;
    } else {
        document.getElementById('edit-venue-name').value = '';
        document.getElementById('edit-venue-address').value = '';
        document.getElementById('edit-venue-manager').value = '';
        document.getElementById('edit-venue-phone').value = '';
        document.getElementById('edit-venue-status').value = 'Активна';
    }
    document.getElementById('venueEditorModal').style.display = 'flex';
}
function closeVenueEditorModal() { document.getElementById('venueEditorModal').style.display = 'none'; }

function saveVenueData() {
    const idx = parseInt(document.getElementById('edit-venue-index').value);
    const data = {
        name: document.getElementById('edit-venue-name').value.trim(),
        address: document.getElementById('edit-venue-address').value.trim(),
        manager: document.getElementById('edit-venue-manager').value.trim(),
        phone: document.getElementById('edit-venue-phone').value.trim(),
        status: document.getElementById('edit-venue-status').value.trim()
    };
    if (!data.name) { alert('Укажите название!'); return; }
    if (idx >= 0) VENUES_LIST[idx] = data; else VENUES_LIST.unshift(data);
    saveToStore(APP_STORAGE_KEYS.VENUES, VENUES_LIST);
    closeVenueEditorModal(); renderVenuesTable();
}

function deleteVenue(idx) {
    if (confirm(`Удалить площадку ${VENUES_LIST[idx].name}?`)) {
        VENUES_LIST.splice(idx, 1);
        saveToStore(APP_STORAGE_KEYS.VENUES, VENUES_LIST);
        renderVenuesTable();
    }
}

function openScheduleModal() { renderScheduleTable(); document.getElementById('scheduleModal').style.display = 'flex'; }
function closeScheduleModal() { document.getElementById('scheduleModal').style.display = 'none'; }

function renderScheduleTable() {
    const container = document.getElementById('scheduleGridContainer');
    if (!container) return;
    const search = (document.getElementById('scheduleSearchInput')?.value || '').toLowerCase().trim();
    container.innerHTML = '';
    const filtered = SCHEDULE_LIST.map((s, originalIndex) => ({ s, originalIndex })).filter(({ s }) => {
        const text = `${s.time} ${s.comp} ${s.participant} ${s.location} ${s.desc}`.toLowerCase();
        return !search || text.includes(search);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:20px;">Ничего не найдено</p>';
        return;
    }

    filtered.forEach(({ s, originalIndex }) => {
        const locationText = s.location || '—';
        const mapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(locationText)}`;
        const card = document.createElement('div');
        card.className = 'schedule-card';
        card.innerHTML = `
            <div class="contact-actions">
                <button class="action-icon-btn" onclick="openScheduleEditorModal(${originalIndex})">✏️</button>
                <button class="action-icon-btn delete" onclick="deleteSchedule(${originalIndex})">🗑️</button>
            </div>
            <div class="contact-role" style="font-family:'JetBrains Mono';">${s.time}</div>
            <div class="contact-name">${s.comp}</div>
            <div class="contact-info">
                <div>📍 <b>Локация:</b> <a href="${mapsUrl}" target="_blank" style="color: var(--am-cyan); text-decoration: none;">${locationText}</a></div>
                <div>👤 <b>Участники:</b> ${s.participant}</div>
                <div style="margin-top: 4px; color: var(--text-primary); font-size: 12px;">📝 ${s.desc}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openScheduleEditorModal(idx = -1) {
    document.getElementById('edit-schedule-index').value = idx;
    if (idx >= 0) {
        const s = SCHEDULE_LIST[idx];
        document.getElementById('edit-schedule-time').value = s.time;
        document.getElementById('edit-schedule-comp').value = s.comp;
        document.getElementById('edit-schedule-participant').value = s.participant;
        document.getElementById('edit-schedule-location').value = s.location;
        document.getElementById('edit-schedule-desc').value = s.desc;
    } else {
        document.getElementById('edit-schedule-time').value = '';
        document.getElementById('edit-schedule-comp').value = '';
        document.getElementById('edit-schedule-participant').value = 'Участники';
        document.getElementById('edit-schedule-location').value = '';
        document.getElementById('edit-schedule-desc').value = '';
    }
    document.getElementById('scheduleEditorModal').style.display = 'flex';
}
function closeScheduleEditorModal() { document.getElementById('scheduleEditorModal').style.display = 'none'; }

function saveScheduleData() {
    const idx = parseInt(document.getElementById('edit-schedule-index').value);
    const data = {
        time: document.getElementById('edit-schedule-time').value.trim(),
        comp: document.getElementById('edit-schedule-comp').value.trim(),
        participant: document.getElementById('edit-schedule-participant').value.trim(),
        location: document.getElementById('edit-schedule-location').value.trim(),
        desc: document.getElementById('edit-schedule-desc').value.trim()
    };
    if (!data.time || !data.comp) { alert('Заполните поля!'); return; }
    if (idx >= 0) SCHEDULE_LIST[idx] = data; else SCHEDULE_LIST.unshift(data);
    saveToStore(APP_STORAGE_KEYS.SCHEDULE, SCHEDULE_LIST);
    closeScheduleEditorModal(); renderScheduleTable();
}

function deleteSchedule(idx) {
    if (confirm(`Удалить защиту ${SCHEDULE_LIST[idx].comp}?`)) {
        SCHEDULE_LIST.splice(idx, 1);
        saveToStore(APP_STORAGE_KEYS.SCHEDULE, SCHEDULE_LIST);
        renderScheduleTable();
    }
}

function openChampContactsModal() { renderChampContactsTable(); document.getElementById('champContactsModal').style.display = 'flex'; }
function closeChampContactsModal() { document.getElementById('champContactsModal').style.display = 'none'; }

function renderChampContactsTable() {
    const container = document.getElementById('champContactsGridContainer');
    if (!container) return;
    const search = (document.getElementById('champContactsSearchInput')?.value || '').toLowerCase().trim();
    container.innerHTML = '';
    const filtered = CHAMP_CONTACTS_LIST.map((c, originalIndex) => ({ c, originalIndex })).filter(({ c }) => {
        const text = `${c.dept} ${c.name} ${c.task} ${c.phone}`.toLowerCase();
        return !search || text.includes(search);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:20px;">Ничего не найдено</p>';
        return;
    }

    filtered.forEach(({ c, originalIndex }) => {
        const card = document.createElement('div');
        card.className = 'champ-contact-card';
        card.innerHTML = `
            <div class="contact-actions">
                <button class="action-icon-btn" onclick="openChampContactEditorModal(${originalIndex})">✏️</button>
                <button class="action-icon-btn delete" onclick="deleteChampContact(${originalIndex})">🗑️</button>
            </div>
            <div class="contact-role">${c.dept}</div>
            <div class="contact-name">${c.name}</div>
            <div class="contact-info">
                <div>📌 <b>Задача:</b> ${c.task}</div>
                <div>📞 <a href="tel:${c.phone}">${formatPhoneNumberStr(c.phone)}</a></div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openChampContactEditorModal(idx = -1) {
    document.getElementById('edit-champ-contact-index').value = idx;
    if (idx >= 0) {
        const c = CHAMP_CONTACTS_LIST[idx];
        document.getElementById('edit-champ-dept').value = c.dept;
        document.getElementById('edit-champ-name').value = c.name;
        document.getElementById('edit-champ-task').value = c.task;
        document.getElementById('edit-champ-phone').value = formatPhoneNumberStr(c.phone);
    } else {
        document.getElementById('edit-champ-dept').value = '';
        document.getElementById('edit-champ-name').value = '';
        document.getElementById('edit-champ-task').value = '';
        document.getElementById('edit-champ-phone').value = '';
    }
    document.getElementById('champContactEditorModal').style.display = 'flex';
}
function closeChampContactEditorModal() { document.getElementById('champContactEditorModal').style.display = 'none'; }

function saveChampContactData() {
    const idx = parseInt(document.getElementById('edit-champ-contact-index').value);
    const data = {
        dept: document.getElementById('edit-champ-dept').value.trim(),
        name: document.getElementById('edit-champ-name').value.trim(),
        task: document.getElementById('edit-champ-task').value.trim(),
        phone: document.getElementById('edit-champ-phone').value.trim()
    };
    if (!data.dept || !data.name || !data.phone) { alert('Заполните поля!'); return; }
    if (idx >= 0) CHAMP_CONTACTS_LIST[idx] = data; else CHAMP_CONTACTS_LIST.unshift(data);
    saveToStore(APP_STORAGE_KEYS.CHAMP_CONTACTS, CHAMP_CONTACTS_LIST);
    closeChampContactEditorModal(); renderChampContactsTable();
}

function deleteChampContact(idx) {
    if (confirm(`Удалить контакт ${CHAMP_CONTACTS_LIST[idx].name}?`)) {
        CHAMP_CONTACTS_LIST.splice(idx, 1);
        saveToStore(APP_STORAGE_KEYS.CHAMP_CONTACTS, CHAMP_CONTACTS_LIST);
        renderChampContactsTable();
    }
}

function openCallSheetModal() {
    const now = new Date();
    document.getElementById('cs-date').value = now.toISOString().slice(0, 10);
    initTechDirSelect();
    initStageMgrSelect();
    renderCsTemplatesDropdown();
    renderCsExtraInfo();
    renderCsMilestones();
    renderCsCrew();
    renderCsEquipment();
    renderCsTransport();
    document.getElementById('callSheetModal').style.display = 'flex';
    fetchOnlineWeatherAndSun();
}

function closeCallSheetModal() { document.getElementById('callSheetModal').style.display = 'none'; }

function renderCsTemplatesDropdown() {
    let container = document.getElementById('cs-templates-selector-container');
    if (!container) {
        const headerEl = document.querySelector('#callSheetModal .modal-header');
        if (headerEl) {
            container = document.createElement('div');
            container.id = 'cs-templates-selector-container';
            container.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-right: 10px;';
            container.innerHTML = `
                <select id="cs-template-select" style="padding: 8px 12px; font-size: 12px; border-radius: 10px; width: 180px;">
                    <option value="">-- Шаблоны смен --</option>
                    ${CS_TEMPLATES_LIST.map((t, i) => `<option value="${i}">${t.name}</option>`).join('')}
                </select>
                <button class="add-row-btn" onclick="applySelectedCsTemplate()" style="padding: 8px 12px; font-size: 11px;">Применить</button>
            `;
            headerEl.querySelector('.modal-actions').prepend(container);
        }
    }
}

function applySelectedCsTemplate() {
    const sel = document.getElementById('cs-template-select');
    if (!sel || sel.value === "") { alert('Выберите шаблон из списка!'); return; }
    const template = CS_TEMPLATES_LIST[parseInt(sel.value)];
    if (!template) return;

    document.getElementById('cs-shift-num').value = template.shiftNum || '';
    callSheetData.milestones = template.milestones ? JSON.parse(JSON.stringify(template.milestones)) : [];
    callSheetData.notes = template.notes || '';
    document.getElementById('cs-notes').value = template.notes || '';

    renderCsMilestones();
    alert(`Шаблон «${template.name}» успешно применен!`);
}

function initTechDirSelect() {
    const select = document.getElementById('cs-tech-dir-select');
    if (!select) return;
    select.innerHTML = '';
    const atoList = ["Зломанов Олег Викторович", "Смутный Богдан Сергеевич", "Белоусов Алексей Алексеевич", "Белоусова Анастасия Константиновна", "Сидоренко Артем Валерьевич"];
    atoList.forEach(name => {
        const emp = EMPLOYEES_LIST.find(e => e.name === name);
        const role = MANAGER_TITLES[name] || (emp ? emp.role : "Тех. отдел");
        const opt = new Option(`${name} — ${role}`, name);
        if (name === "Зломанов Олег Викторович") opt.selected = true;
        select.add(opt);
    });
    onTechDirSelect(select.value);
}

function initStageMgrSelect() {
    const select = document.getElementById('cs-stage-mgr-select');
    if (!select) return;
    select.innerHTML = '';
    EMPLOYEES_LIST.forEach(emp => {
        const opt = new Option(`${emp.name} — ${emp.role}`, emp.name);
        if (emp.name === "Жижневская Ксения Владимировна") opt.selected = true;
        select.add(opt);
    });
    onStageMgrSelect(select.value);
}

function onTechDirSelect(val) {
    const emp = EMPLOYEES_LIST.find(e => e.name === val);
    const title = MANAGER_TITLES[val] || (emp ? emp.role : "Технический директор");
    const phone = emp && emp.phone ? `, ${formatPhoneNumberStr(emp.phone)}` : '';
    callSheetData.techDirRoleTitle = title;
    callSheetData.techDirStr = `${val}${phone}`;
    const label = document.getElementById('cs-tech-dir-label');
    if (label) label.innerText = `${title} (АртМастерс)`;
}

function onStageMgrSelect(name) {
    const emp = EMPLOYEES_LIST.find(e => e.name === name);
    if (emp) {
        const phone = emp.phone ? `, ${formatPhoneNumberStr(emp.phone)}` : '';
        callSheetData.stageMgrRoleTitle = emp.role || "Продюсер";
        callSheetData.stageMgrStr = `${name}${phone}`;
        const label = document.getElementById('cs-stage-mgr-label');
        if (label) label.innerText = `${emp.role || 'Продюсер'} (АртМастерс)`;
    }
}

function renderCsExtraInfo() {
    const container = document.getElementById('cs-extra-info-container');
    if (!container) return;
    container.innerHTML = callSheetData.extraInfo.map((item, idx) => `
        <div style="display:flex; gap:10px; align-items:center; background:rgba(25,34,60,0.4); padding:10px; border-radius:12px;">
            <input type="text" value="${item.position}" placeholder="Должность" onchange="callSheetData.extraInfo[${idx}].position = this.value" style="flex:1;">
            <input type="text" value="${item.name}" placeholder="ФИО" onchange="callSheetData.extraInfo[${idx}].name = this.value" style="flex:1.5;">
            <input type="text" value="${formatPhoneNumberStr(item.phone)}" placeholder="Телефон" oninput="formatPhoneNumber(this); callSheetData.extraInfo[${idx}].phone = this.value" style="width:170px;">
            <button class="delete-btn" onclick="removeCsExtraInfo(${idx})">✕</button>
        </div>
    `).join('');
}

function addCsExtraInfoRow() { callSheetData.extraInfo.push({ position: '', name: '', phone: '' }); renderCsExtraInfo(); }
function removeCsExtraInfo(idx) { callSheetData.extraInfo.splice(idx, 1); renderCsExtraInfo(); }

function renderCsMilestones() {
    const container = document.getElementById('cs-milestones-container');
    if (!container) return;
    container.innerHTML = callSheetData.milestones.map((m, idx) => `
        <div style="display:flex; gap:10px; align-items:center;">
            <input type="text" value="${m.time}" style="width:100px;" onchange="callSheetData.milestones[${idx}].time = this.value">
            <input type="text" value="${m.event}" style="flex:1;" onchange="callSheetData.milestones[${idx}].event = this.value">
            <button class="delete-btn" onclick="removeCsMilestone(${idx})">✕</button>
        </div>
    `).join('');
}

function addCsMilestoneRow() { callSheetData.milestones.push({ time: '12:00', event: 'Новый этап' }); renderCsMilestones(); }
function removeCsMilestone(idx) { callSheetData.milestones.splice(idx, 1); renderCsMilestones(); }

function renderCsCrew() {
    const container = document.getElementById('cs-crew-container');
    if (!container) return;
    container.innerHTML = '';
    callSheetData.crew.forEach((c, idx) => {
        const div = document.createElement('div');
        div.style.cssText = 'display:flex; gap:10px; align-items:center; flex-wrap:wrap;';
        let nameHtml = `<input type="text" value="${c.name}" placeholder="ФИО" onchange="callSheetData.crew[${idx}].name = this.value" style="width:190px;">`;
        if (c.type === 'ato') {
            const list = ["Зломанов Олег Викторович", "Смутный Богдан Сергеевич", "Белоусов Алексей Алексеевич", "Белоусова Анастасия Константиновна", "Сидоренко Артем Валерьевич"];
            nameHtml = `<select onchange="onCsCrewAtoChange(${idx}, this.value)" style="width:210px;">${list.map(n => `<option value="${n}" ${n===c.name?'selected':''}>${n}</option>`).join('')}</select>`;
        } else if (c.type === 'emp') {
            nameHtml = `<select onchange="onCsCrewEmpChange(${idx}, this.value)" style="width:210px;">${EMPLOYEES_LIST.map(e => `<option value="${e.name}" ${e.name===c.name?'selected':''}>${e.name}</option>`).join('')}</select>`;
        }
        div.innerHTML = `
            <input type="text" value="${c.time}" style="width:85px;" onchange="callSheetData.crew[${idx}].time = this.value">
            <input type="text" value="${c.dept}" style="width:140px;" onchange="callSheetData.crew[${idx}].dept = this.value">
            ${nameHtml}
            <input type="text" value="${formatPhoneNumberStr(c.phone)}" style="width:160px;" oninput="formatPhoneNumber(this); callSheetData.crew[${idx}].phone = this.value">
            <input type="text" value="${c.task}" placeholder="Задача" onchange="callSheetData.crew[${idx}].task = this.value" style="flex:1;">
            <button class="delete-btn" onclick="removeCsCrew(${idx})">✕</button>
        `;
        container.appendChild(div);
    });
}

function onCsCrewAtoChange(idx, val) {
    const emp = EMPLOYEES_LIST.find(e => e.name === val);
    callSheetData.crew[idx].name = val;
    callSheetData.crew[idx].dept = MANAGER_TITLES[val] || "Тех. отдел";
    callSheetData.crew[idx].phone = emp ? emp.phone : '';
    renderCsCrew();
}

function onCsCrewEmpChange(idx, val) {
    const emp = EMPLOYEES_LIST.find(e => e.name === val);
    if (emp) {
        callSheetData.crew[idx].name = emp.name;
        callSheetData.crew[idx].dept = emp.role;
        callSheetData.crew[idx].phone = emp.phone;
    }
    renderCsCrew();
}

function addCsCrewMemberFromAto() {
    const name = "Зломанов Олег Викторович";
    const emp = EMPLOYEES_LIST.find(e => e.name === name);
    callSheetData.crew.push({ type: 'ato', time: '08:00', dept: MANAGER_TITLES[name], name, phone: emp ? emp.phone : '', task: 'Координация' });
    renderCsCrew();
}

function addCsCrewMemberFromEmployees() {
    if (EMPLOYEES_LIST.length === 0) return;
    const emp = EMPLOYEES_LIST[0];
    callSheetData.crew.push({ type: 'emp', time: '09:00', dept: emp.role, name: emp.name, phone: emp.phone, task: '' });
    renderCsCrew();
}

function addCsCrewRow() { callSheetData.crew.push({ type: 'manual', time: '09:00', dept: 'Департамент', name: '', phone: '', task: '' }); renderCsCrew(); }
function removeCsCrew(idx) { callSheetData.crew.splice(idx, 1); renderCsCrew(); }

function renderCsEquipment() {
    const container = document.getElementById('cs-equipment-container');
    if (!container) return;
    container.innerHTML = callSheetData.equipment.map((eq, idx) => `
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            <input type="text" value="${eq.name}" placeholder="Наименование" onchange="callSheetData.equipment[${idx}].name = this.value" style="flex:2;">
            <input type="text" value="${eq.inv}" placeholder="Инв. №" onchange="callSheetData.equipment[${idx}].inv = this.value" style="width:140px;">
            <input type="text" value="${eq.sn}" placeholder="SN" onchange="callSheetData.equipment[${idx}].sn = this.value" style="width:140px;">
            <input type="text" value="${eq.count}" style="width:70px; text-align:center;" onchange="callSheetData.equipment[${idx}].count = this.value">
            <button class="delete-btn" onclick="removeCsEquipment(${idx})">✕</button>
        </div>
    `).join('');
}

function addCsEquipmentRow() { callSheetData.equipment.push({ name: '', inv: '', sn: '', count: '1' }); renderCsEquipment(); }
function removeCsEquipment(idx) { callSheetData.equipment.splice(idx, 1); renderCsEquipment(); }

function addSingleItemToCallSheet(inv, name) {
    if (callSheetData.equipment.some(e => e.inv === inv)) { alert('Уже в вызывном!'); return; }
    const found = findEquipment(inv);
    callSheetData.equipment.push({ name, inv, sn: found ? (found.sn || '—') : '—', count: '1' });
    alert('Добавлено в вызывной!');
}

function importCurrentActItemsToCallSheet() {
    if (currentActItems.length === 0) { alert('Нет предметов в текущем Акте!'); return; }
    let count = 0;
    currentActItems.forEach(item => {
        if (!callSheetData.equipment.some(e => e.inv === item.inv)) {
            const found = findEquipment(item.inv);
            callSheetData.equipment.push({ name: item.name, inv: item.inv, sn: found ? (found.sn || '—') : '—', count: '1' });
            count++;
        }
    });
    renderCsEquipment();
    alert(`Импортировано ${count} позиций.`);
}

function renderCsTransport() {
    const container = document.getElementById('cs-transport-container');
    if (!container) return;
    container.innerHTML = callSheetData.transport.map((t, idx) => `
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            <input type="text" value="${t.model}" placeholder="Марка" onchange="callSheetData.transport[${idx}].model = this.value" style="width:140px;">
            <input type="text" value="${t.plate}" placeholder="Номер" onchange="callSheetData.transport[${idx}].plate = this.value" style="width:120px;">
            <input type="text" value="${t.driver}" placeholder="Водитель" onchange="callSheetData.transport[${idx}].driver = this.value" style="width:180px;">
            <input type="text" value="${formatPhoneNumberStr(t.phone)}" placeholder="Телефон" oninput="formatPhoneNumber(this); callSheetData.transport[${idx}].phone = this.value" style="width:160px;">
            <input type="text" value="${t.task}" placeholder="Задача" onchange="callSheetData.transport[${idx}].task = this.value" style="flex:1;">
            <button class="delete-btn" onclick="removeCsTransport(${idx})">✕</button>
        </div>
    `).join('');
}

function addCsTransportRow() { callSheetData.transport.push({ model: '', plate: '', driver: '', phone: '', task: '' }); renderCsTransport(); }
function removeCsTransport(idx) { callSheetData.transport.splice(idx, 1); renderCsTransport(); }

function getCsHistory() { return loadFromStore(APP_STORAGE_KEYS.CS_HISTORY, []); }

function saveCurrentCallSheetManually() {
    const data = collectCsData();
    const h = getCsHistory();
    h.unshift(data);
    saveToStore(APP_STORAGE_KEYS.CS_HISTORY, h);
    alert('Сохранено в архив!');
    openCallSheetHistoryModal();
}

function collectCsData() {
    const rawDate = document.getElementById('cs-date').value;
    const p = rawDate.split('-');
    return {
        id: 'CS-' + Date.now(),
        projectName: document.getElementById('cs-project-name').value,
        date: `${p[2]}.${p[1]}.${p[0]}`,
        shiftNum: document.getElementById('cs-shift-num').value,
        city: document.getElementById('cs-city').value,
        location: document.getElementById('cs-location').value,
        address: document.getElementById('cs-address').value,
        compMgrName: document.getElementById('cs-comp-mgr-name').value,
        compMgrPhone: document.getElementById('cs-comp-mgr-phone').value,
        techDirRoleTitle: callSheetData.techDirRoleTitle,
        techDirStr: callSheetData.techDirStr,
        stageMgrRoleTitle: callSheetData.stageMgrRoleTitle,
        stageMgrStr: callSheetData.stageMgrStr,
        venueTechDirName: document.getElementById('cs-venue-tech-dir-name').value,
        venueTechDirPhone: document.getElementById('cs-venue-tech-dir-phone').value,
        venueMgrName: document.getElementById('cs-venue-mgr-name').value,
        venueMgrPhone: document.getElementById('cs-venue-mgr-phone').value,
        extraInfo: [...callSheetData.extraInfo],
        milestones: [...callSheetData.milestones],
        crew: [...callSheetData.crew],
        equipment: [...callSheetData.equipment],
        transport: [...callSheetData.transport],
        notes: document.getElementById('cs-notes').value,
        weatherInfo: document.getElementById('weather-info-text').innerText
    };
}

function printCallSheet() {
    const cs = collectCsData();
    fillCsPrintArea(cs);
    
    const printArea = document.getElementById('callsheet-print-area');
    const actArea = document.getElementById('act-print-area');
    
    if (actArea) {
        actArea.classList.remove('active-print');
        actArea.style.display = 'none';
    }
    if (printArea) {
        printArea.classList.add('active-print');
        printArea.style.display = 'block';
    }
    
    window.print();
    
    if (printArea) {
        printArea.classList.remove('active-print');
        printArea.style.display = 'none';
    }
}

function fillCsPrintArea(cs) {
    document.getElementById('csp-project-name').innerText = cs.projectName;
    document.getElementById('csp-date').innerText = cs.date;
    document.getElementById('csp-shift-num').innerText = cs.shiftNum;
    document.getElementById('csp-weather-line').innerText = cs.weatherInfo;
    document.getElementById('csp-print-city').innerText = cs.city;
    document.getElementById('csp-print-location').innerText = cs.location;
    document.getElementById('csp-print-address').innerText = cs.address;
    document.getElementById('csp-tech-dir-label-print').innerText = cs.techDirRoleTitle + ':';
    document.getElementById('csp-tech-dir').innerText = cs.techDirStr;
    document.getElementById('csp-stage-mgr-label-print').innerText = cs.stageMgrRoleTitle + ':';
    document.getElementById('csp-stage-mgr').innerText = cs.stageMgrStr;
    document.getElementById('csp-comp-mgr-full').innerText = `${cs.compMgrName} (${formatPhoneNumberStr(cs.compMgrPhone)})`;
    document.getElementById('csp-venue-td-print').innerText = `${cs.venueTechDirName} ${formatPhoneNumberStr(cs.venueTechDirPhone)}`;
    document.getElementById('csp-venue-mgr-print').innerText = `${cs.venueMgrName} ${formatPhoneNumberStr(cs.venueMgrPhone)}`;
    document.getElementById('csp-notes').innerText = cs.notes;
    document.getElementById('csp-milestones-tbody').innerHTML = cs.milestones.map(m => `<tr><td>${m.time}</td><td style="text-align:left;">${m.event}</td></tr>`).join('');
    document.getElementById('csp-crew-tbody').innerHTML = cs.crew.map(c => `<tr><td>${c.time}</td><td>${c.dept}</td><td>${c.name}</td><td>${formatPhoneNumberStr(c.phone)}</td><td style="text-align:left;">${c.task}</td></tr>`).join('');
    document.getElementById('csp-equipment-tbody').innerHTML = cs.equipment.map((e, i) => `<tr><td>${i+1}</td><td>${e.name}</td><td>${e.inv}</td><td>${e.sn}</td><td>${e.count}</td></tr>`).join('');
    document.getElementById('csp-transport-tbody').innerHTML = cs.transport.map(t => `<tr><td>${t.model}</td><td>${t.plate}</td><td>${t.driver}</td><td>${formatPhoneNumberStr(t.phone)}</td><td style="text-align:left;">${t.task}</td></tr>`).join('');
}

function openCallSheetHistoryModal() {
    const tbody = document.getElementById('csHistoryTableBody');
    if (!tbody) return;
    const h = getCsHistory();
    const search = (document.getElementById('csHistorySearchInput')?.value || '').toLowerCase().trim();
    tbody.innerHTML = '';
    
    const filtered = h.filter(cs => {
        const text = `${cs.projectName} ${cs.date} ${cs.city} ${cs.location} ${cs.compMgrName}`.toLowerCase();
        return !search || text.includes(search);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;">Архив пуст</td></tr>';
        document.getElementById('csHistoryModal').style.display = 'flex';
        return;
    }

    tbody.innerHTML = filtered.map(cs => `
        <tr>
            <td><b>${cs.projectName}</b></td>
            <td>${cs.date}</td>
            <td>${cs.city}</td>
            <td>${cs.location}</td>
            <td>${cs.compMgrName}</td>
            <td>
                <div style="display:flex; gap:6px;">
                    <button class="select-btn" onclick="editCallSheetFromHistory('${cs.id}')">✏️</button>
                    <button class="select-btn" onclick="reprintCallSheet('${cs.id}')">🖨️</button>
                    <button class="delete-btn" onclick="deleteCallSheetFromHistory('${cs.id}')">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
    document.getElementById('csHistoryModal').style.display = 'flex';
}

function closeCallSheetHistoryModal() { document.getElementById('csHistoryModal').style.display = 'none'; }

function reprintCallSheet(id) {
    const cs = getCsHistory().find(c => c.id === id);
    if (!cs) return;
    fillCsPrintArea(cs);
    
    const printArea = document.getElementById('callsheet-print-area');
    const actArea = document.getElementById('act-print-area');
    
    if (actArea) {
        actArea.classList.remove('active-print');
        actArea.style.display = 'none';
    }
    if (printArea) {
        printArea.classList.add('active-print');
        printArea.style.display = 'block';
    }
    
    window.print();
    
    if (printArea) {
        printArea.classList.remove('active-print');
        printArea.style.display = 'none';
    }
}

function deleteCallSheetFromHistory(id) {
    if (confirm('Удалить вызывной из архива?')) {
        const h = getCsHistory().filter(c => c.id !== id);
        saveToStore(APP_STORAGE_KEYS.CS_HISTORY, h);
        openCallSheetHistoryModal();
    }
}

function editCallSheetFromHistory(id) {
    const history = getCsHistory();
    const cs = history.find(c => c.id === id);
    if (!cs) { alert('Вызывной лист не найден в архиве!'); return; }

    document.getElementById('cs-project-name').value = cs.projectName || '';
    if (cs.date) {
        const parts = cs.date.split('.');
        if (parts.length === 3) {
            document.getElementById('cs-date').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    }
    document.getElementById('cs-shift-num').value = cs.shiftNum || '';
    document.getElementById('cs-city').value = cs.city || 'Москва';
    document.getElementById('cs-location').value = cs.location || '';
    document.getElementById('cs-address').value = cs.address || '';
    document.getElementById('cs-comp-mgr-name').value = cs.compMgrName || '';
    document.getElementById('cs-comp-mgr-phone').value = cs.compMgrPhone || '';
    document.getElementById('cs-venue-tech-dir-name').value = cs.venueTechDirName || '';
    document.getElementById('cs-venue-tech-dir-phone').value = cs.venueTechDirPhone || '';
    document.getElementById('cs-venue-mgr-name').value = cs.venueMgrName || '';
    document.getElementById('cs-venue-mgr-phone').value = cs.venueMgrPhone || '';
    document.getElementById('cs-notes').value = cs.notes || '';

    callSheetData.extraInfo = cs.extraInfo ? [...cs.extraInfo] : [];
    callSheetData.milestones = cs.milestones ? [...cs.milestones] : [];
    callSheetData.crew = cs.crew ? [...cs.crew] : [];
    callSheetData.equipment = cs.equipment ? [...cs.equipment] : [];
    callSheetData.transport = cs.transport ? [...cs.transport] : [];

    renderCsExtraInfo();
    renderCsMilestones();
    renderCsCrew();
    renderCsEquipment();
    renderCsTransport();

    closeCallSheetHistoryModal();
    document.getElementById('callSheetModal').style.display = 'flex';
    
    const updatedHistory = history.filter(c => c.id !== id);
    saveToStore(APP_STORAGE_KEYS.CS_HISTORY, updatedHistory);
    alert('Вызывной лист загружен для редактирования.');
}

function editActFromHistory(actNum) {
    const history = getActsHistory();
    const act = history.find(a => a.num === actNum);
    if (!act) { alert('Акт не найден в архиве!'); return; }

    document.getElementById('competence-select').value = act.comp || '';
    document.getElementById('manager-select').value = act.manager || '';
    document.getElementById('recipient-role-select').value = act.role || 'Участник';
    
    onRoleChange(act.role || 'Участник');
    
    const partInput = document.getElementById('participant-name');
    if (partInput) partInput.value = act.participant !== '—' ? act.participant : '';
    
    const contactInput = document.getElementById('contact-input');
    if (contactInput) contactInput.value = act.contact !== '—' ? act.contact : '';
    
    const commentInput = document.getElementById('comment-input');
    if (commentInput) commentInput.value = act.comment !== '—' ? act.comment : '';

    currentActItems = act.items ? [...act.items] : [];
    renderSelectedItems();

    closeHistoryModal();
    switchAppSection('section-mtb');

    const updatedHistory = history.filter(a => a.num !== actNum);
    saveToStore(APP_STORAGE_KEYS.ACTS_HISTORY, updatedHistory);
    alert(`Акт № ${actNum} загружен в форму для редактирования.`);
}

async function fetchOnlineWeatherAndSun() {
    const city = document.getElementById('cs-city')?.value.trim() || 'Москва';
    const date = document.getElementById('cs-date')?.value || new Date().toISOString().slice(0,10);
    const info = document.getElementById('weather-info-text');
    if (!info) return;
    info.innerText = `Загрузка для ${city}...`;
    try {
        const gRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`);
        const gData = await gRes.json();
        if (!gData.results?.length) { info.innerText = 'Город не найден'; return; }
        const { latitude, longitude, name } = gData.results[0];
        const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,temperature_2m_max&timezone=auto&start_date=${date}&end_date=${date}`);
        const wData = await wRes.json();
        if (wData.daily?.sunrise?.length) {
            const temp = wData.daily.temperature_2m_max[0];
            const sunrise = wData.daily.sunrise[0].split('T')[1].substring(0,5);
            const sunset = wData.daily.sunset[0].split('T')[1].substring(0,5);
            onlineWeatherData = { temp: `${temp > 0 ? '+' : ''}${temp}°C`, sunrise, sunset };
            info.innerHTML = `📍 ${name} | Темп: <b>${onlineWeatherData.temp}</b> | 🌅 Восход: <b>${sunrise}</b> | 🌇 Закат: <b>${sunset}</b>`;
        }
    } catch (e) { info.innerText = 'Ошибка загрузки погоды'; }
}

function appendWeatherToNotes() {
    if (!onlineWeatherData.sunrise) { alert('Сначала загрузите погоду!'); return; }
    const notes = document.getElementById('cs-notes');
    if (!notes) return;
    const str = `Погода: ${onlineWeatherData.temp}. Восход: ${onlineWeatherData.sunrise}, Закат: ${onlineWeatherData.sunset}.`;
    if (!notes.value.includes(str)) notes.value += (notes.value ? '\n' : '') + str;
}

function downloadCSV(filename, rows) {
    let content = "\uFEFF" + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join("\r\n");
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = filename;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function exportDbToCSV() {
    const rows = [["Инв. №", "Категория", "Наименование", "SN", "Статус"]];
    Object.values(window.EQUIPMENT_DB || {}).forEach(i => rows.push([i.inv, i.category, i.name, i.sn, i.status]));
    downloadCSV(`MTB_DB_${new Date().toISOString().slice(0,10)}.csv`, rows);
}

function exportActsToCSV() {
    const rows = [["№", "Дата", "Возврат", "Компетенция", "Получатель", "Контакты", "Предметы"]];
    getActsHistory().forEach(a => rows.push([a.num, a.date, a.returnDate, a.comp, a.participant, a.contact, a.items.map(i=>i.inv).join(', ')]));
    downloadCSV(`Acts_Registry_${new Date().toISOString().slice(0,10)}.csv`, rows);
}

function exportCallSheetToCSV() {
    const cs = collectCsData();
    const rows = [["Проект", cs.projectName], ["Дата", cs.date], ["Город", cs.city], []];
    rows.push(["Тайминг", "Событие"]);
    cs.milestones.forEach(m => rows.push([m.time, m.event]));
    downloadCSV(`CallSheet_${cs.projectName}.csv`, rows);
}

function downloadActWord() {
    const actData = collectActData();
    if (!actData) {
        alert('Невозможно скачать акт: добавьте оборудование в список!');
        return;
    }
    
    preparePrintArea(actData);
    const printAreaEl = document.getElementById('act-print-area');
    if (!printAreaEl) {
        alert('Ошибка: область печати акта не найдена.');
        return;
    }

    const printAreaHtml = printAreaEl.innerHTML;
    const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/1999/xlink'>
        <head><meta charset='utf-8'><title>Акт № ${actData.num}</title>
        <style>body { font-family: Arial, sans-serif; color: #000; font-size: 10pt; line-height: 1.3; } table.act-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; } table.act-table th, table.act-table td { border: 1px solid #000; padding: 4px 6px; font-size: 9pt; text-align: center; } table.act-table th { background-color: #f2f2f2; font-weight: bold; } .act-header { text-align: center; font-weight: bold; font-size: 12pt; margin-bottom: 15px; } .rules-block { font-size: 8.5pt; margin-bottom: 10px; } .signatures-grid { width: 100%; margin-top: 15px; border-collapse: collapse; } .signatures-grid td { width: 50%; font-size: 9pt; padding: 5px 0; vertical-align: top; }</style></head>
        <body>${printAreaHtml}</body></html>
    `;
    
    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); 
    link.href = url; 
    link.download = `Akt_${actData.num}.doc`;
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadCallSheetWord() {
    const cs = collectCsData();
    fillCsPrintArea(cs);
    const printArea = document.getElementById('callsheet-print-area').innerHTML;
    const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/1999/xlink'>
        <head><meta charset='utf-8'><title>Вызывной лист — ${cs.projectName}</title>
        <style>body { font-family: Arial, sans-serif; color: #000; font-size: 9pt; line-height: 1.3; } table.act-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; } table.act-table th, table.act-table td { border: 1px solid #000; padding: 4px 6px; font-size: 8.5pt; text-align: center; } table.act-table th { background-color: #f2f2f2; font-weight: bold; } .cs-print-header { border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 10px; } .cs-print-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; }</style></head>
        <body>${printArea}</body></html>
    `;
    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `CallSheet_${cs.projectName.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function onRoleChange(role) {
    const label = document.getElementById('participant-label');
    const container = document.getElementById('participant-container');
    const compLabel = document.getElementById('competence-label');
    const compSel = document.getElementById('competence-select');
    const officeOpt = document.getElementById('office-option');
    if (!label || !container || !compLabel || !compSel) return;
    label.innerText = `ФИО (${role})`;
    if (role === 'Сотрудник') {
        compLabel.innerText = 'Офис';
        document.querySelectorAll('.comp-opt').forEach(o => o.style.display = 'none');
        if (officeOpt) officeOpt.style.display = 'block';
        compSel.value = 'Офис';
        container.innerHTML = `<select id="participant-name" onchange="onEmployeeSelect(this.value)"><option value="">-- Выберите --</option>${EMPLOYEES_LIST.map(e => `<option value="${e.name}">${e.name}</option>`).join('')}</select>`;
    } else {
        compLabel.innerText = 'Компетенция';
        document.querySelectorAll('.comp-opt').forEach(o => o.style.display = 'block');
        if (officeOpt) officeOpt.style.display = 'none';
        if (compSel.value === 'Офис') compSel.selectedIndex = 0;
        container.innerHTML = `<input type="text" id="participant-name" placeholder="Введите ФИО...">`;
    }
}

function onEmployeeSelect(name) {
    const emp = EMPLOYEES_LIST.find(e => e.name === name);
    const input = document.getElementById('contact-input');
    if (emp && emp.phone && input) input.value = formatPhoneNumberStr(emp.phone);
}

function onCountryCodeChange() { const i = document.getElementById('contact-input'); if (i) formatPhoneNumber(i); }

function checkEquipmentReturnDeadlines() {
    const history = getActsHistory();
    const today = new Date();

    history.forEach(act => {
        const retDateObj = parseCustomDate(act.returnDate);
        if (retDateObj) {
            const diffTime = retDateObj - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 0) {
                console.warn(`Внимание! По акту № ${act.num} истек срок возврата оборудования (${act.returnDate}). Получатель: ${act.participant}`);
            }
        }
    });
}