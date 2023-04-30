const express = require("express");
const router = express.Router();
const Posts = require("../models").Posts;
const { validateToken } = require("../middleware/middleware");

router.get("/", async (req, res) => {
  const postAll = await Posts.findAll();
  return res.json(postAll);
});
router.get(`/byId/:id`, async (req, res) => {
  const id = req.params.id;
  const postInfo = await Posts.findByPk(id);
  return res.json(postInfo);
});
router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.userName = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  return res.json(post);
});
router.delete(`/:postId`, validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });
  res.json("DELETED SUCCESSFULLY");
});
router.get(`/byuserId/:id`, async (req, res) => {
  const id = req.params.id;
  const listOfUserPosts = await Posts.findAll({ where: { UserId: id } });
  return res.json(listOfUserPosts);
});
module.exports = router;
