const mongoose = require("mongoose");
const config = require("../config");
require("./player");
require("./team");
require("./league");
require("./matchup");
require("./season");
require("./player_stats");
require("./ranking");
require("./draft_pick");
require("./ranking_article");

mongoose.Promise = Promise;

mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
  });

mongoose.connect(
    config.get("MONGODB_CONNECTION_STRING"),
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
);

module.exports = mongoose;
