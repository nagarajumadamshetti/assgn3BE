const models = require('../models');


const addNewComment = async (req, res, next) => {
    try {
        const payload =req.token;
        await models.Comments.create({
            postId: req.body.postId,
            userId: payload.id,
            commentedUserName: payload.userName,
            comment:req.body.comment
        });
        let comment=await models.Comments.findAll({
            where:{
                postId:req.body.postId
            }
        });
        res.status(200).json({
            comment,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
}
module.exports = exports = addNewComment;