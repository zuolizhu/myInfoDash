const express = require('express');
const app = express();

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

app.use("/api/posts", (req, res, next) => {
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