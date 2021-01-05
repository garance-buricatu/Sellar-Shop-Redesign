const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    // Get token from the header (x-auth-token)
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // Verify that token is valid
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        // set req.user as user from token payload
        req.user = decoded.user; //remember: the jwt payload is a json object that has user field
        
        next();

    } catch (err) { // will run if token is not valid
        
        res.status(401).json({ msg: 'Token is not valid '});
    }
}