import axios from 'axios';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import slugify from 'slugify'; // Recommended: npm install slugify

export const createAiProduct = async (req, res) => {
    try {
        const { rawText, userId, categoryId } = req.body;

        // 1. Call your RTX 3060 AI Service
        const aiResponse = await axios.post('http://localhost:8000/extract-product', {
            text: rawText
        });

        const { name, price, brand, description } = aiResponse.data;

        // 2. Prepare professional fields
        const productData = {
            name,
            description: description || `AI-generated description for ${name}`,
            // Convert to Decimal128 for professional money handling
            price: mongoose.Types.Decimal128.fromString(price.toString()),
            category: categoryId, 
            brand: brand || "Generic",
            createdBy: userId,
            // Generate SEO-friendly slug
            slug: slugify(name, { lower: true, strict: true }),
            stock: 10, // Default AI stock
            images: [{ url: 'default.jpg', public_id: 'default_id' }] // Placeholder
        };

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            message: "Product created by AI Brain",
            product
        });
    } catch (error) {
        console.error("AI Controller Error:", error);
        res.status(500).json({ error: "Failed to process AI request" });
    }
};
