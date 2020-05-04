const jwt = require('jsonwebtoken');

const jwtDecode = async (req, res, next) => {
    req.body.token =await jwt.decode(req.headers['token'])
    next();
}

module.exports = exports = jwtDecode;