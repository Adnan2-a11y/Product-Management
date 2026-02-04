import mongoose from 'mongoose';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    slug: { 
        type: String, 
        unique: true, 
        lowercase: true,
        index: true // Fast lookup for SEO-friendly URLs
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: mongoose.Schema.Types.Decimal128, 
        required: true,
        default: 0.0,
        // Getter/Setter ensures price is always a number in JS but Decimal128 in DB
        get: (v) => v ? parseFloat(v.toString()) : v,
        set: (v) => mongoose.Types.Decimal128.fromString(v.toString())
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    brand: { type: String, required: true, index: true },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    images: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true } 
    }],
    variants: [{
        size: String,
        color: String,
        additionalPrice: { type: Number, default: 0 },
        sku: { type: String, unique: true, sparse: true } // sparse: true allows nulls if no variant
    }],
    ratings: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    // 🛡️ Soft Delete field - Professional standard
    isDeleted: {
        type: Boolean,
        default: false,
        select: false // Usually hide this from default API responses
    }
}, { 
    timestamps: true,
    toJSON: { getters: true }, // Crucial: Apply Decimal128 getters when sending JSON
    toObject: { getters: true }
});

// 🚀 PRODUCTION INDEXES (ESR Rule: Equality, Sort, Range)
// Optimized for: Filter by Category + Sort by Price + Filter by Stock
productSchema.index({ category: 1, price: 1, isDeleted: 1 });
productSchema.index({ brand: 1, price: 1 });

// 🔍 Search Index for "Search Bar" functionality
productSchema.index({ name: 'text', description: 'text' });

// 🔗 SLUG LOGIC (Improved)
productSchema.pre('save', async function(next) {
    if (!this.isModified('name')) return next();

    let baseSlug = slugify(this.name, { lower: true, strict: true });
    
    // Check if slug exists (using constructor to avoid circular dependency)
    const slugExists = await this.constructor.findOne({ slug: baseSlug });

    if (slugExists) {
        this.slug = `${baseSlug}-${nanoid(6)}`;
    } else {
        this.slug = baseSlug;
    }
    next();
});

// 🛡️ QUERY MIDDLEWARE: Automatically filter out deleted products
productSchema.pre(/^find/, function(next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export default mongoose.model('Product', productSchema);
