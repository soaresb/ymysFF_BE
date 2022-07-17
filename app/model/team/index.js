const mongoose = require("mongoose");

const { Schema } = mongoose;

const TeamSchema = new Schema({
    espn_team_id: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    division_id: {
        type: Number,
        required: true
    },
    faab: {
        type: Number
    },
    logo_url: {
        type: String,
    },
    losses: {
        type: Number
    },
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    players: {
        type: Array
    },
    roster: {
        type: Array
    },
    schedule: {
        type: Array
    },
    standing: {
        type: Number
    },
    ties: {
        type: Number
    },
    wins: {
        type: Number
    },
}, { collection: "team" });

if (!TeamSchema.options.toObject) TeamSchema.options.toObject = {};
TeamSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("Team", TeamSchema);
