import TelegramBot from 'node-telegram-bot-api';
import Hadith from '../models/Hadith.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

class HadithBot {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
    this.adminId = process.env.ADMIN_CHAT_ID;
    this.setupCommands();
  }

  setupCommands() {
    // Start command
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const user = await this.getOrCreateUser(msg.from);
      
      await this.bot.sendMessage(chatId, 
        `Assalamu Alaikum ${msg.from.first_name}! 🌙\n\n` +
        `Welcome to Hadith Bot. Here you can:\n` +
        `📖 Receive daily hadith\n` +
        `🔍 Search hadith by category\n` +
        `➕ Add new hadith (admin only)\n\n` +
        `Use /categories to see available categories\n` +
        `Use /help for all commands`,
        {
          reply_markup: {
            keyboard: [
              ['📚 Categories', '🎲 Random Hadith'],
              ['➕ Add Hadith', '⚙️ Settings']
            ],
            resize_keyboard: true,
            one_time_keyboard: false
          }
        }
      );
    });

    // Categories command
    this.bot.onText(/\/categories/, async (msg) => {
      const categories = await Hadith.distinct('category', { isVerified: true });
      
      const keyboard = categories.map(cat => [cat]);
      keyboard.push(['↩️ Back']);
      
      await this.bot.sendMessage(msg.chat.id, 
        'Select a category:',
        {
          reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
          }
        }
      );
    });

    // Add hadith command (admin only)
    this.bot.onText(/\/addhadith/, async (msg) => {
      if (msg.chat.id.toString() !== this.adminId) {
        return this.bot.sendMessage(msg.chat.id, '❌ This command is for admin only.');
      }
      
      this.bot.sendMessage(msg.chat.id, 
        'Please send the hadith in this format:\n\n' +
        'Category: prayer\n' +
        'Hadith: [Hadith text here]\n' +
        'Source: [Book name]\n' +
        'Narrator: [Narrator name]',
        {
          reply_markup: {
            force_reply: true
          }
        }
      );
    });

    // Handle category selection
    this.bot.on('message', async (msg) => {
      if (msg.text && !msg.text.startsWith('/')) {
        const categories = ['prayer', 'udu', 'business', 'charity', 'patience', 'knowledge', 'family'];
        
        if (categories.includes(msg.text.toLowerCase())) {
          await this.sendRandomHadith(msg.chat.id, msg.text.toLowerCase());
        }
        
        // Handle add hadith response
        if (msg.reply_to_message && msg.reply_to_message.text.includes('Category:')) {
          await this.processAddHadith(msg);
        }
      }
    });

    // Random hadith command
    this.bot.onText(/\/random/, async (msg) => {
      const hadith = await Hadith.aggregate([
        { $match: { isVerified: true } },
        { $sample: { size: 1 } }
      ]);
      
      if (hadith.length > 0) {
        await this.sendHadithMessage(msg.chat.id, hadith[0]);
      } else {
        this.bot.sendMessage(msg.chat.id, 'No hadith found in database.');
      }
    });

    // Help command
    this.bot.onText(/\/help/, (msg) => {
      this.bot.sendMessage(msg.chat.id,
        '📚 *Available Commands:*\n\n' +
        '/start - Start the bot\n' +
        '/categories - Show all categories\n' +
        '/random - Get random hadith\n' +
        '/addhadith - Add new hadith (admin)\n' +
        '/search [text] - Search hadith\n' +
        '/stats - Bot statistics\n' +
        '/help - Show this help\n\n' +
        'You can also tap the buttons below 👇',
        { parse_mode: 'Markdown' }
      );
    });
  }

  async getOrCreateUser(telegramUser) {
    try {
      let user = await User.findOne({ telegramId: telegramUser.id.toString() });
      
      if (!user) {
        user = await User.create({
          telegramId: telegramUser.id.toString(),
          username: telegramUser.username,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          isAdmin: telegramUser.id.toString() === this.adminId
        });
        logger.info(`New user created: ${telegramUser.username}`);
      }
      
      // Update last active
      await User.findByIdAndUpdate(user._id, {
        'stats.lastActive': new Date()
      });
      
      return user;
    } catch (error) {
      logger.error('Error in getOrCreateUser:', error);
      return null;
    }
  }

  async sendRandomHadith(chatId, category) {
    try {
      const count = await Hadith.countDocuments({ category, isVerified: true });
      
      if (count === 0) {
        return this.bot.sendMessage(chatId, `No hadith found in category: ${category}`);
      }
      
      const randomIndex = Math.floor(Math.random() * count);
      const hadith = await Hadith.findOne({ category, isVerified: true })
        .skip(randomIndex)
        .limit(1);
      
      if (hadith) {
        await this.sendHadithMessage(chatId, hadith);
        // Increment views
        await Hadith.findByIdAndUpdate(hadith._id, {
          $inc: { 'meta.views': 1 }
        });
      }
    } catch (error) {
      logger.error('Error sending random hadith:', error);
      this.bot.sendMessage(chatId, 'Error fetching hadith. Please try again.');
    }
  }

  async sendHadithMessage(chatId, hadith) {
    const message = 
      `📖 *Hadith*\n\n` +
      `${hadith.text}\n\n` +
      `📚 *Category:* ${hadith.category}\n` +
      `📕 *Source:* ${hadith.source.book || 'Not specified'}\n` +
      `👤 *Narrator:* ${hadith.source.narrator || 'Not specified'}\n\n` +
      (hadith.translation ? `🔤 *Translation:*\n${hadith.translation}\n\n` : '') +
      `🆔 ID: ${hadith._id}`;
    
    await this.bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '👍 Like', callback_data: `like_${hadith._id}` },
            { text: '📤 Share', callback_data: `share_${hadith._id}` }
          ],
          [
            { text: '🔁 Another', callback_data: `another_${hadith.category}` },
            { text: '📚 All Categories', callback_data: 'categories' }
          ]
        ]
      }
    });
  }

  async processAddHadith(msg) {
    try {
      const text = msg.text;
      const lines = text.split('\n');
      
      const data = {};
      lines.forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value.length > 0) {
          data[key.trim().toLowerCase()] = value.join(':').trim();
        }
      });
      
      if (!data.category || !data.hadith) {
        return this.bot.sendMessage(msg.chat.id, 
          '❌ Invalid format. Please include Category and Hadith at minimum.');
      }
      
      const hadith = await Hadith.create({
        text: data.hadith,
        category: data.category.toLowerCase(),
        source: {
          book: data.source,
          narrator: data.narrator,
          reference: data.reference
        },
        translation: data.translation,
        explanation: data.explanation,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
      });
      
      logger.info(`New hadith added via bot: ${hadith._id}`);
      
      this.bot.sendMessage(msg.chat.id, 
        `✅ Hadith added successfully!\n\n` +
        `Category: ${hadith.category}\n` +
        `ID: ${hadith._id}\n\n` +
        `Preview:\n${hadith.text.substring(0, 100)}...`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: 'View Full', callback_data: `view_${hadith._id}` }
            ]]
          }
        }
      );
      
    } catch (error) {
      logger.error('Error processing add hadith:', error);
      this.bot.sendMessage(msg.chat.id, `❌ Error: ${error.message}`);
    }
  }

  // Send message to admin
  async sendToAdmin(message) {
    try {
      await this.bot.sendMessage(this.adminId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      logger.error('Error sending message to admin:', error);
    }
  }

  // Start polling
  start() {
    logger.info('Telegram bot started successfully');
    this.sendToAdmin('🤖 *Hadith Bot is now online!*\n\nBot started successfully at ' + new Date().toLocaleString());
  }
}

module.exports = HadithBot;