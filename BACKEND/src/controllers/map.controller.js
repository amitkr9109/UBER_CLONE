const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service"); 


const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
    } 
    
    const {address} = req.query;
    
    try {
        const coordinates = await mapService.getAddressCoordinateService(address);
        res.status(200).json({ success: true, address, coordinates });
    } catch (error) { 
        res.status(404).json({ message: error.message }); 
    } 
};

const getDistanceTime = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        
        const distanceTime = await mapService.getDistanceTimeService(origin, destination);
        res.status(200).json({ success: true, origin, destination, data: distanceTime });

    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
};

const getSuggestionsController = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
       
        const suggestions = await mapService.getSuggestionsService(input);
        res.status(200).json({ success: true, suggestions });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};  


module.exports = {
    getCoordinates, 
    getDistanceTime,
    getSuggestionsController,
};