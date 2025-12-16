const jwt = require('jsonwebtoken');

const requireAuth = async (req, resizeBy, next) => {
    const authHeader = req.header('Authorization');

    if(!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({
            error: 'Access denied, no token!'
    });
 
    const token = authHeader.replace('Bearer ', '');

    try {
        const payload =jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({error: 'Inalid or expired token'});    
    }
};

module.exports = requireAuth;