const { body } = require("express-validator");
const redis = require("../services/redis.service");
const captainModel = require("../models/captain.model");

const registerCaptainValidation = [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("Firstname must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isIn([ "car", "auto", "motorcycle" ]).withMessage("Invalid vehicle type"),
];

const loginCaptainValidation = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const authCaptain = async (req, res, next) => {

    try {
        
        const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ];
        if(!token) {
            return res.status(401).json({ message: "Unauthorized captain" });
        };

        const isTokenBlackListed = await redis.get(`blacklist:${token}`);
        if(isTokenBlackListed) {
            return res.status(401).json({ message: "Unauthorized captain" });
        };

        const decoded = await captainModel.verifyToken(token);
        
        let captain = await redis.get(`captain:${decoded._id}`);
        if(captain) {
            captain = JSON.parse(captain);
        };

        if(!captain) {
            captain = await captainModel.findById(decoded._id);
            if(captain) {
                delete captain._doc.password;
                await redis.set(`captain:${decoded._id}`, JSON.stringify(captain));
            }
            else{
                return res.status(401).json({ message: "Unauthorized captain" });
            }
        };

        req.captain = captain;

        req.tokenData = { token, ...decoded };

        return next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
}

module.exports = {
    registerCaptainValidation,
    loginCaptainValidation,
    authCaptain,
};