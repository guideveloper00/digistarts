const express = require("express");
const userController = require("../controllers/user");
const requireAuth = require("../guards/requireAuth");
const router = express.Router();

router.get("/status", userController.getUser);

router.patch("/update", userController.patchUser);

router.delete('/delete/:email', requireAuth, userController.deleteUser);

module.exports = router;
