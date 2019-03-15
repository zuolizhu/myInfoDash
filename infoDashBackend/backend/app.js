const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/auth');


const app = express();

// Cloud DB connection config
mongoose.connect('mongodb+srv://goodtogo:1xivK8fPx59jyIYI@meanapp-ewu5f.mongodb.net/meanApp?retryWrites=true', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to cloud DB!");
}).catch(() => {
    console.log("Connection failed!");
});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;