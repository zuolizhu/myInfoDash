const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
    // Construct a new Post object based on mongoose schema
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    // Save created post into cloud DB
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully!',
            postId: createdPost._id
        });
    });
});

router.get("", (req, res, next) => {

    // Return all posts from DB
    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts feteched successfully",
            posts: documents
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post deleted!'
        });
    });
    
});

// update
router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });

    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: 'update successful!'});
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    });
});


module.exports = router;