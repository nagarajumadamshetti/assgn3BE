const models = require('../models');
const passwordHash = require('password-hash');
async function signUp(req, res, next) {
    try {
        const hashedValue = passwordHash.generate(req.body.password);
        req.body.password = hashedValue;
        const users = await models.Users.create(req.body);
        res.status(200).json({
            users,
            success: true
        });        
    } catch (error) {
        next(error);
    }
}
module.exports = exports = signUp;