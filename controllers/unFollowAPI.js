const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function unFollowAPI(req, res, next) {
    try {
        console.log("unfollow api is called")
        console.log(" ")
        console.log(" ")
        const payload = jwt.decode(req.body.loggedUserIdToken)
        const users = await models.Users.findOne({
            where: {
                userName: req.body.userName,
            },
            attributes: ['id', 'userName']
        });
        console.log(" ")
        console.log(" ")
        let following = await models.Following.destroy({
            where: {
                userId: payload.id,
                followingUserId: users.id
            }
        });
        console.log(" ")
        console.log(" ")
        let followers = await models.Followers.destroy({
            where: {
                userId: users.id,
                followersUserId: payload.id
            }
        });
        console.log(" ")
        console.log(" unfollow done ")
        followers=await models.Followers.findAll({
            where:{
                userId:users.id
            }
        })
        
        console.log(" ")
        console.log(" ")

        following=await models.Following.findAll({
            where:{
                userId:users.id
            }
        })
        res.status(200).send(
            {
                followers,
                following,
                success: true
            })
    } catch (error) {
        res.status(404).send({
            success: false
        })
        // next(error);
    }
}
module.exports = exports = unFollowAPI;