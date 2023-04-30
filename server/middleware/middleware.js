const { verify } = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in" });
  try {
    const token = verify(accessToken, "secret");
    req.user = token;
    if (token) return next();
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
