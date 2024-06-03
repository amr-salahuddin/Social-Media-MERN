const post = require("../controllers/post-controller");
const auth = require("../controllers/auth-controller");
const {uploadPostMedia} = require("../utils/multerConfig");
const router = require("express").Router();
router.post('/',auth.protect,uploadPostMedia.single('file') ,post.post);
module.exports = router
