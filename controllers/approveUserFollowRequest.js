const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function approveUserFollowRequest(req, res, next) {
    try {
        const payload = jwt.decode(req.body.loggedUserIdToken)
        console.log("entered approve follow request ")
        // console.log("entered signup2");
        console.log(" ")
        let request = null;
        if (req.body.accepted === true) {
            request = await models.FollowRequests.findOne({
                where: {
                    followRequestUserId: req.body.followRequestUserId,
                    userId: payload.id
                }
            })
            if (request) {
                let deleteRequest = await models.FollowRequests.destroy({
                    where: {
                        followRequestUserId: req.body.followRequestUserId,
                        userId: payload.id
                    }
                })

                console.log("")
                let following = await models.Following.create({
                    userId: request.followRequestUserId,
                    followingUserId: payload.id,
                    followingUserName: payload.userName,
                });

                console.log(" ")
                console.log(" ")

                let followers = await models.Followers.create({
                    userId: payload.id,
                    followersUserId: request.followRequestUserId,
                    followersUserName: request.followRequestUserName,
                });

                console.log(" ")
                console.log(" ")

                res.status(200).json({
                    followers,
                    following,
                    success: true
                });
            }

        }

    } catch (error) {
        res.status(404).json({
            success: false
        });
        next(error);
    }
}
module.exports = exports = approveUserFollowRequest;