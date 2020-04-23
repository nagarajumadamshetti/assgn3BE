const models = require('../models');
const jwt = require('jsonwebtoken');



const timeline = async (req, res, next) => {
    try {
        const payload = jwt.decode(req.params.id)
        let timeline = await models.Following.findAll({
            where: {
                userId: payload.id
            },
            // as: 'user',

            include: [
                {
                    model: models.Users,
                    as: 'followingUser',
                    attributes: ['id','userName'],
                    include: [
                        {
                            model: models.Posts,

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
                                    attributes: ['id', 'postId', 'userId', 'commentedUserName','comment']
                                },
                            ]
                        }
                    ]
                },
            ]
        })
        let posts=[];
        timeline=timeline.map(el=>{
            posts=posts.concat(el.followingUser.Posts)
        })
        res.status(200).json({
            posts,
            success: true
        });



    } catch (error) {
        next(error);
    }
}
module.exports = exports = timeline;