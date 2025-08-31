const { body } = require("express-validator");
const userModel = require("../models/user.model");
const redis = require("../services/redis.service");

const registerUserValidation = [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const loginUserValidation = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];


const authUser = async (req, res, next) => {

    try {

        const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ];
        if(!token) {
            return res.status(401).json({ message: "Unauthorized user" });
        };

        const isTokenBlackListed = await redis.get(`blacklist:${token}`);
        if(isTokenBlackListed) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
       
        const decoded = await userModel.verifyToken(token);

        let user = await redis.get(`user:${decoded._id}`);
        if(user) {
            user = JSON.parse(user);
        };

        if(!user) {
            user = await userModel.findById(decoded._id);
            if(user) {
                delete user._doc.password;
                await redis.set(`user:${decoded._id}`, JSON.stringify(user));
            }
            else{
                return res.status(401).json({ message: 'Unauthorized User' });
            }
        };

        req.user = user;

        req.tokenData = { token, ...decoded };

        return next();
        

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    };
};


module.exports = {
    registerUserValidation,
    loginUserValidation,
    authUser,
};