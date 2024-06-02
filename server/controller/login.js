const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(422).json({
        message: "Fill in all fields.",
        error: true,
      });
    }

    const newEmail = email.toLowerCase();

    const user = await UserModel.findOne({ email: newEmail });
    if (!user) {
      return res.status(422).json({
        message: "Invalid credentials.",
        error: true,
      });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(422).json({
        message: "Invalid credentials.",
        error: true,
      });
    }

    const info = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(info, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = login;
