require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const instaNode = require('instagram-node').instagram();
const app = express();
const port = 3000;

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

instaNode.use({
    access_token: process.env.IG_ACCESS_TOKEN
});

//Home page route - popular images
app.get('/', (req, res) => {
    instaNode.user_self_media_recent((err, medias, pagination, remaining, limit) => {
        res.render('pages/index', {
            instaData: medias
        });
    });
});

//START THE SERVER
app.listen(process.env.PORT || port, () => console.log(`instamez starts on ${port}`));