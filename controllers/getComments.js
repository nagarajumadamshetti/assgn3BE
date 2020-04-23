const models = require('../models');
const moment = require('moment');



const getPostComments = async (req, res, next) => {
    try {
        await models.Posts.findAll({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: models.Comments,
                    // attributes: ['id', 'postId', 'userId', 'commentedUserName', 'comment']
                },
            ]
        })
            .then(posts => {
                if (posts.length == 0) {
                    res.status(404).send({
                        success: false
                    });
                    return;
                }

                const data = posts.map(post => {
                    //tidy up the post data
                    return Object.assign(
                        {},
                        {
                            comments: post.Comments.map(comment => {

                                //tidy up the image data
                                return Object.assign(
                                    {},
                                    {
                                        author: comment.commentedUserName,
                                        content: comment.comment,
                                        datetime: moment(comment.createdAt).fromNow(),
                                    }
                                )
                            }),



                        })
                }
                )

                res.status(200).json({
                    data,
                    success: true
                });
            })



    } catch (error) {
        next(error);
    }
}
module.exports = exports = getPostComments;