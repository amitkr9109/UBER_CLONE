const { query } = require("express-validator");

const getCoordinatesValidation = [
    query("address").isString().isLength({ min: 3 }).withMessage("Address must be at least 3 characters long"),
];

const getDistanceTimeValidation = [
    query("origin").isString().isLength({ min: 3 }).withMessage("PickUp address must be at least 3 characters long"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Drop address must be at least 3 characters long"),
];

const getSuggestionsValidation = [
    query("input").isString().isLength({ min: 2 }).withMessage("Address must be at least 2 characters long"),
];

module.exports = {
    getCoordinatesValidation,
    getDistanceTimeValidation,
    getSuggestionsValidation,
}