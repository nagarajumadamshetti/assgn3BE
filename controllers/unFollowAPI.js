const models = require('../models');
const jwtDecode=require('./jwtDecode');


async function unFollowAPI(req, res, next) {
    try {
        const payload =await jwtDecode(req.body.loggedUserIdToken)
        const users = await models.Users.findOne({
            where: {
                userName: req.body.userName,
            },
            attributes: ['id', 'userName']
        });
        
        let following = await models.Following.destroy({
            where: {
                userId: payload.id,
                followingUserId: users.id
            }
        });

        let followers = await models.Followers.destroy({
            where: {
                userId: users.id,
                followersUserId: payload.id
            }
        });

        followers=await models.Followers.findAll({
            where:{
                userId:users.id
            }
        })
        

        following=await models.Following.findAll({
            where:{
                userId:users.id
            }
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
module.exports = exports = unFollowAPI;