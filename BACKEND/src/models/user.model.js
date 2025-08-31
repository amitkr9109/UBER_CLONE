const mongoose = require("mongoose");
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
});


userSchema.statics.hashPassword = async function (password) {
    return await bcrpt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrpt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.JWT_SECRET, { expiresIn: config.JWT_SECRET_EXPIRES_IN });
    return token;
};

userSchema.statics.verifyToken = function (token) {
    if(!token) {
        throw new Error("Token is required");
    };
    return jwt.verify(token, config.JWT_SECRET);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;