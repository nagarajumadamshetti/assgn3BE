const models = require('../models');

const jwtDecode=require('./jwtDecode');

const addNewComment = async (req, res, next) => {
    try {
        const token=req.body.token
        const payload =await jwtDecode(token)
        await models.Comments.create({
            postId: req.body.postId,
            userId: payload.id,
            commentedUserName: payload.userName,
            comment:req.body.comment
        })
        let comment=await models.Comments.findAll({
            where:{
                postId:req.body.postId
            }
        })
        res.status(200).json({
            comment,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
}
module.exports = exports = addNewComment;