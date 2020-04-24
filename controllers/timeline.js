const models = require('../models');
const jwt = require('jsonwebtoken');
const moment=require('moment');

const  compare_time=(a, b)=>{
    a=moment(a.createdAt);
    b=moment(b.createdAt);
    // a should come before b in the sorted order
    if(a.isBefore(b)){
            return 1;
    // a should come after b in the sorted order
    }else if(a.isAfter(b)){
            return -1;
    // a and b are the same
    }else{
            return 0;
    }
}

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
        await posts.sort(compare_time);
        res.status(200).json({
            posts,
            success: true
        });



    } catch (error) {
        next(error);
    }
}
module.exports = exports = timeline;