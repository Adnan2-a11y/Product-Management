import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Category name is required'], 
        unique: true, 
        trim: true 
    },
    slug: { type: String, lowercase: true, unique: true }, // For SEO-friendly frontend URLs
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null } 
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
