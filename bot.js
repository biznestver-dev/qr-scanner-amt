const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const BOT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx6XQyX1upzSIrbq7zw37ZDi3F2giOy9ZbBY8VkjBkN8LiDkAXp0tXh85aKw9lDn8u2/exec";
const TELEGRAM_WEB_APP_URL = process.env.WEB_APP_URL || '';
const DIRECTORY_CACHE_TTL_MS = 10 * 60 * 1000;
const directoryCache = new Map();

const FALLBACK_CONTACTS = [
    { name: 'Олег Зломанов', task: 'АТД', phone: '+79206931013' },
    { name: 'Богдан Смутный', task: 'Логистика', phone: '+79601805290' },
    { name: 'Маргарита Лютикова', task: 'Компетенции', phone: '+79601291238' }
];
const FALLBACK_VENUES = [
    { name: 'Театр «Маска»', address: 'Комсомольский пр., 28' },
    { name: 'Школа «Индустрия»', address: 'Подсосенский пер., 26с1' },
    { name: 'Universal University', address: 'ул. Н. Сыромятническая, 10' },
    { name: '«КреаТех» МГТУ им. Н.Э. Баумана', address: '2-я Бауманская, 5с4' }
];
const FALLBACK_SCHEDULE = [
    { time: '26 авг 16:00', comp: 'Механика сцены', location: 'Мастерская 12' },
    { time: '27 авг 18:00', comp: 'Звукорежиссёр FOH', location: 'Театр «Маска»' },
    { time: '28 авг 13:00', comp: 'Креативный продюсер', location: '«Индустрия»' }
];

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

const scannerWebAppInline = TELEGRAM_WEB_APP_URL
    ? Markup.inlineKeyboard([
        [Markup.button.webApp('📷 Сканировать QR', TELEGRAM_WEB_APP_URL)],
        [Markup.button.callback('🏠 Главное меню', 'main_menu')]
    ])
    : backToMenuInline;

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

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
}

async function getDirectory(action, fallback) {
    const cached = directoryCache.get(action);
    if (cached && cached.expiresAt > Date.now()) return cached.data;
    try {
        const response = await fetch(`${BOT_WEB_APP_URL}?action=${action}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid directory response');
        directoryCache.set(action, { data, expiresAt: Date.now() + DIRECTORY_CACHE_TTL_MS });
        return data;
    } catch (error) {
        console.error(`Ошибка загрузки ${action}:`, error.message);
        return fallback;
    }
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
    const contacts = await getDirectory('getContacts', FALLBACK_CONTACTS);
    const text = `📋 <b>Контакты координаторов:</b>\n\n` + contacts.map(contact =>
        `• <b>${escapeHtml(contact.name)}</b> (${escapeHtml(contact.task || contact.dept || 'Контакты')}): ${escapeHtml(contact.phone || '—')}`
    ).join('\n');
    await showMenu(ctx, text, backToMenuInline);
});

bot.action('btn_venues', async (ctx) => {
    const venues = await getDirectory('getVenues', FALLBACK_VENUES);
    const text = `📍 <b>Основные площадки:</b>\n\n` + venues.map(venue =>
        `• <b>${escapeHtml(venue.name)}</b> — ${escapeHtml(venue.address || 'Адрес не указан')}`
    ).join('\n');
    await showMenu(ctx, text, backToMenuInline);
});

bot.action('btn_schedule', async (ctx) => {
    const schedule = await getDirectory('getSchedule', FALLBACK_SCHEDULE);
    const text = `📅 <b>Ближайшие защиты:</b>\n\n` + schedule.map(item =>
        `• <b>${escapeHtml(item.time)}</b> — ${escapeHtml(item.comp)} (${escapeHtml(item.location || 'Локация не указана')})`
    ).join('\n');
    await showMenu(ctx, text, backToMenuInline);
});

bot.action('btn_check', async (ctx) => {
    const text = TELEGRAM_WEB_APP_URL
        ? '🔍 Нажмите кнопку и отсканируйте QR-код оборудования.'
        : '🔍 Отправьте боту инвентарный номер (например, <code>AM-DS-0001</code>), чтобы узнать статус оборудования.';
    await showMenu(ctx, text, scannerWebAppInline);
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
                await showMenu(ctx, `🔍 <b>${escapeHtml(upperText)}</b>\n📦 ${escapeHtml(d.name)}\n📂 Категория: ${escapeHtml(d.category)}\n📌 Статус: <b>${escapeHtml(d.status)}</b>`, backToMenuInline);
            } else {
                await showMenu(ctx, `❌ Оборудование <b>${escapeHtml(upperText)}</b> не найдено в базе.`, backToMenuInline);
            }
        } catch (e) {
            await showMenu(ctx, `⚠️ Ошибка связи с сервером Google Apps Script.`, backToMenuInline);
        }
    }
});

bot.on('web_app_data', async (ctx) => {
    const inv = String(ctx.webAppData.data || '').trim().toUpperCase();
    if (!/^AM-[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(inv)) {
        await showMenu(ctx, '⚠️ Некорректный инвентарный номер.', backToMenuInline);
        return;
    }
    try {
        const response = await fetch(`${BOT_WEB_APP_URL}?action=checkEquipment&inv=${encodeURIComponent(inv)}`);
        const result = await response.json();
        if (!result.exists) {
            await showMenu(ctx, `❌ Оборудование <b>${escapeHtml(inv)}</b> не найдено в базе.`, backToMenuInline);
            return;
        }
        const item = result.data;
        await showMenu(ctx, `🔍 <b>${escapeHtml(inv)}</b>\n📦 ${escapeHtml(item.name)}\n📂 Категория: ${escapeHtml(item.category)}\n📌 Статус: <b>${escapeHtml(item.status)}</b>`, backToMenuInline);
    } catch (error) {
        await showMenu(ctx, '⚠️ Ошибка связи с сервером Google Apps Script.', backToMenuInline);
    }
});

bot.launch();
console.log('🤖 Бот успешно запущен!');