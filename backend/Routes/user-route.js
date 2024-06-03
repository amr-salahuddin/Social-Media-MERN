const router = require("express").Router();
const user = require("../controllers/user-controller");
const auth = require("../controllers/auth-controller");
router.get('/:id', user.getUser);
router.get('/:id/friends', user.getFriends);
router.delete('/friend/:id', auth.protect, user.removeFriend);
router.post('/friend/:id', auth.protect, user.friendRequest);
module.exports = router
