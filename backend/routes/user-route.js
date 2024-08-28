const userController = require('../controllers/user-controller');
const postController = require('../controllers/post-controller');
const {protect} = require('../controllers/auth-controller');

const router = require('express').Router();

router.get('/', userController.getAllUsers);
router.delete('/', userController.deleteAllUsers);

//region friend
router.get('/friends/:id',userController.getFriends);
router.get('/friend-requests',protect,userController.getFriendRequests);
router.get('/sent-friend-requests',protect,userController.getSentFriendRequests);
router.post('/friend/:id',protect,userController.addFriend);
router.delete('/friend/:id',protect,userController.removeFriend);
//endregion

//region posts comments shares
router.get('/posts/:id', postController.getUserPosts);
// router.get('/comments/:id', userController.getUserComments);
// router.get('/shares/:id', userController.getUserShares);
//endregion
//region block
router.get('/blocked-users',protect,userController.getBlockedUsers);
router.post('/block/:id',protect,userController.block);
router.delete('/block/:id',protect,userController.unblock);
//endregion
//region report

router.post('/report/:id', protect, userController.report);
router.get('/report/:id', protect, userController.getReport);
router.get('/issued-reports', protect, userController.getIssuedReports);
router.get('/received-reports', protect, userController.getReceivedReports);
//endregion
router.get('/:id', userController.getUser);



module.exports = router
