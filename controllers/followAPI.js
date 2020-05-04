const models = require('../models');

async function followAPI(req, res, next) {
    try {
        const payload =req.body.token;
        let users = await models.Users.findOne({
            where: {
                userName: req.body.userName,
            },
            attributes: ['id', 'userName']
        });
        let u = await models.Followers.findOne({
            where: {
                userId: users.id,
                followersUserName: payload.userName
            }
        })

        let followRequests=await models.FollowRequests.findOne({
            where:{
                userId:users.id,
                followRequestUserId:payload.id
            }
        })
        if (u) {
            res.send({
                success: false,
                message: "follow already exists"
            })
            return;
        }
        if(followRequests){
            res.send({
                success: false,
                message: "follow request already exists"
            })
            return;
        }

         followRequests = await models.FollowRequests.create({
            userId: users.id,
            followRequestUserId: payload.id,
            followRequestUserName: payload.userName,
        });


        let followers = await models.Followers.findAll({
            where: {
                userId: users.id
            }
        })


        let following = await models.Following.findAll({
            where: {
                userId: users.id
            }
        })
        res.status(200).send(
            {
                followers,
                following,
                success: true
            })
    } catch (error) {
        next(error);
    }
}
module.exports = exports = followAPI;