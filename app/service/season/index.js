const _ = require("lodash");
const logger = require("../../utils/logger");

module.exports = class LeagueService {
    constructor({ Helpers, DB, Settings }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.seasonModel = DB.model("Season");
        this.settings = Settings;
    }

    async getSeasons() {
        const seasons = await this.seasonModel
            .find({ }).sort("year");
        if (seasons) {
            return seasons.map((season) => {
                return season.toObject();
            });
        } else {
            return [];
        }
    }
    
};
