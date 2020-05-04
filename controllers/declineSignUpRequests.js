const models = require('../models');


async function declineSignUpRequest(req, res, next) {
    try {
        const userName=req.body.userName
        const users = await models.Users.destroy({
            where: {
                userName: userName
            }
        })
        res.status(200).json({
            users,
            success: true
        })

    } catch (error) {
        next(error);
    }
}
module.exports = exports = declineSignUpRequest;