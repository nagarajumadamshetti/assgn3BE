const models = require('../models');


const moment = require('moment');

async function addNewPost(req, res, next) {
    try {
        const payload = req.token;
        const newPost = await models.Posts.create(
            {
                description: req.body.description,
                userId: payload.id,
                userName: payload.userName
            });
        req.body.imageList.map(async (el, key) => {
            const newImage = await models.Images.create(
                {
                    imageName: el.name,
                    postId: newPost.id,
                    imageUrl: el.thumbUrl,
                    lastModified: moment(el.lastModified)
                });
        })
        res.status(200).json({
            success: true,
        });

    } catch (error) {
        res.status(404).json({
            success: false
        });
        next(error);
    }
}
module.exports = exports = addNewPost;