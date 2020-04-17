const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function signUp(req, res, next) {
    try {
        console.log("entered signup1")
        const hashedValue = passwordHash.generate(req.body.password);
        req.body.password = hashedValue;
        // console.log("entered signup2");
        const users = await models.Users.create(req.body);
        res.status(200).json({
            users,
            success: true
        });

        
    } catch (error) {
        console.log("catch signup")
        res.status(404).json({
            success: false
        });
        // next(error);
    }
}
module.exports = exports = signUp;