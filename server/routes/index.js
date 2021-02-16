const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { body } = require("express-validator");

module.exports = function () {
	router.post(
		"/register",
		body("nombre").not().isEmpty(),
		body("username").not().isEmpty().isLength({ min: 4 }),
		body("password").isLength({ min: 5 }),
		usersController.registerUser,
	);
	router.post(
		"/login",
		body("username").not().isEmpty(),
		body("password").not().isEmpty(),
		usersController.loginUser,
	);

	return router;
};
