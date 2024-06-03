const router = require("express").Router();
const upload = require("../utils/multerConfig");

const auth = require("../controllers/auth-controller");
router.post('/register', auth.register);
router.post('/login', auth.login);
router.delete('/', auth.deleteAll);
module.exports = router;
