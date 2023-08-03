const _ = require("lodash");
const logger = require("../utils/logger");

module.exports = class TeamController {
    constructor({ Helpers, TeamService, Settings, LeagueService }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.teamService = TeamService,
        this.settings = Settings;
        this.leagueService = LeagueService;
    }

    async getStandings(req, res, next) {
        try {
            const { current_year } = this.leagueService.getLeague();
            const standings = await this.teamService.getStandings(current_year);
            if (standings) {
                res.status(200).json(this.formatResponse(200, "Success", standings));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Standings not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getStandingsWithDivisions(req, res, next) {
        try {
            const { current_year, current_week } = this.leagueService.getLeague();
            const standings = await this.teamService.getStandingsWithDivisions(current_year, current_week);
            if (standings) {
                res.status(200).json(this.formatResponse(200, "Success", standings));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Standings not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getMatchups(req, res, next) {
        try {
            const { current_year, current_week } = this.leagueService.getLeague();
            const matchups = await this.teamService.getMatchups(current_year, current_week);
            if (matchups) {
                res.status(200).json(this.formatResponse(200, "Success", matchups));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Matchups not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getRosterByTeamId(req, res, next) {
        try {
            const league = this.leagueService.getLeague();
            let year = req.query.year || league.current_year;
            year = parseInt(year)
            let week = req.query.week || league.current_week;
            week = parseInt(week)
            const teamId = parseInt(req.params.teamId);
            const roster = await this.teamService.getRosterByTeamId(teamId, week, year);
            if (roster) {
                res.status(200).json(this.formatResponse(200, "Success", roster));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Roster not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getTeamById(req, res, next) {
        try {
            const { current_year, current_week } = this.leagueService.getLeague();
            const teamId = parseInt(req.params.teamId);
            const team = await this.teamService.getTeamById(teamId, current_year, current_week);
            if (team) {
                res.status(200).json(this.formatResponse(200, "Success", team));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Team not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getTeams(req, res, next) {
        try {
            const { current_year } = this.leagueService.getLeague();
            const teams = await this.teamService.getTeams(current_year);
            if (teams) {
                res.status(200).json(this.formatResponse(200, "Success", teams));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Teams not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getMatchupsByTeam(req, res, next) {
        try {
            const teamId = parseInt(req.params.teamId);
            const opponent = req.query.opponent ? parseInt(req.query.opponent) : "";
            const record = await this.teamService.getMatchupsByTeam(teamId, opponent);
            if (record) {
                res.status(200).json(this.formatResponse(200, "Success", record));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Record not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getDraftPicksByTeam(req, res, next) {
        try {
            const teamId = parseInt(req.params.teamId);
            const { details } = req.query;
            const data = await this.teamService.getDraftPicksByTeam(teamId, details);
            if (data) {
                res.status(200).json(this.formatResponse(200, "Success", data));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Record not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

    async getSuperlatives(req, res, next) {
        try {
            const { teamId } = req.query
            const data = await this.teamService.getSuperlatives(teamId);
            if (data) {
                res.status(200).json(this.formatResponse(200, "Success", data));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Record not found." }]));
            }
            
            
        } catch (err) {
            next(err);
        }
    }

};
