const express = require('express');
const router = express.Router();

const GetSignUpRequests = require('../controllers/getSignUpRequests');
const ApproveSignUpRequests = require('../controllers/approveSignUpRequest');
const DeclineSignUpRequests = require('../controllers/declineSignUpRequests');
const GetApprovedUsers = require('../controllers/getApprovedUsers');

router.get('/userRequests', GetSignUpRequests);
router.get('/userList', GetApprovedUsers);


router.put('/userRequests/accept', ApproveSignUpRequests);


router.delete('/userRequests/decline', DeclineSignUpRequests);


module.exports = router;