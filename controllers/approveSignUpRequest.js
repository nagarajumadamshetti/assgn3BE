const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();

async function approveSignUpRequest(req, res, next) {
    try {
        console.log("entered approve signup1")
        // console.log("entered signup2");
        if (req.body.accepted === true) {
            const users = await models.Users.update(
                { accepted: req.body.accepted },
                {
                    where: {
                        userName: req.body.userName
                    }
                });
            res.status(200).json({
                users,
                success: true
            });
        }
        
    } catch (error) {
        res.status(404).json({
            success: false
        });
        next(error);
    }
}
module.exports = exports = approveSignUpRequest;