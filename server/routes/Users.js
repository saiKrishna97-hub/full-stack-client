const express = require("express");
const router = express.Router();
const Users = require("../models").Users;
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/middleware");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    return res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User doesn't exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({
        error: "Username and password combination is incorrect",
      });
    const accessToken = sign(
      { username: user.username, id: user.id },
      "secret"
    );
    return res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/verify", validateToken, async (req, res) => {
  res.json(req.user);
});

router.get("/userinfo/:id", async (req, res) => {
  const id = req.params.id;
  const userinfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(userinfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) res.json({ error: "Entered wrong password" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
    });
    res.json("Success");
  });
});
module.exports = router;
