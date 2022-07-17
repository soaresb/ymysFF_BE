const mongoose = require("mongoose");

const { Schema } = mongoose;

const LeagueSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    current_year: {
        type: Number,
        required: true,
    },
    current_week: {
        type: Number,
        required: true,
    }
}, { collection: "league" });

if (!LeagueSchema.options.toObject) LeagueSchema.options.toObject = {};
LeagueSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("League", LeagueSchema);
