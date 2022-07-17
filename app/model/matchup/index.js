const mongoose = require("mongoose");

const { Schema } = mongoose;

const MatchupSchema = new Schema({
    week: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    away_score: {
        type: Number,
        required: true,
    },
    away_team: {
        type: Object
    },
    espn_matchup_id: {
        type: String,
        required: true
    },
    home_score: {
        type: Number,
        required: true,
    },
    home_team: {
        type: Object
    },
    matchup_period_id: {
        type: String
    },
    playoff_tier_type: {
        type: String
    },
    winner: {
        type: String,
        required: true
    }
}, { collection: "matchup" });

if (!MatchupSchema.options.toObject) MatchupSchema.options.toObject = {};
MatchupSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("Matchup", MatchupSchema);
