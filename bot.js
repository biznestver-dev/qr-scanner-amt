const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

// Актуальный URL вашего веб-приложения Google Apps Script
const BOT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxFUgNM3R6u6m9JURaF9Aizis1NXlkWNc1xSD_-kJkSZIY2H8PU5kxWCW2cA/exec";

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
        try { return await ctx.editMessageText(text, { parse_mode: 'HTML', ...keyboard }); } 
        catch (e) { await ctx.answerCbQuery().catch(() => {}); return; }
    }
    try { if (ctx.message) await ctx.deleteMessage(ctx.message.message_id); } catch (e) {}
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
    } catch (e) { console.error("Ошибка синхронизации пользователя:", e); }

    await showMenu(ctx, `🛠 <b>Техотдел AM</b>\n\nПривет, ${ctx.from.first_name}! Бот подключен к Google Таблицам.`, mainInlineMenu);
});

bot.action('main_menu', async (ctx) => await showMenu(ctx, '🛠 <b>Главное меню:</b>', mainInlineMenu));

bot.on('text', async (ctx) => {
    const text = ctx.message.text.trim();
    if (text.startsWith('/')) return;

    const upperText = text.toUpperCase();
    if (upperText.startsWith('AM-')) {
        try {
            const response = await fetch(`${BOT_WEB_APP_URL}?action=checkEquipment&inv=${upperText}`);
            const res = await response.json();
            
            if (res.exists) {
                const d = res.data;
                await showMenu(ctx, `🔍 <b>${upperText}</b>\n📦 ${d.name}\n📌 Статус: <b>${d.status}</b>`, backToMenuInline);
            } else {
                await showMenu(ctx, `❌ Оборудование <b>${upperText}</b> не найдено.`, backToMenuInline);
            }
        } catch (e) { await showMenu(ctx, `⚠️ Ошибка связи с сервером.`, backToMenuInline); }
    }
});

bot.launch();
console.log('🤖 Бот успешно запущен!');