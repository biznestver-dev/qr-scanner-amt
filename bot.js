const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const BOT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx6XQyX1upzSIrbq7zw37ZDi3F2giOy9ZbBY8VkjBkN8LiDkAXp0tXh85aKw9lDn8u2/exec";

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
            return await ctx.editMessageText(text, { parse_mode: 'HTML', ...keyboard }); 
        } catch (e) { 
            await ctx.answerCbQuery().catch(() => {}); 
            return; 
        }
    }
    try { 
        if (ctx.message) await ctx.deleteMessage(ctx.message.message_id); 
    } catch (e) {}
    return await ctx.reply(text, { parse_mode: 'HTML', ...keyboard });
}

bot.start(async (ctx) => {
    try {
        await fetch(BOT_WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify({ 
                type: 'saveUser', 
                chatId: ctx.chat.id, 
                username: ctx.from.username || '', 
                firstName: ctx.from.first_name || '' 
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) { 
        console.error("Ошибка синхронизации пользователя:", e); 
    }

    await showMenu(ctx, `🛠 <b>Техотдел AM</b>\n\nПривет, ${ctx.from.first_name}! Бот подключен к Google Таблицам.`, mainInlineMenu);
});

bot.action('main_menu', async (ctx) => {
    await showMenu(ctx, '🛠 <b>Главное меню:</b>', mainInlineMenu);
});

bot.action('btn_contacts', async (ctx) => {
    const text = `📋 <b>Контакты координаторов:</b>\n\n` +
        `• <b>Олег Зломанов</b> (АТД): +79206931013\n` +
        `• <b>Богдан Смутный</b> (Логистика): +79601805290\n` +
        `• <b>Маргарита Лютикова</b> (Компетенции): +79601291238`;
    await showMenu(ctx, text, backToMenuInline);
});

bot.action('btn_venues', async (ctx) => {
    const text = `📍 <b>Основные площадки:</b>\n\n` +
        `• <b>Театр «Маска»</b> — Комсомольский пр., 28\n` +
        `• <b>Школа «Индустрия»</b> — Подсосенский пер., 26с1\n` +
        `• <b>Universal University</b> — ул. Н. Сыромятническая, 10\n` +
        `• <b>«КреаТех» МГТУ</b> — 2-я Бауманская, 5с4`;
    await showMenu(ctx, text, backToMenuInline);
});

bot.action('btn_schedule', async (ctx) => {
    const text = `📅 <b>Ближайшие защиты:</b>\n\n` +
        `• <b>26 авг 16:00</b> — Механика сцены (Мастерская 12)\n` +
        `• <b>27 авг 18:00</b> — Звукорежиссёр FOH (Театр «Маска»)\n` +
        `• <b>28 авг 13:00</b> — Креативный продюсер («Индустрия»)`;
    await showMenu(ctx, text, backToMenuInline);
});

bot.action('btn_check', async (ctx) => {
    await showMenu(ctx, `🔍 Отправьте боту инвентарный номер (например, <code>AM-DS-0001</code>), чтобы узнать статус оборудования.`, backToMenuInline);
});

bot.on('text', async (ctx) => {
    const text = ctx.message.text.trim();
    if (text.startsWith('/')) return;

    const upperText = text.toUpperCase();
    if (upperText.startsWith('AM-')) {
        try {
            const response = await fetch(`${BOT_WEB_APP_URL}?action=checkEquipment&inv=${encodeURIComponent(upperText)}`);
            const res = await response.json();
            
            if (res.exists) {
                const d = res.data;
                await showMenu(ctx, `🔍 <b>${upperText}</b>\n📦 ${d.name}\n📂 Категория: ${d.category}\n📌 Статус: <b>${d.status}</b>`, backToMenuInline);
            } else {
                await showMenu(ctx, `❌ Оборудование <b>${upperText}</b> не найдено в базе.`, backToMenuInline);
            }
        } catch (e) { 
            await showMenu(ctx, `⚠️ Ошибка связи с сервером Google Apps Script.`, backToMenuInline); 
        }
    }
});

bot.launch();
console.log('🤖 Бот успешно запущен!');