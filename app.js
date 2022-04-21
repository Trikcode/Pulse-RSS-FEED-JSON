const express = require("express");
let Parser = require("rss-parser");

let parser = new Parser({
  customFields: {
    item: [["media:content", "media:content", { keepArray: true }]],
  },
});
const app = express();

app.get("/", async function (req, res) {
  const feed = await parser.parseURL("https://www.pulse.com.gh/news/rs");

  const result = feed.items.map((item) => {
    return {
      title: item.title,
      image: item["media:content"][0].$.url,
    };
  });
  Promise.all(result)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
