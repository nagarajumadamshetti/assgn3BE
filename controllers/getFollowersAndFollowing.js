const models = require('../models');

async function getFollowersAndFollowing(req, res, next) {
    try {

        let users = await models.Users.findAll({
            where: {
                userName: req.params.id,
                accepted: true,
            },
            attributes: ['id', 'userName'],
            include: [
                {
                    model: models.Followers,
                }
            ]
        })
        if (users.length === 0) {
            res.status(404).json({
                success: false
            })
            return;
        }
        let followers = users.map(user => {
            //tidy up the user data

            return Object.assign(
                {},
                {
                    user_id: user.id,
                    followers: user.Followers.map(follower => {

                        //tidy up the Followers data
                        return Object.assign(
                            {},
                            {
                                userId: follower.userId,
                                followersUserId: follower.followersUserId,
                                followersUserName: follower.followersUserName,
                            }
                        )
                    })
                }
            )
        })

        users = await models.Users.findAll({
            where: {
                userName: req.params.id
            },
            attributes: ['id', 'userName'],
            include: [
                {
                    model: models.Following,
                }
            ]
        })
        let following = users.map(user => {
            //tidy up the user data
            return Object.assign(
                {},
                {
                    user_id: user.id,
                    following: user.Followings.map(following => {

                        //tidy up the Folloeing data
                        return Object.assign(
                            {},
                            {
                                userId: following.userId,
                                followingUserId: following.followingUserId,
                                followingUserName: following.followingUserName,
                            }
                        )
                    })
                }
            )
        })
        res.status(200).json(
            {
                followers,
                following,
                success: true
            })
    } catch (error) {
        next(error);
    }
}
module.exports = exports = getFollowersAndFollowing;