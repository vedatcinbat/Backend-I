const jwt = require('jsonwebtoken');
const secretKey = 'secretsadfasdfasdfasdf'

module.exports = authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({
        message: 'Unauthorized',
        status: 401
    });

    jwt.verify(token.split('')[1], secretKey, (err, user) => {
        if(err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    })
}