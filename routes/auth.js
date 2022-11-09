const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/auth/signup", authController.postSignup);

module.exports = router;
