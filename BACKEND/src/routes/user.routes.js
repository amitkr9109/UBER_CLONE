const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user.middleware");
const userController = require("../controllers/user.controller");

router.post("/register", userMiddleware.registerUserValidation, userController.registerUserController);

router.post("/login", userMiddleware.loginUserValidation, userController.loginUserController);

router.get("/profile", userMiddleware.authUser, userController.profileUserController);

router.get("/logout", userMiddleware.authUser, userController.logOutUserController);

module.exports = router;