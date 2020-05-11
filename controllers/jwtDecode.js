const jwt = require('jsonwebtoken');

const jwtDecode = async (req, res, next) => {
    try {
        console.log(req.body)
        req.token = jwt.verify(req.headers['token'], 'keyboard cat 4 ever');
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = exports = jwtDecode;