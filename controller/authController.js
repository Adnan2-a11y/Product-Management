import User from '../models/User.js'; // Note the .js extension
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';



export const signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        const hashPassword = await argon2.hash(password);

        await User.create({
            email,
            password: hashPassword
        });
        res.status(201).json({messageL: "Account Created Successfully ✅"});
    } catch (error) {
        res.status(500).json({message: "Error creating account", error});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).lean();

    if (!user || !(await argon2.verify(user.password, password))) {
        return res.status(401).json({message: "Invalid email or password"});
    }
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '15m'}
    );
    res.cookie('token', token, {
        httpOnly: true,
        secure:true,
        sameSite: 'Strict',
    }).json({message: "Successfully logged in ✅"});
};

export const logout = (req, res) => {
    res.clearCookie('token',{
        httpOnly: true,
        secure:true,
        sameSite: 'Strict',
    }).json({message: "Successfully logged out ✅"});
};

export const checkOut = (req, res) => {
    try{

        const user = User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({message: "User not found"});
        
        res.status(200).json({user});   
    }catch(error){
        res.status(500).json({message: "Server error", error});
    }
};