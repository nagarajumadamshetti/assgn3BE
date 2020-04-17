const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function getSignUpRequests(req, res, next) {
    try {
        console.log("entered get signup requests")
        // console.log("entered signup2");
        const users = await models.Users.findAll(
            {
                where: {
                    [Op.and]: [
                        { accepted: false },
                        {
                            role: {
                                [Op.ne]: "admin"
                            }
                        }
                    ]
                },
                attributes: ['userName']
            });
        res.status(200).json({
            success: true,
            users,

        });
    } catch (error) {
        console.log("catch signup")
        res.status(404).json({
            success: false
        });
        // next(error);
    }
}
module.exports = exports = getSignUpRequests;