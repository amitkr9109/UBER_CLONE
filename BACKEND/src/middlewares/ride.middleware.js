const { body, query } = require("express-validator");

const createRideValidation = [
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn([ "car", "auto", "moto" ]).withMessage("Invalid vehicleType"),
];

const getFareValidation = [
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
]

const confirmRideValidation = [
    body("rideId").isMongoId().withMessage("Invalid ride id"),
]

const startRideValidation = [
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp").isString().isLength({ min: 4, max: 4 }).withMessage("Invalid otp"),
]

const endRideValidation = [
    body("rideId").isMongoId().withMessage("Invalid ride id"),
]

module.exports = {
    createRideValidation,
    getFareValidation,
    confirmRideValidation,
    startRideValidation,
    endRideValidation,
};