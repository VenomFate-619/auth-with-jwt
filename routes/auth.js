const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../util/localAuth");

const {
  register,
  login,
  dash,
  logout,
  googleLogin,
  call
} = require("../controller/auth");

router.post("/register", register);

router.post("/login", login);

router.get("/dash", verifyJwt, dash);

router.get("/logout", logout);

router.get('/googlelogin',googleLogin)

router.get('/auth/google/callback',call)

 

module.exports = router;
