const jwt = require('jsonwebtoken');

const jwtDecode = async (req, res, next) => {
    req.token = await jwt.decode(req.headers['token'])
    next();
}

module.exports = exports = jwtDecode;