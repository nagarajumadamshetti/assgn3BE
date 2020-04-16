const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function getUserFollowRequests(req, res, next) {
    try {
        console.log("entered get user follow  requests")
        // console.log("entered signup2");

        const users = await models.Users.findOne({
            where: {
                userName: req.params.id
            },
            attributes: ['id']
        })
        const followRequests = await models.FollowRequests.findAll({
            where: {
                userId: users.id
            }
        });
        res.status(200).json({
            success: true,
            followRequests,
        });
    } catch (error) {
        console.log("catch signup")
        res.status(404).json({
            success: false
        });
        // next(error);
    }
}
module.exports = exports = getUserFollowRequests;