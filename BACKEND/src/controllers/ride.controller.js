const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const mapServive = require("../services/maps.service");
const config = require("../config/config");
const { sendMessageToSocketId } = require("../../socket");
const rideModel = require("../models/ride.model");

const createRideController = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        
        const ride = await rideService.createRideService({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        res.status(200).json({ message: "ride created successfully", ride });

        const pickupCoordinates = await mapServive.getAddressCoordinateService(pickup);

        const captainsInRadius = await mapServive.getCaptainsInRadiusService(pickupCoordinates.ltd, pickupCoordinates.lng, config.SEARCH_RADIUS_KM);
        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user")

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            })
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFareController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json({ fare });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const confirmRideController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        
        const ride = await rideService.confirmRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        })

        return res.status(200).json({ message: "ride confirm successfully", ride });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const startRideController = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        
        const ride = await rideService.startRideService({ rideId, otp, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-started",
            data: ride
        });

        return res.status(200).json(ride);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const endRideController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        
        const ride = await rideService.endRideService({ rideId, captain: req.captain });
        
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-ended",
            data: ride
        });

        return res.status(200).json(ride);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createRideController,
    getFareController,
    confirmRideController,
    startRideController,
    endRideController,
};