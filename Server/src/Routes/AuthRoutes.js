const express = require("express");
const { login, register } = require("../Controller/AuthController");
const router = express.Router();

router.post("/login", login); // login api
router.post("/register", register); // register api

module.exports = router;
