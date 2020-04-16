const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function likeOrUnlikePost(req, res, next) {
    try {
        console.log("like or unlike api is called")
        console.log(" ")
        console.log(" ")
        const payload = jwt.decode(req.body.loggedUserIdToken)
        let likes = await models.Likes.findOne({
            where: {
                postId: req.body.postId,
                userId: payload.id
            },
        });
        console.log(" ")
        console.log(" ")
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
        res.status(200).send(
            {
                likes,
                success: true
            })
    } catch (error) {
        res.status(404).send({
            success: false
        })
        // next(error);
    }
}
module.exports = exports = likeOrUnlikePost;