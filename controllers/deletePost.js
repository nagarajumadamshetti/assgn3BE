const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function deletePost(req, res, next) {
    try {
        
        console.log("delete post    api   is called")
        console.log(" ")
        console.log(" ")
        const payload = jwt.decode(req.body.loggedUserIdToken)
        let likes = await models.Likes.destroy({
            where: {
                postId: req.body.postId,
            },
        });
        console.log(" ")
        console.log(" ")
        let images = await models.Images.destroy({
            where: {
                postId: req.body.postId,
            },
        });
        console.log(" ")
        console.log(" ")
        let posts = await models.Posts.destroy({
            where: {
                id: req.body.postId,
            },
        });
        console.log(" ")
        console.log(" ")
        res.status(200).send(
            {
                posts,
                success: true
            })
    } catch (error) {
        res.status(404).send({
            success: false
        })
        // next(error);
    }
}
module.exports = exports = deletePost;