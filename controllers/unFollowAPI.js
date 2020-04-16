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
        const following = await models.Following.destroy({
            where: {
                id: payload.id,
                followingUserId: users.id
            }
        });
        console.log(" ")
        console.log(" ")
        const followers = await models.Followers.destroy({
            where: {
                id: users.id,
                followersUserId: payload.id
            }
        });
        console.log(" ")
        console.log(" unfollow done ")
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