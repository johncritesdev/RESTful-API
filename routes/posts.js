const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GETS BACK ALL THE POSTS
router.get('/', async (req, res) => {
  try{
    const posts = await Post.find();
    res.json(posts);
  } catch(err) {
    res.json({message: err});
  }
});
//SUBMITS A POST
router.post('/', async (req, res) => {
  const submPost = new Post({
    title: req.body.title,
    description: req.body.description
  });
  //save to the database as a promise and use a catch if the promise is broken or use async-await followed by a try-catch
  try{
  const savePost = await submPost.save()
  res.json(savePost)
  } catch {
    res.json({message: err});
  }
});
//GETS A SPECIFIC POST
router.get('/:postId', async (req, res) => {
  try{
    const specPost = await Post.findById(req.params.postId);
    res.json(specPost);
  } catch(err) {
    res.json({message: err});
  }
});

//DELETE POST
router.delete('/:postId', async (req,res) => {
  try{
   const removePost = await Post.remove({_id: req.params.postId});
   res.json(removePost);
  } catch(err) {
    res.json({message: err});
  }
});

//UPDATE POST
router.patch('/:postId', async (req,res) => {
  try{
   const updatePost = await Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title}});
   res.json(updatePost);
  } catch(err) {
    res.json({message: err});
  }
});

module.exports = router;

//42:44