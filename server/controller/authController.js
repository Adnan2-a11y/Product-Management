import User from '../models/User.js'; // Note the .js extension
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { sendAdminNotification } from '../services/notification.service.js';
import axios from 'axios';


export const signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        const hashPassword = await argon2.hash(password);

        await User.create({
            email,
            password: hashPassword
        });
    
        res.status(201).json({message: "Account Created Successfully ✅"});
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({message: "Error creating account", error: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user || !(await argon2.verify(user.password, password))) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    //Auth Brain
    const loginData = {
        hour: new Date().getHours(),
        ip_numeric: req.ip.replace(/\D/g, '').slice(0, 5), // Basic numeric conversion
        device_score: req.headers['user-agent'].length // Simplified device feature
    };
        try {
        // Calling our Python Microservice via Docker DNS or Localhost
        const aiResponse = await axios.post('http://localhost:8000/v1/auth/predict', loginData);
        
        if (aiResponse.data.prediction === -1) {
            // ML flagged this as suspicious! 
            // Trigger your Telegram Service here
            console.log("ALERT: AI flagged an anomaly! Sending Telegram...");
            const alertMsg = `⚠️ <b>Suspicious Login Detected!</b>\nEmail: ${email}\nTime: ${new Date().toLocaleTimeString()}\nLocation: Unusual`;
            await sendAdminNotification(alertMsg); // Your existing telegram service
            
            // You could stop here and ask for 2FA
            // return res.status(403).json({ message: "Suspicious activity detected. Check Telegram." });
        }
    } catch (err) {
        console.error("AI Service Offline, proceeding with standard auth.");
    }
    //generate token
    const accessToken = jwt.sign({
        id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );

    user.refreshToken = refreshToken;
    await user.save();

    // 3. Set Cookies
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: isProduction, sameSite: 'Lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: isProduction, sameSite: 'Lax', path: '/api/auth/refresh', maxAge: 7 * 24 * 60 * 60 * 1000 });

   //const notification = `<b>User Logged In!</b>\n📧 Email: <code>${email}</code>\n⏰ Time: ${new Date().toLocaleTimeString()}`;
   //await sendAdminNotification(notification);
    res.json({ message: "Logged in successfully ✅", user: { id: user._id, email: user.email } });
};

export const logout = async (req, res) => {
    // ✅ FIXED: Clear both tokens
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: "Successfully logged out ✅" });
};

export const checkOut = async (req, res) => {
    try{

        // ✅ FIXED: Added await and changed name to checkAuth for clarity
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({message: "User not found"});
        
        res.status(200).json({user});   
    }catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict' })
           .json({ message: "Token refreshed" });
    } catch (error) {
        res.status(403).json({ message: "Token expired" });
    }
};