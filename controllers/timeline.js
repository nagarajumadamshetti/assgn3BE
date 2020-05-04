const models = require('../models');
const { Op } = require('sequelize');



const timeline = async (req, res, next) => {
    try {
        const limit = 3;
        const page = req.params.page
        const payload =req.body.token;
        let users = await models.Following.findAll({
            where: {
                userId: payload.id
            },
            attributes: ['followingUserId']
        });
        users = await users.map(obj => obj.followingUserId)
        
        let timeline = await models.Posts.findAll({
            where: {
                userId: {
                    [Op.in]: users
                }
            },
            order: [
                ['createdAt', 'DESC'],
              
            ],
            include: [
                {
                    model: models.Images,
                    attributes: ['id', 'postId', 'imageUrl', 'lastModified']

                },
                {
                    model: models.Likes,
                    attributes: ['id', 'postId', 'userId', 'likedUserName']
                },
                {
                    model: models.Comments,
                    attributes: ['id', 'postId', 'userId', 'commentedUserName', 'comment']
                },
            ],
            limit: limit,
            offset: (page - 1)*limit,
        }

        )
        let posts =timeline
        res.status(200).json({
            posts,
            success: true
        });



    } catch (error) {
        next(error);
    }
}
module.exports = exports = timeline;