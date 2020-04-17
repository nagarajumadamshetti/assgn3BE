const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize')
const express = require('express');
const app = express();

const addImages = async (posts) => {
    let arr = []
    for (let post of posts) {
        console.log("image mapper")
        const images = await models.Images.findAll(
            {
                where: {
                    postId: post.id
                },
                attributes: ['id', 'postId']
            }
        );
        
        // console.log(images)
        let obj = {
            ...post,
            images
        }
        arr.push(images)
        post = obj
        // post = { ...post, images:images }
        // console.log("each post "+post)
        // console.log(post)
    }
    // console.log(posts);
    // await posts.map(async (el, key) => {
    //     console.log("image mapper")
    //     const images = await models.Images.findAll(
    //         {
    //             where: {
    //                 postId: el.id
    //             },
    //             attributes: ['imageUrl', 'postId']
    //         }
    //     );
    //     el = { ...el, images }
    // })
    console.log("arr is")
    console.log(arr)
    return posts;
}
const getUserPosts = async (req, res, next) => {
    try {
        console.log("entered get  user posts")

        console.log(req.params.id)
        console.log(" ")
        console.log(" ")
        await models.Users.findAll({
            where: {
                userName: req.params.id
            },
            attributes: ['id'],
            include: [
                {
                    model: models.Posts,
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
                }
            ]
        })
            .then(users => {
                console.log(" ")
                console.log(" ")
                if (users.length == 0) {
                    res.status(404).send({
                        success: false
                    });
                }
                // console.log(users)
                const data = users.map(user => {
                    //tidy up the user data
                    return Object.assign(
                        {},
                        {
                            user_id: user.id,
                            posts: user.Posts.map(post => {

                                //tidy up the post data
                                return Object.assign(
                                    {},
                                    {
                                        postId: post.id,
                                        description: post.description,
                                        images: post.Images.map(image => {

                                            //tidy up the image data
                                            return Object.assign(
                                                {},
                                                {
                                                    image_id: image.id,
                                                    post_id: image.postId,
                                                    imageUrl: image.imageUrl,
                                                    lastModified: image.lastModified,
                                                }
                                            )
                                        }),
                                        likes: post.Likes.map(like => {

                                            //tidy up the image data
                                            return Object.assign(
                                                {},
                                                {
                                                    like_id: like.id,
                                                    post_id: like.postId,
                                                    userId: like.userId,
                                                    likedUserName: like.likedUserName,
                                                }
                                            )
                                        })
                                    }
                                )
                            })
                        }
                    )

                });
                console.log(" ")
                console.log(" ")
                res.send({
                    data,
                    success: true
                });
            })

        // res.send(users);
        // let users = await models.Users.findOne(
        //     {
        //         where: {
        //             userName: req.params.id
        //         },
        //         attributes: ['id']

        //     });
        // let posts = await models.Posts.findAll(
        //     {
        //         where: {
        //             userId: users.id
        //         },
        //         attributes: ['id', 'description', 'userId']
        //     }
        // );
        // let posts2 = await addImages(posts)
        // // console.log(posts2)
        // res.status(200).json({
        //     success: true,
        //     posts2,
        // })
        // await posts.map(async (el, key) => {
        //     // console.log(el)
        //     const images = await models.Images.findAll(
        //         {
        //             where: {
        //                 postId: el.id
        //             },
        //             attributes: ['imageUrl', 'postId']
        //         }
        //     );
        //     el = { id: el.id, description: el.description, images: images }
        //     // console.log(el.images)
        // })
        // console.log("added images");
        // res.status(200).json({
        //     success: true,
        //     posts,
        // })

    } catch (error) {
        res.status(404).json({
            success: false
        });
        next(error);
    }
}
module.exports = exports = getUserPosts;