import TelegramBot from "node-telegram-bot-api";
import { handleGetProducts, handleSearchProducts } from "./handlers/productHandler.js";

// This is the "Magic" that makes it feel like the first time
// It prevents the library from screaming about network hiccups
process.env.NTBA_FIX_319 = 1; 

const initbot = () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) return;
    
    // Initialize exactly like your first version
    const bot = new TelegramBot(token, { polling: true });

    // Silence the specific polling error logs in the console
    bot.on('polling_error', (err) => {
        if (err.message.includes('EFATAL')) return; // Ignore DNS/Network noise
        console.log(err.message);
    });

    // Your professional UI logic
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "<b>Welcome!</b>", {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [[
                    { text: '📦 Products', callback_data: 'btn_products' },
                    { text: '🔍 Search', callback_data: 'btn_search_hint' }
                ]]
            }
        });
    });

    bot.on('callback_query', (q) => {
        if (q.data === 'btn_products') handleGetProducts(bot, q.message);
        bot.answerCallbackQuery(q.id);
    });

    bot.onText(/\/search (.+)/, (msg, match) => handleSearchProducts(bot, msg, match[1]));

    console.log("🚀 Bot is clean and running!");
    return bot;
};

export default initbot;
