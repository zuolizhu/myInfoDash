const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// Cloud DB connection config
mongoose.connect('mongodb+srv://goodtogo:1xivK8fPx59jyIYI@meanapp-ewu5f.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
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
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully!'
    });
});

app.get("/api/posts", (req, res, next) => {
    const posts = [
        {
            id: "fafad213123", 
            title: "server side post", 
            content: "This post comes from back end server"
        },
        {
            id: "aesfa124123", 
            title: "Second server side post", 
            content: "This post comes from back end server ..."
        },
    ];
    res.status(200).json({
        message: "Posts feteched successfully",
        posts: posts
    });
});

module.exports = app;