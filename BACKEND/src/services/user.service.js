const userModel = require("../models/user.model");

const createUserService = async ({ firstname, lastname, email, password }) => {

    if(!firstname || !email || !password) {
        throw new Error("All fields are required");
    };

    try {

        const user = await userModel.create({
            fullname: { firstname, lastname },
            email,
            password
        });

        return user;

    } catch (error) {
        res.status(400).json({ message: error.message }); 
    };
};


module.exports = {
    createUserService,
};