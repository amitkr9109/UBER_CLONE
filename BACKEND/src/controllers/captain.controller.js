const { validationResult } = require("express-validator")
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const redis = require("../services/redis.service");

const registerCaptainController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    try {
        
        const { fullname, email, password, vehicle } = req.body;

        const isAlreadyExist = await captainModel.findOne({ email });
        if(isAlreadyExist) {
            return res.status(400).json({ message: "Captain already exist" });
        };

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptainService({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(200).json({ captain, token, message: "Captain register successfully" });

    } catch (error) {
       console.log(error);
       res.status(401).json({ message: error.message }); 
    };
};

const loginCaptainController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select("+password");
        if(!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        };

        const isMatch = await captain.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        };

        const token = captain.generateAuthToken();

        res.cookie("token", token);

        res.status(200).json({ captain, token, message: "Captain login successfully" });

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    };
};

const profileCaptainController = async (req, res, next) => {

    try {
        res.json(req.captain);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    };
};

const logOutCaptainController = async (req, res, next) => {

    try {
        
        const timeRemainingForToken = req.tokenData.exp * 1000 - Date.now();
        await redis.set(`blacklist:${ req.tokenData.token }`, true, "EX", Math.floor(timeRemainingForToken / 1000));
        res.send("Logout successfully");
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    };
};

module.exports = {
    registerCaptainController,
    loginCaptainController,
    profileCaptainController,
    logOutCaptainController,
};