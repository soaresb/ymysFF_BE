const mongoose = require("mongoose");

const { Schema } = mongoose;

const RankingSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    week: {
        type: Number,
        required: true
    },
    ranking: {
        type: Number,
        required: true
    },
    espn_team_id: {
        type: Number,
        required: true,
    },
    team_name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    
}, { collection: "ranking" });

if (!RankingSchema.options.toObject) RankingSchema.options.toObject = {};
RankingSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("Ranking", RankingSchema);
