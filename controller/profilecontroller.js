import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
    try{
       const user = await User.findById(req.user.id).select("-password");
       
       if (user){
        res.json(user);
       } else{
        res.status(404).json({message: "User not found"});
       }
    }catch (error){
        res.status(500).json({message: 'Server error fetching profile'});
    }
};