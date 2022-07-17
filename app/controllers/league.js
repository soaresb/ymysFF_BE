const _ = require("lodash");
const logger = require("../utils/logger");

module.exports = class LeagueController {
    constructor({ Helpers, DB, LeagueService }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.leagueModel = DB.model("League")
        this.leagueService = LeagueService
    }

    async getLeagueInfo(req, res, next) {
        try {
            const info = this.leagueService.getLeagueInfo()
            if (x) {
                res.status(200).json(this.formatResponse(200, "Success", {}));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "League not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

    async getLeagueRankings(req, res, next) {
        try {
            const league = this.leagueService.getLeague();
            let year = req.query.year || league.current_year;
            year = parseInt(year)
            let week = req.query.week || league.current_week;
            week = parseInt(week)
            const rankings = await this.leagueService.getLeagueRankings(week, year);
            if (rankings) {
                res.status(200).json(this.formatResponse(200, "Success", rankings));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Rankings not found." }]));
            }
        } catch (err) {
            next(err);
        }
    }

    async postLeagueRankings(req, res, next) {
        const { rankings } = req.body;
        try {
            const postedRankings = await this.leagueService.postLeagueRankings(rankings);
            if (postedRankings) {
                res.status(200).json(this.formatResponse(200, "Success", postedRankings));
            } else {
                res.status(404).json(this.formatResponse(400, "Error adding rankings.", [{ msg: "Error adding rankings." }]));
            }
        } catch (err) {
            next(err);
        }
    }

    async getCareerStandings(req, res, next) {
        try {
            const { year } = req.query;
            const standings = await this.leagueService.getCareerStandings(year)
            if (standings) {
                res.status(200).json(this.formatResponse(200, "Success", standings));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "League not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

    async getDraft(req, res, next) {
        try {
            const league = this.leagueService.getLeague();
            let year = req.query.year || league.current_year;
            year = parseInt(year);
            const draft = await this.leagueService.getDraft(year)
            if (draft) {
                res.status(200).json(this.formatResponse(200, "Success", draft));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Draft not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

};
