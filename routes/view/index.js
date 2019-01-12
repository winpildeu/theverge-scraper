const router = require("express").Router();
const db = require("../../models");

// This route takes you to the homepage
router.get("/", (req, res) => {
  // Find all of the non-saved articles, sort them, and send that obj to the home view
  db.Headline.find({ saved: false })
    .sort({ date: -1 })
    .then(dbArticles => {
      res.render("home", { articles: dbArticles });
    });
});

// This route shows all of the saved articles
router.get("/saved", (req, res) => {
  db.Headline.find({ saved: true })
    .sort({ date: -1 })
    .then(dbArticles => {
      res.render("saved", { articles: dbArticles });
    });
});

module.exports = router;
