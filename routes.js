const express = require("express");
const Post = require("./models/Post");
const router = express.Router();

module.exports = router;

//Get All Posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("Failed to fetch posts");
  }
});

//Create a new Post
router.post("/create/post", async (req, res) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//Get Individual Post
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post)
      res
        .status(404)
        .send({ error: `No post found with id: ${req.params.id}` });
    else res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//Update an existing Post
router.patch("/update/post/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    try {
      await post.save();
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send({ error: error });
    }
  } catch (error) {
    res.status(404).send({ error: `No post found with id: ${req.params.id}` });
  }
});

//Delete an existing Post
router.delete("/delete/post/:id", async (req, res) => {
  try {
    const response = await Post.deleteOne({ _id: req.params.id });
    if (!response.deletedCount)
      res
        .status(404)
        .send({ error: `No post found with id: ${req.params.id}` });
    else res.status(200).send("Post successfully deleted");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
