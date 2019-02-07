const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// Cloud DB connection config
mongoose.connect('mongodb+srv://goodtogo:1xivK8fPx59jyIYI@meanapp-ewu5f.mongodb.net/meanApp?retryWrites=true', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to cloud DB!");
}).catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {

    // Return all posts from DB
    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts feteched successfully",
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post deleted!'
        });
    });
    
});

module.exports = app;