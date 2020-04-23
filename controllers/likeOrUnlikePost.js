const models = require('../models');
const jwt = require('jsonwebtoken');

async function likeOrUnlikePost(req, res, next) {
    try {
        const payload = jwt.decode(req.body.loggedUserIdToken)
        let likes = await models.Likes.findOne({
            where: {
                postId: req.body.postId,
                userId: payload.id
            },
            
        });

        if (likes) {
            likes = await models.Likes.destroy({
                where: {
                    postId: req.body.postId,
                    userId: payload.id
                }
            }),
                likes = await models.Likes.findAll({
                    where: {
                        postId: req.body.postId,
                    },
                });
        }
        else {
            likes = await models.Likes.create({
                postId: req.body.postId,
                userId: payload.id,
                likedUserName: payload.userName
            })
            likes = await models.Likes.findAll({
                where: {
                    postId: req.body.postId,
                },
            });
        }
        res.status(200).json(
            {
                likes,
                success: true
            })
    } catch (error) {
        next(error);
    }
}
module.exports = exports = likeOrUnlikePost;