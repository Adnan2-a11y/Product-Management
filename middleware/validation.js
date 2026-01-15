import Joi from 'joi';

const hadithSchema = Joi.object({
  text: Joi.string()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.empty': 'Hadith text is required',
      'string.min': 'Hadith text must be at least 10 characters',
      'string.max': 'Hadith text cannot exceed 2000 characters'
    }),
  
  category: Joi.string()
    .valid('prayer', 'udu', 'business', 'charity', 'patience', 'knowledge', 'family')
    .required()
    .messages({
      'any.required': 'Category is required',
      'any.only': 'Please select a valid category'
    }),
  
  source: Joi.object({
    book: Joi.string().max(100),
    narrator: Joi.string().max(100),
    reference: Joi.string().max(50)
  }),
  
  language: Joi.string()
    .valid('arabic', 'english', 'urdu', 'bangla')
    .default('arabic'),
  
  translation: Joi.string().max(2000),
  explanation: Joi.string().max(5000),
  tags: Joi.array().items(Joi.string().max(20))
});

exports.validateHadith = (req, res, next) => {
  req.schema = hadithSchema;
  next();
};

exports.validate = (req, res, next) => {
  const { error } = req.schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    return res.status(400).json({
      success: false,
      errors
    });
  }
  
  next();
};