const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    const post = req.body;
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