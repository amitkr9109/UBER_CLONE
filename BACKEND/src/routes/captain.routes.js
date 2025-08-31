const express = require("express");
const router = express.Router();
const captainMiddleware = require("../middlewares/captain.middleware");
const captainController = require("../controllers/captain.controller");


router.post("/register", captainMiddleware.registerCaptainValidation, captainController.registerCaptainController);
router.post("/login", captainMiddleware.loginCaptainValidation, captainController.loginCaptainController);
router.get("/profile", captainMiddleware.authCaptain, captainController.profileCaptainController);
router.get("/logout", captainMiddleware.authCaptain, captainController.logOutCaptainController);

module.exports = router;