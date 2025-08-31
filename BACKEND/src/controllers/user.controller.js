const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const redis = require("../services/redis.service");

const registerUserController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    try {
            
        const { fullname, email, password } = req.body;

        const isAlreadyExist = await userModel.findOne({ email });
        if(isAlreadyExist) {
            return res.status(400).json({ message: "User already exist" });
        };

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUserService({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken();

        res.status(200).json({ user, token, message: "User register successfully" });

    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });  
    }
};

const loginUserController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    try {
        
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");
        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        };

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        };

        const token = user.generateAuthToken();

        res.cookie("token", token);

        res.status(200).json({ user, token, message: "Login successfully" });

    } catch (error) {
      console.log(error); 
      res.status(400).json({ message: error.message });  
    }
};

const profileUserController = async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    };
};

const logOutUserController = async (req, res, next) => {

    try {
        
        const timeRemainingForToken = req.tokenData.exp * 1000 - Date.now();
        await redis.set(`blacklist:${ req.tokenData.token }`, true, "EX", Math.floor(timeRemainingForToken / 1000));
        res.send("logout successfully");

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    };
};




module.exports = {
    registerUserController,
    loginUserController,
    profileUserController,
    logOutUserController,
};