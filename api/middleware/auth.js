const config = require("../config.json");
const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    if(!token) return res.status('401').json({ msg: 'No Token, authorization denied'});
    
    try {
        const decoded = jwt.verify(token, config.secret);
       req.user = decoded;
       next();
    } catch(e) {
        res.status(400).json({ msg: 'Token invalid'});
    }
}

module.exports = auth;