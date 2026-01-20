import telegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

// Using 'polling: false' is correct for a notification-only service
const bot = new telegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

/**
 * Enhanced notification service with HTML support
 * HTML is safer than Markdown when dealing with emails containing underscores/dots.
 */
export const sendAdminNotification = async (message) => {
    const chatId = process.env.TELEGRAM_ADMIN_ID;
    
    // 🔍 Debug: Ensure variables are loaded
    if (!process.env.TELEGRAM_BOT_TOKEN || !chatId) {
        return console.error("❌ Telegram credentials missing in .env");
    }

    try {
        await bot.sendMessage(chatId, `<b>🛡️ AUTH SYSTEM ALERT</b>\n\n${message}`, { 
            parse_mode: 'HTML' 
        });
        console.log("📨 Telegram notification sent.");
    } catch (error) {
        // Detailed error logging to catch "Chat not found" or "Token invalid"
        if (error.response && error.response.body) {
            console.error("❌ Telegram API Error:", error.response.body.description);
        } else {
            console.error("❌ Connection Error:", error.message);
        }
    }
};
