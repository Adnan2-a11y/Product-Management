import jwt from 'jsonwebtoken';
import User from '../models/User.js';

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
