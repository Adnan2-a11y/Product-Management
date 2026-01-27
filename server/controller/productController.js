import Product  from "../models/Product.js";
import slugify from "slugify";

export const createProduct = async (req , res) => {
    try {
        const { name, price, description, category, brand, stock,images, variants } = req.body;
        const slug = slugify(name, { lower: true, strick: true});

        const existingProduct = await Product.findOne({slug});
        if(existingProduct){
            return res.status(400).json({ message: 'Product with this name already exists.' });
        }
        const product = await Product.create({
            ...req.body,
            slug,
            createdBy: req.user.id 
        });
        res.status(201).json(product);
    }catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
// 2. UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // If name is changed, we must regenerate the slug
        if (updates.name) {
            updates.slug = slugify(updates.name, { lower: true, strict: true });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true } // runValidators ensures schema rules are followed
        );

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        // 1. ADVANCED FILTERING
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2. RANGE FILTERING (Price, Ratings)
        // Converts { price: { gte: '50' } } -> { price: { $gte: '50' } }
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        let query = Product.find(JSON.parse(queryStr));

        // 3. SEARCH (Using the Text Index we created in the Schema)
        if (req.query.search) {
            query = query.find({ $text: { $search: req.query.search } });
        }

        // 4. SORTING
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt'); // Default to newest
        }

        // 5. PAGINATION
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        // Execute Query
        const products = await query.populate('category', 'name'); // Only get category name
        const total = await Product.countDocuments();

        res.status(200).json({
            success: true,
            count: products.length,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};
export const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).populate('category');
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

