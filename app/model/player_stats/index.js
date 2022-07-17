const mongoose = require("mongoose");

const { Schema } = mongoose;

const PlayerStatsSchema = new Schema({
    espn_id: {
        type: Number,
        required: true,
    },
    week: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    fumbles: {
        type: Number
    },
    league_id: {
        type: Number
    },
    made_extra_points: {
        type: Number
    },
    made_field_goals_from_40_to_49: {
        type: Number
    },
    made_field_goals_from_50_plus: {
        type: Number
    },
    made_field_goals_from_under_40: {
        type: Number
    },
    missed_extra_points: {
        type: Number
    },
    missed_field_goals: {
        type: Number
    },
    projected_made_extra_points: {
        type: Number
    },
    projected_made_field_goals_from_40_to_49: {
        type: Number
    },
    projected_made_field_goals_from_50_plus: {
        type: Number
    },
    projected_made_field_goals_from_under_40: {
        type: Number
    },
    projected_missed_extra_points: {
        type: Number
    },
    projected_missed_field_goals: {
        type: Number
    },
    name: {
        type: String,
        required: true,
    },
    passing_2_point_conversions: {
        type: Number
    },
    passing_interceptions: {
        type: Number
    },
    passing_tds: {
        type: Number
    },
    passing_yards: {
        type: Number
    },
    projected_passing_2_point_conversions: {
        type: Number
    },
    projected_passing_interceptions: {
        type: Number
    },
    projected_passing_tds: {
        type: Number
    },
    projected_passing_yards: {
        type: Number
    },
    player_id: {
        type: Number
    },
    points: {
        type: Number,
        required: true
    },
    projected_points: {
        type: Number,
        required: true
    },
    receiving_2_point_conversions: {
        type: Number
    },
    receiving_receptions: {
        type: Number
    },
    receiving_targets: {
        type: Number
    },
    receiving_tds: {
        type: Number
    },
    receiving_yards: {
        type: Number
    },
    rushing_2_point_conversions: {
        type: Number
    },
    rushing_attempts: {
        type: Number
    },
    rushing_tds: {
        type: Number
    },
    rushing_yards: {
        type: Number
    },
    projected_receiving_2_point_conversions: {
        type: Number
    },
    projected_receiving_receptions: {
        type: Number
    },
    projected_receiving_targets: {
        type: Number
    },
    projected_receiving_tds: {
        type: Number
    },
    projected_receiving_yards: {
        type: Number
    },
    projected_rushing_2_point_conversions: {
        type: Number
    },
    projected_rushing_attempts: {
        type: Number
    },
    projected_rushing_tds: {
        type: Number
    },
    projected_rushing_yards: {
        type: Number
    },
    season_id: {
        type: Number
    },
    slot_position: {
        type: String,
        required: true
    },
    team_id: {
        type: Number,
        required: true
    },
    pro_team: {
        type: String
    },
    pro_opponent: {
        type: String
    }
}, { collection: "player_stats" });

if (!PlayerStatsSchema.options.toObject) PlayerStatsSchema.options.toObject = {};
PlayerStatsSchema.options.toObject.transform = function (doc, ret, options) {
    return ret;
};

module.exports = mongoose.model("PlayerStats", PlayerStatsSchema);
