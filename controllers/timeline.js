const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();


const timeline = async (req, res, next) => {
    try {
        // console.log(req.params.id)
        const payload = jwt.decode(req.params.id)
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log(" ")

        console.log("entered get  timeline")

        console.log(" ")
        console.log(" ")
        console.log(payload.id)
        console.log(" ")
        console.log(" ")
        let timeline = await models.Following.findAll({
            where: {
                userId: payload.id
            },
            // as: 'user',

            include: [
                {
                    model: models.Users,
                    as: 'followingUser',
                    attributes: ['id','userName'],
                    include: [
                        {
                            model: models.Posts,

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
                        }
                    ]
                },
            ]
        })
        let posts=[];
        timeline=timeline.map(el=>{
            posts=posts.concat(el.followingUser.Posts)
        })
        console.log("");
        console.log("");
        console.log("");
        // console.log(timeline);
        console.log("");
        console.log("");
        console.log("");
        res.send({
            posts,
            success: true
        });



    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            error
        });
        // next(error);
    }
}
module.exports = exports = timeline;