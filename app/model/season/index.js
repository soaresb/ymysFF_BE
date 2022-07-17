const mongoose = require("mongoose");

const { Schema } = mongoose;

const SeasonSchema = new Schema({
    espn_team_id: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    current_nfl_week: {
        type: Number,
        required: true,
    },
    current_nfl_scoring_period: {
        type: Number,
        required: true,
    },
    current_week: {
        type: Number,
        required: true,
    },
    draft: {
        type: Array
    },
    first_scoring_period: {
        type: Number
    },
    league_id: {
        type: Number,
        required: true,
    },
    draft: {
        type: Array
    },
    weeks: {
        type: Array
    },
    ranking_weeks: {
        type: Array
    }
}, { collection: "season" });

if (!SeasonSchema.options.toObject) SeasonSchema.options.toObject = {};
SeasonSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("Season", SeasonSchema);
