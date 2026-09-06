const { Telegraf } = require('telegraf');
require('dotenv').config();

const BOT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx6XQyX1upzSIrbq7zw37ZDi3F2giOy9ZbBY8VkjBkN8LiDkAXp0tXh85aKw9lDn8u2/exec";
const BOT_SHARED_SECRET = process.env.BOT_SHARED_SECRET || '';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    let registrationSucceeded = false;
    try {
        const response = await fetch(BOT_WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify({ 
                type: 'saveUser', 
                botSecret: BOT_SHARED_SECRET,
                chatId: ctx.chat.id, 
                username: ctx.from.username || '', 
                firstName: ctx.from.first_name || '' 
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        registrationSucceeded = response.ok && result.success === true;
    } catch (e) { 
        console.error("Ошибка синхронизации пользователя:", e); 
    }
    if (registrationSucceeded) {
        await ctx.reply(`Привет, ${ctx.from.first_name || ''}! Вы подписаны на напоминания о возврате оборудования. В этот чат будут приходить уведомления о просроченных возвратах.`);
    } else {
        await ctx.reply('Не удалось зарегистрировать этот чат для напоминаний. Обратитесь к администратору.');
    }
});

bot.launch();
console.log('🤖 Бот успешно запущен!');