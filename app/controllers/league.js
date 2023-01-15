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
            if (info) {
                res.status(200).json(this.formatResponse(200, "Success", info));
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

    async postLeaguePowerRanking(req, res, next) {
        const { body, week, year } = req.body;
        try {
            const success = await this.leagueService.postLeaguePowerRanking(body, week, year);
            if (success) {
                res.status(200).json(this.formatResponse(200, "Success", success));
            } else {
                res.status(404).json(this.formatResponse(400, "Error adding ranking article.", [{ msg: "Error adding ranking article." }]));
            }
        } catch (err) {
            next(err);
        }
    }

    async getLeaguePowerRanking(req, res, next) {
        const { week, year } = req.query;
        try {
            const powerRanking = await this.leagueService.getLeaguePowerRanking(week, year);
            if (powerRanking) {
                res.status(200).json(this.formatResponse(200, "Success", powerRanking));
            } else {
                res.status(404).json(this.formatResponse(400, "Error adding ranking article.", [{ msg: "Error adding ranking article." }]));
            }
        } catch (err) {
            next(err);
        }
    }

    async getLeaguePowerRankings(req, res, next) {
        try {
            const powerRankings = await this.leagueService.getLeaguePowerRankings();
            if (powerRankings) {
                res.status(200).json(this.formatResponse(200, "Success", powerRankings));
            } else {
                res.status(404).json(this.formatResponse(400, "Error adding ranking article.", [{ msg: "Error adding ranking article." }]));
            }
        } catch (err) {
            next(err);
        }
    }

};
