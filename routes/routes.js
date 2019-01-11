// Import express and setup the router
const express = require('express');
const router = express.Router();

var scrape = require('../scripts/scrape');

// takes user to the homepage
router.get('/', function(req, res) {
    res.render('home');
});

router.get('/test', (req, res) => {
    // grab the article info from
    scrape("https://www.theverge.com/", (articles) => {
        // send to the browser as json
        res.json(articles);
    });
});

// Export the router for the server
module.exports = router;