const models = require('../models');

async function approveSignUpRequest(req, res, next) {
    try {
        if (req.body.accepted === true) {
            const users = await models.Users.update(
                { accepted: req.body.accepted },
                {
                    where: {
                        userName: req.body.userName
                    }
                });
            res.status(200).json({
                users,
                success: true
            });
        }
        
    } catch (error) {
        next(error);
    }
}
module.exports = exports = approveSignUpRequest;