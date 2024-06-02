const express = require("express");
const register = require("../controller/register");
const login = require("../controller/login");
const profile = require("../controller/profile");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/user-profile", authMiddleware, profile);

module.exports = router;
