require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = { authenticateJWT }