const cheerio = require("cheerio");
const axios = require("axios");

let scrape = function(url, cb) {
  if (url == "https://www.theverge.com/") {
    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get(url).then(function(response) {
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      var articles = [];

      // Select each element in the HTML body from which you want information.
      // NOTE: Cheerio selectors function similarly to jQuery's selectors,
      // but be sure to visit the package's npm page to see how it works
      $(".c-entry-box--compact__title").each(function(i, element) {
        // console.log(element);
        var title = $(element)
          .children()
          .text();
        var link = $(element)
          .find("a")
          .attr("href");

        // Save these results in an object that we'll push into the results array we defined earlier
        articles.push({
          title: title,
          link: link
        });
      });

      // Log the results once you've looped through each of the elements found with cheerio
      console.log(articles);

      // send back the articles via a callback
      cb(articles);
    });
  }

};

// Export the function for the app to use
module.exports = scrape;
