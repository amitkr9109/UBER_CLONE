const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user.middleware");
const mapController = require("../controllers/map.controller");
const mapValidation = require("../middlewares/map.validation");

router.get("/get-coordinates", mapValidation.getCoordinatesValidation, userMiddleware.authUser, mapController.getCoordinates);

router.get("/get-distance-time", mapValidation.getDistanceTimeValidation, userMiddleware.authUser, mapController.getDistanceTime);

router.get("/get-suggestions", mapValidation.getSuggestionsValidation, userMiddleware.authUser, mapController.getSuggestionsController);

module.exports = router;