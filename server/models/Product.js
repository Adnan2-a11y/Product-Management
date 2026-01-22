import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [200, 'Name cannot exceed 200 characters'],
        index: true // Single field index for basic search
    },
    slug: { 
        type: String, 
        unique: true, 
        lowercase: true 
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: mongoose.Schema.Types.Decimal128, // Professional choice for money
        required: true,
        default: 0.0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to a separate Category model
        required: true,
        index: true
    },
    brand: { type: String, required: true },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    images: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true } // For Cloudinary/S3 management
    }],
    variants: [{
        size: String,
        color: String,
        additionalPrice: Number,
        sku: { type: String, unique: true } // Unique Stock Keeping Unit
    }],
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// 🚀 Composite Index for Professional Filtering (e.g., Category + Price)
productSchema.index({ category: 1, price: 1 });

// 🔍 Text Index for Global Search (Name and Description)
productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);
