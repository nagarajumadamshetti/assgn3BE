const models = require('../models');
const jwtDecode=require('./jwtDecode');

const moment = require('moment');

async function addNewPost(req, res, next) {
    try {

        const payload =await jwtDecode(req.body.token)
        const newPost = await models.Posts.create(
            {
                description: req.body.description,
                userId: payload.id,
                userName:payload.userName
            });
        req.body.imageList.map(async (el, key) => {
            // let url=await jwt.sign({ imageUrl: el.thumbUrl }, 'keyboard cat 4 ever')
            const newImage = await models.Images.create(
                {
                    imageName:el.name,
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