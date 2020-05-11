const models = require('../models');


async function declineSignUpRequest(req, res, next) {
    try {
        const users = await models.Users.destroy({
            where: {
                id:req.body.id
            }
        });
        res.status(200).json({
            users,
            success: true
        });

    } catch (error) {
        next(error);
    }
}
module.exports = exports = declineSignUpRequest;