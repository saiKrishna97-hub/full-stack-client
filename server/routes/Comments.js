const express = require("express");
const router = express.Router();
const Comments = require("../models").Comments;
const { validateToken } = require("../middleware/middleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});
router.post("/", validateToken, async (req, res) => {
  const postComments = req.body;
  const username = req.user.username;
  postComments.username = username;
  await Comments.create(postComments);
  res.json(postComments);
});
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } });
  res.json("DELETE SUCCESSFULLY");
});
module.exports = router;
