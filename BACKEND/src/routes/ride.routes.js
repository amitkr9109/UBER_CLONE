const express = require("express");
const router = express.Router();
const rideMiddleWare = require("../middlewares/ride.middleware");
const userMiddleWare = require("../middlewares/user.middleware");
const rideController = require("../controllers/ride.controller");
const captainMiddleware = require("../middlewares/captain.middleware");

router.post("/create", userMiddleWare.authUser, rideMiddleWare.createRideValidation, rideController.createRideController);

router.get("/get-fare", userMiddleWare.authUser, rideMiddleWare.getFareValidation, rideController.getFareController);

router.post("/confirm", captainMiddleware.authCaptain, rideMiddleWare.confirmRideValidation, rideController.confirmRideController);

router.get("/start-ride", captainMiddleware.authCaptain, rideMiddleWare.startRideValidation, rideController.startRideController);

router.post("/end-ride", captainMiddleware.authCaptain, rideMiddleWare.endRideValidation, rideController.endRideController);

module.exports = router;