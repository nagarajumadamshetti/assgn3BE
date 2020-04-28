const jwt = require('jsonwebtoken');

const jwtDecode = (req,res,next) => {
    return jwt.decode(req.token);
    next();
}
module.exports=exports= jwtDecode;