const mongoose = require("mongoose");

const { Schema } = mongoose;

const PowerRankingSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    week: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean
    }
    
}, { collection: "ranking_article" });

if (!PowerRankingSchema.options.toObject) PowerRankingSchema.options.toObject = {};
PowerRankingSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("PowerRanking", PowerRankingSchema);
