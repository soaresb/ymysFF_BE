const _ = require("lodash");
const logger = require("../../utils/logger");

module.exports = class TeamService {
    constructor({ Helpers, DB, Settings }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.teamModel = DB.model("Team");
        this.matchupModel = DB.model("Matchup");
        this.playerModel = DB.model("Player");
        this.playerStatsModel = DB.model("PlayerStats");
        this.settings = Settings;
        this.sortRosterByPosition = Helpers.roster.sortRosterByPosition;
    }

    async getStandings(year) {
        const teams = await this.teamModel
            .find({ year })
            .sort("standing");
        return teams.map((team) => team.toObject());
    }

    async getStandingsWithDivisions(year) {
        const teams = await this.teamModel
            .find({ year })
            .sort("standing");
        const groupedByDivision = _.groupBy(teams, (team) => team.division_id);
        return groupedByDivision;
    }

    async getMatchups(year, week) {
        const matchups = await this.matchupModel
            .find({ year, week })
        if (matchups) {
            return matchups.map((matchup) => matchup.toObject());
        } else {
            return [];
        }
    }

    async getRosterByTeamId(teamId, week, year) {
        let players = await this.playerStatsModel
            .find({ $and: [ { team_id: teamId }, { week }, { year }]})
        if (players) {
            players = players.map((players) => players.toObject());
            return this.sortRosterByPosition(players)
        } else {
            return [];
        }
    }

    async getTeamById(teamId, year, week) {
        const team = await this.teamModel
            .findOne({ espn_team_id: teamId, year });
        if (team) {
            return team.toObject();
        } else {
            return [];
        }
    }

    async getTeams(year) {
        const teams = await this.teamModel
            .find({ year });
        if (teams) {
            return teams.map((team) => {
                return { name: team.name, _id: team._id, espn_team_id: team.espn_team_id };
            });
        } else {
            return [];
        }
    }

    groupMatchupsByOpponent(teamId, matchups) {
        const groupedByOpponent = {};
        _.forEach(matchups, (matchup) => {
            if (matchup.away_team && matchup.away_team.id === teamId) {
                if (matchup.home_team) {
                    if (matchup.home_team && _.has(groupedByOpponent, matchup.home_team.id)) {
                        groupedByOpponent[matchup.home_team.id].push(matchup);
                    } else { groupedByOpponent[matchup.home_team.id] = [matchup]; }
                    }
            }
            if (matchup.home_team && matchup.home_team.id === teamId) {
                if (matchup.away_team) {
                    if (_.has(groupedByOpponent, matchup.away_team.id)) {
                        groupedByOpponent[matchup.away_team.id].push(matchup);
                    } else { groupedByOpponent[matchup.away_team.id] = [matchup]; }
                    }
            }
        });
        return groupedByOpponent;
    }

    async getMatchupsByTeam(teamId, opponent=null) {
        let query = {};
        if (opponent) {
            query = {
                $or: [{ "away_team.id": teamId, "home_team.id": opponent }, { "away_team.id": teamId, "home_team.id": opponent }]
            }
        } else { query = { $or: [{ "away_team.id": teamId }, { "home_team.id": teamId }] }; }
        const matchups = await this.matchupModel
            .find(query);
        if (matchups) {
            return matchups.map((matchup) => { return matchup.toObject(); });
        } else {
            return [];
        }
    }

};
