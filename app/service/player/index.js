const _ = require("lodash");
const logger = require("../../utils/logger");

module.exports = class PlayerService {
    constructor({ Helpers, DB, Settings }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.playerModel = DB.model("Player");
        this.playerStatsModel = DB.model("PlayerStats");
        this.teamModel = DB.model("Team");
        this.draftPickModel = DB.model("DraftPick");
        this.settings = Settings;
    }

    async getPlayerStats(playerId) {
        const playerStats = await this.playerStatsModel.find({ espn_id: playerId });
        const stats = [];
        if (playerStats) {
            for (const playerStat of playerStats) {
                const stat = playerStat.toObject();
                stat.team = await this.teamModel.findOne({"espn_team_id": stat.team_id, year: stat.year});
                stats.push(stat);
            }
            return stats;
        } else {
            return []
        }
    }

    async getPlayerDraftHistory(playerId) {
        const playerDraftHisory = await this.draftPickModel.find({ espn_id: playerId }).sort("year");
        const history = [];
        if (playerDraftHisory) {
            for (const draftHistory of playerDraftHisory) {
                const draftPick = draftHistory.toObject();
                draftPick.team = await this.teamModel.findOne({"espn_team_id": draftPick.ymys_team_id, year: draftPick.year});
                history.push(draftPick);
            }
            return history;
        } else {
            return []
        }
    }
    
};
