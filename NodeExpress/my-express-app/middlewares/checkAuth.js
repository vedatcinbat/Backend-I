module.exports = checkAuth = (req, res, next) => {
    if(req.headers.authorization === 'Bearer valid-token') {
        console.log(`Authorized: ${req.headers.authorization}`);
        next();
    }else {
        res.status(401).json({
            message: 'Unauthorized',
            status: 401
        })
    }
}