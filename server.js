import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profile.js';
import cookieParser from 'cookie-parser';

dotenv.config();
// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT} 🎯`);
});