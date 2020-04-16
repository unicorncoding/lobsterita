const fetch = require("node-fetch");
const cheerio = require("cheerio");

const lobsters = () =>
  fetch("https://lobste.rs/u")
    .then((response) => response.text())
    .then((body) => cheerio.load(body))
    .then(($) => Array.from($(".tree a")).map((each) => $(each).attr("name")));

module.exports.lobsters = lobsters;
