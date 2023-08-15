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
            const info = await this.leagueService.getLeagueInfo()
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
            let { teamId } = req.query;
            teamId = parseInt(teamId, 10)
            const standings = await this.leagueService.getCareerStandings(teamId)
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

    async getDraftYears(req, res, next) {
        try {
            const years = await this.leagueService.getDraftYears();
            if (years) {
                res.status(200).json(this.formatResponse(200, "Success", years));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Drafts not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

    async postLeaguePowerRanking(req, res, next) {
        const { body, week, year, hidden } = req.body;
        const parsedWeek = parseInt(week);
        const parsedYear = parseInt(year);
        try {
            const success = await this.leagueService.postLeaguePowerRanking(body, parsedWeek, parsedYear, hidden);
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
        const parsedWeek = parseInt(week);
        const parsedYear = parseInt(year);
        try {
            const powerRanking = await this.leagueService.getLeaguePowerRanking(parsedWeek, parsedYear);
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

    async uploadImage(req, res, next) {
        try {
            const { files } = req;
            const url = await this.leagueService.uploadImage(files);
            if (url) {
                res.status(200).json(this.formatResponse(200, "Success", { url }));
            } else {
                res.status(404).json(this.formatResponse(400, "Error uploading image.", [{ msg: "Error uploading image." }]));
            }
        } catch (err) {
            next(err);
        }
    }

};
