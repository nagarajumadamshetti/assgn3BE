const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();


const timeline = async (req, res, next) => {
    try {
        console.log("entered get  user posts")

        console.log(req.params.id)
        console.log(" ")
        console.log(" ")
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
                                followingUserId: following.followingUserId,
                                followingUserName: following.followingUserName,
                            }
                        )
                    })
                }
            )
        })
        console.log(" ")
        console.log(" ")
        let timeline = following[0].following.map(following => {
            return Object.assign(
                {},
                {
                    userId: following.userId,
                    followingUserId: following.followingUserId,
                    followingUserName: following.followingUserName,
                    posts: await models.Posts.findAll({
                        where: {
                            userId: following.userId
                        },
                        attributes: ['id', 'description'],
                        include: [
                            {
                                model: models.Images,
                                attributes: ['id', 'postId', 'imageUrl', 'lastModified']
                            },
                            {
                                model: models.Likes,
                                attributes: ['id', 'postId', 'userId', 'likedUserName']
                            }
                        ]
                    })
                }
            )
        })
        console.log(" ")
        console.log(" ")
        res.send({
            timeline,
            success: true
        });



    } catch (error) {
        res.status(404).json({
            success: false
        });
        next(error);
    }
}
module.exports = exports = timeline;