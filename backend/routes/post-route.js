const postController = require("../controllers/post-controller");
const {protect} = require("../controllers/auth-controller");
const postUpload = require("../utils/multerConfig");
const router = require("express").Router();
router.post('/', protect, postUpload.any('file'), postController.createPost);
router.delete('/:id', protect, postController.deletePost);
router.get('/all/:id', postController.getUserPosts);
router.get('/:id', postController.getPostById);

module.exports = router