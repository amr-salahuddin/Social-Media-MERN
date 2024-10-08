const authController = require("../controllers/auth-controller");
const {profilePictureStorage} = require("../utils/multerConfig");
const router = require("express").Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.protect, authController.me);

module.exports = router