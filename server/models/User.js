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
    twoFactorEnabled: String,
    twoFactorExpires: Date,
    telegramId: String,
    
}, {timestamps: true});

export default mongoose.model('User', userSchema);