const mongoose = require("mongoose");

const { Schema } = mongoose;

const TeamSchema = new Schema({
    espn_team_id: {
        type: Number,
        required: true,
    },
    logo_url: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    seasons: {
        type: Array,
        required: true
    }
}, { collection: "team" });

if (!TeamSchema.options.toObject) TeamSchema.options.toObject = {};
TeamSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("Team", TeamSchema);
