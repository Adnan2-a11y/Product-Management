import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const register = async (req, res) => {
  try {
    // 1. Get data from request
    const { username, email, password } = req.body;
    
    // 2. Check if user already exists (simplified)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email'
      });
    }
    
    // 3. Create new user (password gets hashed automatically by our pre-save hook)
    const user = await User.create({
      username,
      email,
      password  // This will be hashed automatically!
    });
    
    // 4. Return success response (without password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Error registering user'
    });
  }
};