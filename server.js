import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import cookieParser from 'cookie-parser';
import logger from './utils/logger.js';
import helmet from 'helmet';
import cors from 'cors';

//import routes
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.PORT || 3000;
dotenv.config();
connectDB();
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust based on your frontend URL
    credentials: true,
}));
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT} 🎯`);
  logger.info(`Server started on port ${PORT}`);
});

