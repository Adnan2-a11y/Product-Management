
import mongoose from 'mongoose';

const hadithSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Hadith text is required'],
    trim: true,
    minlength: [10, 'Hadith text must be at least 10 characters'],
    maxlength: [2000, 'Hadith text cannot exceed 2000 characters']
  },
  
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['prayer', 'udu', 'business', 'charity', 'patience', 'knowledge', 'family'],
    lowercase: true
  },
  
  source: {
    book: {
      type: String,
      maxlength: 100
    },
    narrator: {
      type: String,
      maxlength: 100
    },
    reference: {
      type: String,
      maxlength: 50
    }
  },
  
  language: {
    type: String,
    enum: ['arabic', 'english', 'urdu', 'bangla'],
    default: 'arabic'
  },
  
  translation: {
    type: String,
    maxlength: 2000
  },
  
  explanation: {
    type: String,
    maxlength: 5000
  },
  
  tags: [{
    type: String,
    maxlength: 20
  }],
  
  viewCount: {
    type: Number,
    default: 0
  },
  
  addedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
hadithSchema.index({ category: 1 });
hadithSchema.index({ tags: 1 });
hadithSchema.index({ text: 'text' });

// Method to increment view count
hadithSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

module.exports = mongoose.model('Hadith', hadithSchema);