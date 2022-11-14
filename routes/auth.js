const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", (req, res) => {
  console.log(req);
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.get("/auth/signup", (req, res) => {
  console.log(req.session.isLoggedIn);
});

router.post("/auth/signup", authController.postSignup);

router.post("/auth/signin", authController.postSignin);

module.exports = router;
