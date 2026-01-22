import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({message : "No token provide"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error){
        res.status(401).json({message : "Invalid token" });
    }
};

// Second layer: Check if their role is allowed
export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message : "Access denied. Insufficient permissions."});
        }
        next();
    };
};