const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function signIn(req, res, next) {
    try {
        
        // let token = req.headers['access-token'];
        let token = null;
        let users = null;
        let msg = null;
        users = await models.Users.findOne({
            where: {
                [Op.and]: [
                    { userName: req.body.userName },
                    {
                        [Op.or]: [
                            { accepted: true },
                            { role: "admin" }
                        ]
                    }
                ]

            }
        });
        // console.log(users)
        let match = null;
        if (users) {
            match = passwordHash.verify(req.body.password, users.password);
            console.log("match value is ::  " + match)
        }
        else {
            res.send({
                success: false,
                uSuccess: false,
                pSuccess: false,
                // role: users.role
            })
        }
        if (match) {
            res.send({
                success: true,
                uSuccess: true,
                pSuccess: true,
                role: users.role,
                token: await jwt.sign({ id: users.id, userName: users.userName }, 'keyboard cat 4 ever', { expiresIn: '1h' }) // Signing the token
            });
            // localStorage.setItem(token,token)   
            //login
            // token = await jwt.sign({ id: users.id }, 'keyboard cat 4 ever', { expiresIn: '1h' }); // Signing the token

            // localStorage.setItem("token",token)
            // token=localStorage.getItem("role")
            // console.log("role is :"+token)
            // const payload = jwt.decode(token)
            // console.log("id is"+payload.id)
            // users.jwtToken=token;
            // browser.cookie

        }
        else {
            res.send(
                {
                    success: false,
                    uSuccess: true,
                    pSuccess: false,
                    role: users.role
                }
            );
            // res.status(400).json({
            //     message: "signin Unsuccessful"
            // });
        }
        //...
    } catch (error) {
        next(error);
    }
}
module.exports = exports = signIn;