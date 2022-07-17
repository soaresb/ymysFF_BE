const _ = require("lodash");

module.exports = {
    sortRosterByPosition(roster) {
        const order = {
            "QB": 1,
            "RB": 2,
            "WR": 3,
            "TE": 4,
            "RB/WR/TE": 5,
            "K": 6,
            "DP": 7,
            "D/ST": 8,
            "BE": 9,
            "IR": 10
        }
        return _.sortBy(roster, (player) => {
            return order[player.slot_position];        
        })
    }
}