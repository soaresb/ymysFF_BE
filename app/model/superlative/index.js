const mongoose = require("mongoose");

const { Schema } = mongoose;

const SuperlativeSchema = new Schema({
    superlative_name: {
        type: String,
        required: true,
    },
    superlative: {
        type: String,
        required: true,
    },
    ymys_team_id: {
        type: Number,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    value: {
        type: String
    },
}, { collection: "superlative" });

if (!SuperlativeSchema.options.toObject) SuperlativeSchema.options.toObject = {};
SuperlativeSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("Superlative", SuperlativeSchema);
