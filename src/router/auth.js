const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const userService = require("../controller/user.service.js");

// routes
router.post("/login", authenticateSchema, authenticate);
router.post("/register", register);

module.exports = router;


function authenticateSchema(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    validateRequest(req, next, schema);
  }
  
  function authenticate(req, res, next) {
    userService
      .authenticate(req.body)
      .then((user) => res.json(user))
      .catch(next);
  }
  
  function registerSchema(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
      landmark: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
      pincode: Joi.number()
    });
    validateRequest(req, next, schema);
  }
  
  function register(req, res, next) {
    console.log("registerrrrrrrrrr", req.body);
    userService
      .create(req.body)
      .then(() => res.json({ message: "Registration successful" }))
      .catch(next);
  }
  
