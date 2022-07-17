const mongoose = require("mongoose");

const { Schema } = mongoose;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    pro_team: {
        type: String,
        required: true,
    },
    espn_id: {
        type: Number,
        required: true,
    },
    current_team: {
        type: Number
    }
}, { collection: "player" });

if (!PlayerSchema.options.toObject) PlayerSchema.options.toObject = {};
PlayerSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("Player", PlayerSchema);
