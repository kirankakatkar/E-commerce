const router = require("express").Router();

const { adminLogin, validateToken, refreshToken } = require("../controllers/auth.controller");

router.post('/', adminLogin)
router.post('/validate-token', validateToken)
router.post('/refresh-token', refreshToken)

module.exports = router;
