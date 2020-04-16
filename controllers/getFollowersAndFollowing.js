const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();
async function getFollowersAndFollowing(req, res, next) {
    try {
        console.log(" ")
        console.log(" ")
        console.log("get followers and following")
        console.log(" ")
        console.log(" ")
        console.log(req.params.id)
        let users = await models.Users.findAll({
            where: {
                userName: req.params.id
            },
            attributes: ['id', 'userName'],
            include: [
                {
                    model: models.Followers,
                }
            ]
        })
        let followers = users.map(user => {
            //tidy up the user data
            return Object.assign(
                {},
                {
                    user_id: user.id,
                    followers: user.Followers.map(follower => {

                        //tidy up the Followers data
                        return Object.assign(
                            {},
                            {
                                userId: follower.userId,
                                followersUserId: follower.followersUserId,
                                followersUserName: follower.followersUserName,
                            }
                        )
                    })
                }
            )
        })
        console.log(" ")
        console.log(" ")
         users = await models.Users.findAll({
            where: {
                userName: req.params.id
            },
            attributes: ['id', 'userName'],
            include: [
                {
                    model: models.Following,
                }
            ]
        })
        let following = users.map(user => {
            //tidy up the user data
            return Object.assign(
                {},
                {
                    user_id: user.id,
                    following: user.Followings.map(following => {

                        //tidy up the Folloeing data
                        return Object.assign(
                            {},
                            {
                                userId: following.userId,
                                followingUserId: following.followersUserId,
                                followingUserName: following.followingUserName,
                            }
                        )
                    })
                }
            )
        })
        console.log(" ")
        console.log(" ")
        console.log("get followers and following done")
        console.log(" ")
        console.log(" ")
        
        // const users = await models.Users.findAll({
        //     where: {
        //         userName: req.params.id
        //     },
        //     attributes: ['id']
        // })
        // console.log(users.id);
        // const followers = await models.Followers.findAll({
        //     where: {
        //         userId: users.id
        //     }
        // });
        // const following = await models.Followings.findAll({
        //     where: {
        //         userId: users.id
        //     }
        // });
        res.send(
            {
                followers,
                following,
                success: true
            })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false
        })
        // next(error);
    }
}
module.exports = exports = getFollowersAndFollowing;