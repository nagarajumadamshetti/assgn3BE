const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();


const getPostComments = async (req, res, next) => {
    try {
        console.log("entered get  post comments ")

        console.log(" ")
        console.log(" ")
        await models.Posts.findAll({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: models.Comments,
                    // attributes: ['id', 'postId', 'userId', 'commentedUserName', 'comment']
                },
            ]
        })
            .then(posts => {
                console.log(" ")
                console.log(" ")
                if (posts.length == 0) {
                    res.status(404).send({
                        success: false
                    });
                }


                const data = posts.map(post => {
                    //tidy up the post data
                    return Object.assign(
                        {},
                        {
                            comments: post.Comments.map(comment => {

                                //tidy up the image data
                                return Object.assign(
                                    {},
                                    {
                                        author: comment.commentedUserName,
                                        content: comment.comment,
                                        datetime: moment(comment.createdAt).fromNow(),
                                    }
                                )
                            }),



                        })
                }
                )


                console.log(" ")
                console.log(" ")
                res.send({
                    data,
                    success: true
                });
            })



    } catch (error) {
        res.status(404).json({
            success: false
        });
        // next(error);
        console.log(error)
    }
}
module.exports = exports = getPostComments;