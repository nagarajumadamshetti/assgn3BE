const models = require('../models');

async function getUserFollowRequests(req, res, next) {
    try {
        const users = await models.Users.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id']
        })
        const followRequests = await models.FollowRequests.findAll({
            where: {
                userId: users.id
            }
        });
        res.status(200).json({
            success: true,
            followRequests,
        });
    } catch (error) {
        next(error);
    }
}
module.exports = exports = getUserFollowRequests;