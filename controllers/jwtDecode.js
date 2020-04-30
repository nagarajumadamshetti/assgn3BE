const jwt = require('jsonwebtoken');

const jwtDecode = (req,res,next) => {
    return jwt.decode(req);
    next();
}
module.exports=exports= jwtDecode;