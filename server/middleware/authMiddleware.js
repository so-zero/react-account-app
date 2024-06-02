const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.Authorization || req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
      if (err) {
        res.status(422).json({
          message: "Unauthorized access",
          error: true,
        });
      }

      req.userId = info.id;

      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = authMiddleware;
