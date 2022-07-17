const _ = require("lodash");
const logger = require("../utils/logger");

module.exports = class SeasonController {
    constructor({ Helpers, SeasonService }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.seasonService = SeasonService
    }

    async getSeasons(req, res, next) {
        try {
            const seasons = await this.seasonService.getSeasons()
            if (seasons) {
                res.status(200).json(this.formatResponse(200, "Success", {seasons}));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Seasons not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

};
