const models = require('../models');
const moment = require('moment');



const getUserPosts = async (req, res, next) => {
    try {
        await models.Users.findAll({
            where: {
                id: req.params.id,
                accepted: true,
            },
            attributes: ['id'],
            include: [
                {
                    model: models.Posts,
                    attributes: ['id', 'description'],
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
                    ]
                }
            ]
        })
            .then(users => {
                if (users.length == 0) {
                    res.status(404).json({
                        success: false
                    });
                    return;
                }
                const data = users.map(user => {
                    //tidy up the user data
                    return Object.assign(
                        {},
                        {
                            user_id: user.id,
                            posts: user.Posts.map(post => {

                                //tidy up the post data
                                return Object.assign(
                                    {},
                                    {
                                        postId: post.id,
                                        description: post.description,
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
                                        images: post.Images.map(image => {

                                            //tidy up the image data
                                            return Object.assign(
                                                {},
                                                {
                                                    image_id: image.id,
                                                    post_id: image.postId,
                                                    imageUrl: image.imageUrl,
                                                    lastModified: image.lastModified,
                                                }
                                            )
                                        }),
                                        likes: post.Likes.map(like => {

                                            //tidy up the image data
                                            return Object.assign(
                                                {},
                                                {
                                                    like_id: like.id,
                                                    post_id: like.postId,
                                                    userId: like.userId,
                                                    likedUserName: like.likedUserName,
                                                }
                                            )
                                        })
                                    }
                                )
                            })
                        }
                    )

                });
                res.status(200).json({
                    data,
                    success: true
                });
            })



    } catch (error) {
        next(error);
    }
}
module.exports = exports = getUserPosts;