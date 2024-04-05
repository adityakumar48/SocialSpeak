const router = require("express").Router();
const activateController = require("./controllers/activateController");
const authController = require("./controllers/authController");
const roomsController = require("./controllers/roomsController");
const authMiddleware = require("./middlewares/authMiddleware");

router.post("/send-otp", authController.sendOtp)
router.post("/verify-otp", authController.verifyOtp)
router.post("/activate", authMiddleware, activateController.activate)
router.get("/refresh", authController.refresh)
router.post("/logout",authMiddleware, authController.logout)
router.post("/rooms",authMiddleware, roomsController.create)
router.get("/rooms",authMiddleware, roomsController.index)

module.exports = router;