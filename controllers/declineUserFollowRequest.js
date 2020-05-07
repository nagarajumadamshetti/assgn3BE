const models = require('../models');


async function approveUserFollowRequest(req, res, next) {
    try {
        const payload =req.token;
        let request = null;
        if (req.body.accepted === true) {
            request = await models.FollowRequests.findOne({
                where: {
                    followRequestUserId: req.body.followRequestUserId,
                    userId: payload.id
                }
            })
            if (request) {
                let deleteRequest = await models.FollowRequests.destroy({
                    where: {
                        followRequestUserId: req.body.followRequestUserId,
                        userId: payload.id
                    }
                })
                res.status(200).json({

                    success: true
                });
            }

        }

    } catch (error) {
        next(error);
    }
}
module.exports = exports = approveUserFollowRequest;