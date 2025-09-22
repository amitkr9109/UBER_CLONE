const axios = require("axios");
const config = require("../config/config");
const captainModel = require("../models/captain.model");

const apiKey = config.TOMTOM_API_KEY;

const getAddressCoordinateService = async (address) => {

    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${apiKey}&limit=1`;

    try {

      const response = await axios.get(url);
      if (response.data && response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        return {
          ltd: result.position.lat,
          lng: result.position.lon,
        };
      } else {
        throw new Error("Address not found");
      }
        

    } catch (error) {
      throw new Error(error.message);
    }
};


const getDistanceTimeService = async (origin, destination) => {

  try {

    const originCoords = await getAddressCoordinateService(origin);
    const destCoords = await getAddressCoordinateService(destination);

    const url = `https://api.tomtom.com/routing/1/calculateRoute/${originCoords.ltd},${originCoords.lng}:${destCoords.ltd},${destCoords.lng}/json?key=${apiKey}`;

    const response = await axios.get(url);
    if (response.data && response.data.routes && response.data.routes.length > 0) {

      const summary = response.data.routes[0].summary;

      const distanceKm = (summary.lengthInMeters / 1000).toFixed(2);
      const totalSeconds = summary.travelTimeInSeconds;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      return {
        distance: `${distanceKm} km`,
        time: `${hours} hours ${minutes} minutes`,
      };
      
    } else {
      throw new Error("No route found between these locations");
    }
  } catch (error) {
    // console.error("DistanceTime Error:", error);
    throw new Error(error.message);
  }
};

const getSuggestionsService = async (input) => {

  const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(input)}.json?key=${apiKey}`;
  
  try {

    const response = await axios.get(url);
    if (response.data && response.data.results && response.data.results.length > 0) {
      return response.data.results.map(result => ({
        address: result.address.freeformAddress,
        position: result.position,
      }));
    } else {
      throw new Error("No suggestions found");
    }

  } catch (error) {
    // console.error("Suggestions Error:", error);
    throw new Error(error.message);
  }
};

const getCaptainsInRadiusService = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [ ltd, lng ], radius / 6371 ]
      }
    }
  });
  return captains;
};

module.exports = {
  getAddressCoordinateService,
  getDistanceTimeService,
  getSuggestionsService,
  getCaptainsInRadiusService,
};
