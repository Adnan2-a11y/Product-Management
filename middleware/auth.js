import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    // 1. Get the token from the Authorization Header (Bearer <token>)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // 2. Verify the token using your secret from .env
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach the verified user payload to the request object
        req.user = verified;
        
        // 4. IMPORTANT: Call next() to pass control to the controller
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};
export default protect;
