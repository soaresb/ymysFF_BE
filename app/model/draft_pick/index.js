const mongoose = require("mongoose");

const { Schema } = mongoose;

const DraftPickSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    espn_id: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    pick: {
        type: Number,
        required: true,
    },
    pre_rank: {
        type: String,
        required: true,
    },
    round: {
        type: Number,
        required: true,
    },
    season_rank: {
        type: String,
        required: true,
    },
    total_pick: {
        type: Number,
        required: true,
    },
    ymys_team_id: [{
        type: Number,
        required: true,
    }],
    
}, { collection: "draft_pick" });

// DraftPickSchema.virtual("ymys_team", {
//     ref: "Team",
//     localField: "ymys_team_id",
//     foreignField: "espn_team_id"
// });

if (!DraftPickSchema.options.toObject) DraftPickSchema.options.toObject = {};
DraftPickSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("DraftPick", DraftPickSchema);
