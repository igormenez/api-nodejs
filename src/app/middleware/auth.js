const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: 'Token not provided'});
    }

    const [, token] = authHeader.split(' ');

    jwt.verify(token, process.env.APP_SECRET, function(err, decoded) { 
        if (err) 
            return res.status(401).json({message: 'Token invalid'});; 

        req.userId = decoded.id; 
        
        next();
    });     
} 