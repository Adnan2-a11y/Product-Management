import { body, validationResult } from 'express-validator';

export const signupValidator = [
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(), // Sanitizes: converts to lowercase, removes dots in Gmail
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const loginValidator = [
    body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
