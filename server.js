import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

dotenv.config();
// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT} 🎯`);
});