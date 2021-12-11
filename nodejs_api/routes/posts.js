const express = require("express");

const router = express.Router();
const Post = require("../models/Post");

// router.get("/", (req, res) => {
//   res.send("We are on posts.");
// });

// router.get("/specific", (req, res) => {
//   res.send("We are on specific posts.");
// });

router.get('/',async(req, res)=>{
    const posts=await Post.find();
    res.json(posts);
});

router.post("/", (req, res) => {

  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

// specific post
router.get("/:id", async(req, res) => {
    try{
    const post=await Post.findById(req.params.id);
    res.json(post);
    }catch(err){
        res.json({message:err});
    }
});

// delete
router.delete("/:id", async(req, res) => {
    try{
    const removedPost=await Post.deleteOne({_id:req.params.id});
    res.json(removedPost);
    }catch(err){
    res.json({message:err});
    }
});

// update
router.patch("/:id", async(req, res) => {
    try{
    const updatedPost=await Post.updateOne(
        {_id:req.params.id},
        {$set:{title:req.body.title}}
    );
    res.json(updatedPost);
    }catch(err){
    res.json({message:err});
    }
});

module.exports = router;
