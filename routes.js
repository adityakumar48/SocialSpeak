const router = require("express").Router();
const activateController = require("./controllers/activateController");
const authController = require("./controllers/authController");
const authMiddleware = require("./middlewares/authMiddleware");

router.post("/send-otp", authController.sendOtp)
router.post("/verify-otp", authController.verifyOtp)
router.post("/activate", authMiddleware, activateController.activate)

module.exports = router;