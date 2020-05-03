const express = require('express');
const router = express.Router();
const SignUp = require('../controllers/signUp');
const GetSignUpRequests = require('../controllers/getSignUpRequests');
const ApproveSignUpRequests = require('../controllers/approveSignUpRequest');
const DeclineSignUpRequests = require('../controllers/declineSignUpRequests');
const GetApprovedUsers = require('../controllers/getApprovedUsers');
const Login = require('../controllers/login');
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
const AddComment = require('../controllers/addNewComment');
const GetComments = require('../controllers/getComments');
const SignUpValidator = require('../ValidationMiddleware/signupValidator');
const LoginValidator = require('../ValidationMiddleware/loginValidator');


router.post('/signUp', SignUpValidator, SignUp);
router.post('/login', LoginValidator, Login);
router.post('/uploadNewPost', UploadNewPost);
router.post("/follow", FollowAPI);
router.post('/addComment', AddComment);
router.post('/unFollow', UnFollowAPI);
router.post('/likeOrUnlikePost', LikeOrUnlikePost);
router.post('/deletePost', DeletePost);


router.get('/admin/userRequests', GetSignUpRequests);
router.get('/admin/userList', GetApprovedUsers);
router.get('/getUserPosts/:id', GetUserPosts)
router.get('/getFollowersAndFollowing/:id', GetFollowersAndFollowing);
router.get('/getComments/:id', GetComments);
router.get('/getFollowRequests/:id', GetUserFollowRequests)
router.get('/timeline/:id', Timeline);


router.put('/admin/userRequests/accept', ApproveSignUpRequests);
router.put('/approveFollowRequest', ApproveUserFollowRequests);


router.delete('/admin/userRequests/decline', DeclineSignUpRequests);
router.delete('/declineFollowRequest', DeclineUserFollowRequests);


module.exports = router;