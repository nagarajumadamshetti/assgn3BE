const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();

async function approveSignUpRequest(req, res, next) {
    try {
        console.log("entered decline signup1")
        // console.log("entered signup2");
        console.log(req.body.userName)
        const userName=req.body.userName
        // console.log(req.data.userName)
        // console.log(req.body.data.userName);
        const users = await models.Users.destroy({
            where: {
                userName: userName
            }
        })
        res.status(200).json({
            users,
            success: true
        })

    } catch (error) {
        res.status(404).json({
            success: false
        });
        next(error);
    }
}
module.exports = exports = approveSignUpRequest;