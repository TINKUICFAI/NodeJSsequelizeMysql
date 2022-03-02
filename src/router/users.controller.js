const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const userService = require("../controller/user.service.js");


router.use(authorize());
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getCurrent(req, res, next) {
  res.json(req.user);
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    username: Joi.string().empty(""),
    password: Joi.string().min(6).empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  console.log("req id::::::::::",req.params.id);
  userService
    .delete(req.params.id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
}
