import jwt from 'jsonwebtoken';

export const protect = (req, res) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Not authorized, no token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Not authorized, token failed"});
    }
};