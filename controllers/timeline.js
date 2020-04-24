const models = require('../models');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize');

const compare_time = (a, b) => {
    a = moment(a.createdAt);
    b = moment(b.createdAt);
    // a should come before b in the sorted order
    if (a.isBefore(b)) {
        return 1;
        // a should come after b in the sorted order
    } else if (a.isAfter(b)) {
        return -1;
        // a and b are the same
    } else {
        return 0;
    }
}

const timeline = async (req, res, next) => {
    try {
        const limit = 3;
        const page = req.params.page
        const payload = jwt.decode(req.params.id)
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