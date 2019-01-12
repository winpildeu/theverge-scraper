// Import our script and models
const scrape = require('../scripts/scrape');
const db = require("../models");

module.exports = {
  scrapeHeadlines: function (req, res) {
    // Scrape theVerge for headlines
    return scrape()
      .then(articles => {
        // console.log(articles);
        // then insert the articles into the Headlines document
        return db.Headline.create(articles);
      })
      // Notifying the user if there were any new articles or not
      .then(function (dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
        }
        else {
          // Otherwise send back a count of how many new articles we got
          res.json({
            message: "Added " + dbHeadline.length + " new articles!"
          });
        }
      })
      .catch(err => {
        res.json({ message: "Scrape done..." });
      });
  }
};