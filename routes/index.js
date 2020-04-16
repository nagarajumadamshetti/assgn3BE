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
const FollowAPI=require('../controllers/followAPI');
const UnFollowAPI=require('../controllers/unFollowAPI');
const GetFollowersAndFollowing =require('../controllers/getFollowersAndFollowing');
/* GET home page. */
// router.get('/users/getActivities/:userName/:date',controller.getActivities);

router.post('/login', Login);
router.post('/signUp', SignUp);
router.post('/uploadNewPost', UploadNewPost)
router.post("/follow",FollowAPI);
router.get('/admin/userRequests', GetSignUpRequests);
router.get('/admin/userList', GetApprovedUsers);
router.get('/getUserPosts/:id', GetUserPosts)
router.get('/getFollowersAndFollowing/:id',GetFollowersAndFollowing);
router.put('/admin/userRequests/accept', ApproveSignUpRequests);
router.delete('/admin/userRequests/decline', DeclineSignUpRequests);
router.post('/unFollow',UnFollowAPI);
// router.put('/users/updatePassword',controller.updatePassword);
// router.post('/users/submitActivities',controller.postActivities);
// router.get('/users/userReport/:userName',controller.userReport);

module.exports = router;
