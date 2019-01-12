// Import the router and controller (only for fetching headlines)
const router = require("express").Router();
const fetchController = require("../../controllers/fetch-controller");

// When going to the home route, it will scrape the website to put in the Headlines document
router.get("/", fetchController.scrapeHeadlines);

module.exports = router;