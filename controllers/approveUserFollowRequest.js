const models = require('../models');


async function approveUserFollowRequest(req, res, next) {
    try {
        const payload =req.body.token;
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
                let following = await models.Following.create({
                    userId: request.followRequestUserId,
                    followingUserId: payload.id,
                    followingUserName: payload.userName,
                });

                let followers = await models.Followers.create({
                    userId: payload.id,
                    followersUserId: request.followRequestUserId,
                    followersUserName: request.followRequestUserName,
                });


                res.status(200).json({
                    followers,
                    following,
                    success: true
                });
            }

        }

    } catch (error) {
        next(error);
    }
}
module.exports = exports = approveUserFollowRequest;