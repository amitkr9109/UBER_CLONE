const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  let distanceTime;
  try {
    distanceTime = await mapsService.getDistanceTimeService(pickup, destination);
  } catch (err) {
    console.error(err);
  }

  // fallback agar API fail ho jaye
  if (!distanceTime || !distanceTime.distance || !distanceTime.time) {
    return {
      car: 100,   // dummy values
      auto: 50,
      moto: 30
    };
  }

  const distanceInKm = parseFloat(distanceTime.distance.replace("km", "").trim());

  let timeInMinutes = 0;
  const timeString = distanceTime.time.toLowerCase();

  const hoursMatch = timeString.match(/(\d+)\s*hour/);
  const minutesMatch = timeString.match(/(\d+)\s*minute/);

  if (hoursMatch) {
    timeInMinutes += parseInt(hoursMatch[1]) * 60;
  }
  if (minutesMatch) {
    timeInMinutes += parseInt(minutesMatch[1]);
  }

  const baseFare = {
    car: 50,
    auto: 30,
    moto: 15,
  };
  const perKmRate = {
    car: 10,
    auto: 5,
    moto: 3,
  };
  const perMinuteRate = {
    car: 2,
    auto: 1,
    moto: 0.5,
  };

  const fare = {
    car: Math.round(baseFare.car + (distanceInKm * perKmRate.car) + (timeInMinutes * perMinuteRate.car)),
    auto: Math.round(baseFare.auto + (distanceInKm * perKmRate.auto) + (timeInMinutes * perMinuteRate.auto)),
    moto: Math.round(baseFare.moto + (distanceInKm * perKmRate.moto) + (timeInMinutes * perMinuteRate.moto)),
  };

  return fare;
}



function getOtp (num) {
  function generateOtp (num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
  }
  return generateOtp(num);
}

const createRideService = async ({ user, pickup, destination, vehicleType }) => {

  if(!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  try {

    const fareTypeVehicleCalculate = await getFare(pickup, destination);

    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      fare: fareTypeVehicleCalculate[vehicleType],
      otp: getOtp(4),
    });

    return ride;

  } catch (error) {
    throw new Error(error.message);
  }
};


const confirmRideService = async ({ rideId, captain }) => {

  if(!rideId || !captain) {
    throw new Error("Ride id and captain is required");
  }

  try {
    
    await rideModel.findOneAndUpdate({
      _id: rideId
    }, {
      status: "accepted",
      captain: captain._id
    });

    const ride = await rideModel.findOne({ _id: rideId }).populate("user captain").select("+otp");
    if(!ride) {
      throw new Error("Ride not found");
    }

    return ride; 

  } catch (error) {
    throw new Error(error.message);
  }
};

const startRideService = async ({ rideId, otp, captain }) => {

  if(!rideId || !otp) {
    throw new Error("Ride id and OTP is required");
  }
  try {

    const ride = await rideModel.findOne({
      _id: rideId
    }).populate("user captain").select("+otp");

    if(!ride) {
      throw new Error("Ride not found");
    }

    if(ride.status !== "accepted") {
      throw new Error("Ride not accepted");
    }

    if(ride.otp !== otp) {
      throw new Error("Invalid otp");
    }

    await rideModel.findOneAndUpdate({
      _id: rideId
    }, {
      status: "ongoing"
    });

    return ride;

  } catch (error) {
    throw new Error(error.message);
  }
};

const endRideService = async ({ rideId, captain }) => {

  if(!rideId || !captain) {
    throw new Error("Ride id and captain is required");
  }

  try {
    
    const ride = await rideModel.findOne({
      _id: rideId,
      captain: captain._id
    }).populate("user captain").select("+otp");

    if(!ride) {
      throw new Error("Ride not found");
    }

    if(ride.status !== "ongoing") {
      throw new Error("Ride not ongoing");
    }

    await rideModel.findOneAndUpdate({
      _id: rideId
    }, {
      status: "completed"
    });

    return ride;

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createRideService,
  getFare,
  confirmRideService,
  startRideService,
  endRideService,
};