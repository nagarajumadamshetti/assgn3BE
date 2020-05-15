const express = require('express');
const router = express.Router();

const UploadNewPost = require('../controllers/addNewPost');
const GetUserPosts = require('../controllers/getUserPosts');
const FollowAPI = require('../controllers/followAPI');
const UnFollowAPI = require('../controllers/unFollowAPI');
const GetFollowersAndFollowing = require('../controllers/getFollowersAndFollowing');
const LikeOrUnlikePost = require('../controllers/likeOrUnlikePost');
const DeletePost = require('../controllers/deletePost');
const GetUserFollowRequests = require('../controllers/getUserFollowRequests');
const ApproveUserFollowRequests = require('../controllers/approveUserFollowRequest');
const DeclineUserFollowRequests = require('../controllers/declineUserFollowRequest');
const Timeline = require('../controllers/timeline');
const AddComment=require('../controllers/addNewComment');
const GetComments=require('../controllers/getComments');
const GetTotalTimelinePagesCount=require('../controllers/getTotalTimelinePagesCount');
const GetUserPostsWithId=require('../controllers/getUserPostsWithId');
const GetUserFollowRequestsWithId=require('../controllers/getUserFollowRequestsWithId');
const getFollowersAndFollowingWithId =require('../controllers/getFollowersAndFollowingWithId');


router.get('/getUserPosts/:id', GetUserPosts);
router.get('/getFollowersAndFollowing/:id', GetFollowersAndFollowing);
router.get('/getComments/:id',GetComments);
router.get('/getFollowRequests/:id', GetUserFollowRequests);
router.get('/timeline/:id/:page', Timeline);
router.get('/timelinePagesCount/:id',GetTotalTimelinePagesCount);
router.get('/getUserPostsWithId/:id',GetUserPostsWithId);
router.get('/getFollowRequestsWithId/:id',GetUserFollowRequestsWithId);
router.get('/getFollowersAndFollowing/:id',getFollowersAndFollowingWithId);



router.post('/uploadNewPost', UploadNewPost);
router.post("/follow", FollowAPI);
router.post('/addComment',AddComment);
router.post('/unFollow', UnFollowAPI);
router.post('/likeOrUnlikePost', LikeOrUnlikePost);
router.post('/deletePost', DeletePost);


router.put('/approveFollowRequest', ApproveUserFollowRequests);


router.delete('/declineFollowRequest', DeclineUserFollowRequests);


module.exports = router;