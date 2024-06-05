const post = require("../controllers/post-controller");
const auth = require("../controllers/auth-controller");
const {uploadPostMedia} = require("../utils/multerConfig");
const router = require("express").Router();
router.post('/',auth.protect ,post.post);
router.delete('/:id',auth.protect ,post.deletePost);
router.get('/user/:id',post.getUserPosts);
router.get('/:id',post.getPost);
module.exports = router
