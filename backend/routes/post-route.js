const postController = require("../controllers/post-controller");
const {protect} = require("../controllers/auth-controller");
const postUpload = require("../utils/multerConfig");
const router = require("express").Router();
router.post('/', protect, postUpload.any('file'), postController.createPost);
router.delete('/:id', protect, postController.deletePost);
router.get('/all/:id', postController.getUserPosts);
router.get('/:id', postController.getPostById);

router.patch('/like/:id',protect, postController.likePost);
router.post('/comment/:id',protect,postUpload.any('file'), postController.comment);
router.delete('/comment/:id',protect, postController.uncomment);
router.get('/comments/:id', postController.getComments);
//router.get('/comment/:id', postController.getCommentById);
module.exports = router