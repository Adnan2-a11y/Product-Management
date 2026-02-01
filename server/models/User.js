import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken: {
        type: String
    },
    // models/User.js এ যোগ করুন
    loginHistory: [{
        latitude: Number,
        longitude: Number,
        loginTime: Number, // decimal hour: 14.5
        timestamp: { type: Date, default: Date.now }
    }],

    twoFactorEnabled: String,
    twoFactorExpires: Date,
    telegramId: String,
    
}, {timestamps: true});

export default mongoose.model('User', userSchema);