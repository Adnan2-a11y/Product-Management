import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';


export const login = async (req, res) => {
  console.log('Login request body:', req.body); // Debugging line
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // NEW: Set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,     // Prevents client-side JS from reading the cookie
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in prod
      sameSite: 'strict', // Protects against CSRF attacks
      maxAge: 3600000     // 1 hour in milliseconds
    });

    res.json({ message: 'Login successful' }); // No need to send token in body anymore
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const register = async (req, res) => {
  console.log('Registration request body:', req.body); // Debugging line
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