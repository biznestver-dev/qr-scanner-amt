const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBU7kaVEoJ57SuDEJMev5W8t26K9Tl5vPA",
  authDomain: "base-expert.firebaseapp.com",
  databaseURL: "https://base-expert-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "base-expert",
  storageBucket: "base-expert.firebasestorage.app",
  messagingSenderId: "828487534852",
  appId: "1:828487534852:web:ceac10e3b923c8c1ff6851",
  measurementId: "G-377EP3V7JP"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const bot = new Telegraf(process.env.BOT_TOKEN);

const mainInlineMenu = Markup.inlineKeyboard([
    [Markup.button.callback('📋 Менеджеры компетенций', 'btn_contacts')],
    [Markup.button.callback('📍 Площадки', 'btn_venues')],
    [Markup.button.callback('📅 Расписание защит', 'btn_schedule')],
    [Markup.button.callback('🔍 Проверить оборудование', 'btn_check')]
]);

const backToMenuInline = Markup.inlineKeyboard([
    [Markup.button.callback('🏠 Главное меню', 'main_menu')]
]);

async function showMenu(ctx, text, keyboard) {
    if (ctx.callbackQuery) {
        try {
            return await ctx.editMessageText(text, {
                parse_mode: 'HTML',
                ...keyboard
            });
        } catch (e) {
            await ctx.answerCbQuery().catch(() => {});
            return;
        }
    }

    try {
        if (ctx.message && ctx.message.message_id) {
            await ctx.deleteMessage(ctx.message.message_id);
        }
    } catch (e) {}

    return await ctx.reply(text, {
        parse_mode: 'HTML',
        ...keyboard
    });
}

bot.start(async (ctx) => {
    const chatId = ctx.chat.id;
    const username = ctx.from.username || '';
    const firstName = ctx.from.first_name || '';

    try {
        await setDoc(doc(db, "tg_users", String(chatId)), {
            chatId: chatId,
            username: username,
            firstName: firstName,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    } catch (e) {
        console.error("Ошибка сохранения пользователя в Firebase:", e);
    }

    await showMenu(
        ctx,
        `🛠 <b>Техотдел AM | Панель управления</b>\n\nПривет, ${firstName}! Ваш Telegram успешно зарегистрирован для получения уведомлений.\n\nВыберите нужный раздел:`,
        mainInlineMenu
    );
});

bot.action('main_menu', async (ctx) => {
    await showMenu(
        ctx,
        '🛠 <b>Техотдел AM | Главное меню</b>\n\nВыберите нужный раздел:',
        mainInlineMenu
    );
});

bot.action('btn_contacts', async (ctx) => {
    const contacts = [
        { dept: "Техническая служба", name: "Зломанов Олег Викторович", task: "Административно-технический директор", phone: "+79206931013" },
        { dept: "Служба логистики", name: "Смутный Богдан Сергеевич", task: "Технический менеджер", phone: "+79601805290" },
        { dept: "Координация компетенций", name: "Маргарита Лютикова", task: "Старший менеджер компетенций", phone: "+79601291238" }
    ];

    let message = '<b>📋 Менеджеры и службы:</b>\n\n';
    contacts.forEach((c) => {
        message += `🔹 <b>${c.dept}</b>\n👤 ${c.name}\n📌 ${c.task}\n📞 <code>${c.phone}</code>\n\n`;
    });

    await showMenu(ctx, message, backToMenuInline);
});

bot.action('btn_venues', async (ctx) => {
    const venues = [
        { name: "Хабаровск / Полигон креативных компетенций", address: "г. Хабаровск", manager: "Дарья Полякова" },
        { name: "Театр «Маска»", address: "Москва", manager: "Владислав Скрипко" },
        { name: "Боярские палаты", address: "Москва", manager: "Мария Фёдорова" }
    ];

    let message = '<b>📍 Основные площадки:</b>\n\n';
    venues.forEach((v) => {
        message += `🏛 <b>${v.name}</b>\n📍 Адрес: ${v.address}\n👤 Менеджер: ${v.manager}\n\n`;
    });

    await showMenu(ctx, message, backToMenuInline);
});

bot.action('btn_schedule', async (ctx) => {
    await showMenu(
        ctx,
        '📅 Актуальное расписание защит доступно в веб-приложении техотдела в разделе "Основной чемпионат".',
        backToMenuInline
    );
});

bot.action('btn_check', async (ctx) => {
    await showMenu(
        ctx,
        '🔍 Отправьте инвентарный номер оборудования в чат (например: <code>AM-DS-0001</code>), чтобы проверить его статус.',
        backToMenuInline
    );
});

bot.on('text', async (ctx) => {
    const text = ctx.message.text.trim();
    if (text.toLowerCase() === '/start') return;

    try {
        await ctx.deleteMessage(ctx.message.message_id);
    } catch (e) {}

    const upperText = text.toUpperCase();
    if (upperText.startsWith('AM-')) {
        try {
            const docRef = doc(db, "equipment", upperText);
            const docSnap = await getDoc(docRef);
            
            let replyText = '';
            if (docSnap.exists()) {
                const data = docSnap.data();
                replyText = `🔍 Инвентарный номер: <b>${upperText}</b>\n📦 Наименование: <b>${data.name || '—'}</b>\n📌 Статус: <b>${data.status || 'В офисе'}</b>`;
            } else {
                replyText = `❌ Оборудование с номером <b>${upperText}</b> не найдено в базе Firestore.`;
            }

            await showMenu(ctx, replyText, backToMenuInline);
        } catch (e) {
            console.error(e);
            await showMenu(ctx, `⚠️ Ошибка при запросе статуса для <b>${upperText}</b> в базе данных.`, backToMenuInline);
        }
    }
});

bot.launch();
console.log('🤖 Telegram-бот с поддержкой уведомлений успешно запущен!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));