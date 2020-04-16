const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function followAPI(req, res, next) {
    try {
        console.log("follow api is called")
        console.log(" ")
        console.log(" ")
        const payload = jwt.decode(req.body.loggedUserIdToken)
        let users = await models.Users.findOne({
            where: {
                userName: req.body.userName,
            },
            attributes: ['id', 'userName']
        });
        console.log(" ")
        console.log(" ")
        let u=await models.Followers.findOne({
            where:{
                userId:users.id,
                followersUserName:payload.userName
            }
        })
        console.log(u)
        if(u)
        {
            console.log("follow already exists")
            res.send({
                success:false,
                message:"follow already exists"
            })
            return;
        }
        console.log("follow  not exists")
        console.log(" ")
        console.log(" ")
        
        let following = await models.Following.create({
            userId: payload.id,
            followingUserId: users.id,
            followingUserName: users.userName,
        });
        console.log(" ")
        console.log(" ")
        
        let followers = await models.Followers.create({
            userId: users.id,
            followersUserId: payload.id,
            followersUserName: payload.userName,
        });

        console.log(" ")
        console.log(" ")

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
module.exports = exports = followAPI;