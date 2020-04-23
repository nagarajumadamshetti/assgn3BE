const models = require('../models');


async function deletePost(req, res, next) {
    try {
        
        let likes = await models.Likes.destroy({
            where: {
                postId: req.body.postId,
            },
        });
        let images = await models.Images.destroy({
            where: {
                postId: req.body.postId,
            },
        });
        let comments = await models.Comments.destroy({
            where: {
                postId: req.body.postId,
            },
        });
        let posts = await models.Posts.destroy({
            where: {
                id: req.body.postId,
            },
        });
        res.status(200).send(
            {
                posts,
                success: true
            })
    } catch (error) {
        next(error);
    }
}
module.exports = exports = deletePost;