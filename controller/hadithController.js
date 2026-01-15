
import Hadith from '../models/Hadith.js';
import logger from '../utils/logger.js';

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Hadith.distinct('category');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    logger.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
};

// Get hadiths by category
exports.getHadithByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const hadiths = await Hadith.find({ category })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Hadith.countDocuments({ category });
    
    res.status(200).json({
      success: true,
      count: hadiths.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: hadiths
    });
  } catch (error) {
    logger.error('Error fetching hadiths by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hadiths'
    });
  }
};

// Search hadiths
exports.searchHadith = async (req, res) => {
  try {
    const { query, category, language } = req.query;
    
    let searchQuery = {};
    
    if (query) {
      searchQuery.$text = { $search: query };
    }
    
    if (category) {
      searchQuery.category = category;
    }
    
    if (language) {
      searchQuery.language = language;
    }
    
    const hadiths = await Hadith.find(searchQuery)
      .limit(20)
      .sort({ score: { $meta: 'textScore' } });
    
    res.status(200).json({
      success: true,
      count: hadiths.length,
      data: hadiths
    });
  } catch (error) {
    logger.error('Error searching hadiths:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching hadiths'
    });
  }
};

// Get single hadith by ID
exports.getHadithById = async (req, res) => {
  try {
    const hadith = await Hadith.findById(req.params.id);
    
    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'Hadith not found'
      });
    }
    
    // Increment view count
    await hadith.incrementViewCount();
    
    res.status(200).json({
      success: true,
      data: hadith
    });
  } catch (error) {
    logger.error('Error fetching hadith:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hadith'
    });
  }
};

// Add new hadith
exports.addHadith = async (req, res) => {
  try {
    const hadith = await Hadith.create({
      ...req.body,
      addedBy: req.body.addedBy || 'admin'
    });
    
    logger.info(`New hadith added: ${hadith._id}`);
    
    res.status(201).json({
      success: true,
      message: 'Hadith added successfully',
      data: hadith
    });
  } catch (error) {
    logger.error('Error adding hadith:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding hadith',
      error: error.message
    });
  }
};

// Update hadith
exports.updateHadith = async (req, res) => {
  try {
    const hadith = await Hadith.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'Hadith not found'
      });
    }
    
    logger.info(`Hadith updated: ${hadith._id}`);
    
    res.status(200).json({
      success: true,
      message: 'Hadith updated successfully',
      data: hadith
    });
  } catch (error) {
    logger.error('Error updating hadith:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating hadith'
    });
  }
};

// Delete hadith
exports.deleteHadith = async (req, res) => {
  try {
    const hadith = await Hadith.findByIdAndDelete(req.params.id);
    
    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'Hadith not found'
      });
    }
    
    logger.info(`Hadith deleted: ${req.params.id}`);
    
    res.status(200).json({
      success: true,
      message: 'Hadith deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting hadith:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting hadith'
    });
  }
};

// Get random hadith
exports.getRandomHadith = async (req, res) => {
  try {
    const count = await Hadith.countDocuments();
    const random = Math.floor(Math.random() * count);
    
    const hadith = await Hadith.findOne().skip(random);
    
    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'No hadiths found'
      });
    }
    
    await hadith.incrementViewCount();
    
    res.status(200).json({
      success: true,
      data: hadith
    });
  } catch (error) {
    logger.error('Error fetching random hadith:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching random hadith'
    });
  }
};