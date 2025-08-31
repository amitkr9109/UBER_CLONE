const mongoose = require("mongoose");
const config = require("../config/config");

function connectToDb() {
    mongoose.connect(`${config.MONGO_URI}/uber_clone`)
    .then(() => {
        console.log("connected to DB");
    }).catch(err => console.log(err))
}

module.exports = connectToDb;