import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import cookieParser from 'cookie-parser';
import logger from './utils/logger.js';
import HadithBot from './controller/botController.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
//import routes
import authRoutes from './routes/authRoutes.js';
import hadithRoutes from './routes/hadithRoutes.js';
dotenv.config();
// Connect to the database
connectDB();

const app = express();
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', authRoutes);

// Routes
app.use('/api/v1/hadiths', hadithRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Hadith Bot API'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack });
  
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});


app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT} 🎯`);
});