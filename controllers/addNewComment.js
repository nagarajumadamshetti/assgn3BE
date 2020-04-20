const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();


const addNewComment = async (req, res, next) => {
    try {
        // console.log(req.params.id)
        const payload = jwt.decode(req.body.token)
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log(" ")

        console.log("entered add new comment")

        console.log(" ")
        console.log(" ")
        console.log(payload.id)
        console.log(" ")
        console.log(" ")
        let comment=await models.Comments.create({
            postId: req.body.postId,
            userId: payload.id,
            commentedUserName: payload.userName,
            comment:req.body.comment
        })
        comment=await models.Comments.findAll({
            where:{
                postId:req.body.postId
            }
        })
        console.log("");
        console.log("");
        console.log("");
        // console.log(timeline);
        console.log("");
        console.log("");
        console.log("");
        res.send({
            comment,
            success: true
        });
        
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            error
        });
        // next(error);
    }
}
module.exports = exports = addNewComment;