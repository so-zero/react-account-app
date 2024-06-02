const UserModel = require("../model/UserModel");

async function profile(req, res) {
  try {
    const user = await UserModel.findById(req.userId).select("-password");

    res.status(200).json({
      message: "User Profile",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = profile;
