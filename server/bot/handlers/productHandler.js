import Product from "../../models/Product.js";
import Category from "../../models/Category.js";

export const handleGetProducts = async (bot, msg) => {
    const chatId = msg.chat.id;
    try {
        const products = await Product.find()
            .sort('-createdAt')
            .limit(10)
            .populate('category', 'name');

        if (!products.length) return bot.sendMessage(chatId, "No products found.");

        let response = "<b>📦 Our Latest Products:</b>\n\n";
        products.forEach(p => {
            // Using HTML tags <b> and <i> is safer than Markdown symbols
            response += `<b>🔹 ${p.name}</b> - $${p.price}\n`;
            response += `Category: ${p.category?.name || 'N/A'}\n`;
            response += `View: /view_${p.slug}\n\n`;
        });

        // Change parse_mode to 'HTML'
        bot.sendMessage(chatId, response, { parse_mode: 'HTML' });
    } catch (err) {
        bot.sendMessage(chatId, "Error fetching products.");
    }
};

export const handleSearchProducts = async (bot, msg, match) => {
    const chatId = msg.chat.id;
    const searchTerm = match[1];

    try {
        const products = await Product.find({ 
            $text: { $search: searchTerm } 
        }).limit(5);

        if (!products.length) return bot.sendMessage(chatId, `No results for "${searchTerm}"`);

        bot.sendMessage(chatId, `🔎 <b>Results for "${searchTerm}":</b>`, { parse_mode: 'HTML' });

        products.forEach(p => {
            // Using <b> for bold and <a> for links in HTML mode
            const message = `<b>${p.name}</b>\n` +
                            `Price: <code>$${p.price}</code>\n` +
                            `<a href="http://shop.com{p.slug}">🔗 View Product Detail</a>`;

            bot.sendMessage(chatId, message, { 
                parse_mode: 'HTML',
                disable_web_page_preview: false // Shows a link preview if you want
            });
        });
    } catch (err) {
        console.error("Search Error:", err);
        bot.sendMessage(chatId, "⚠️ Search failed. Please try again later.");
    }
};