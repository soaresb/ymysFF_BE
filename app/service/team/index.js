const _ = require("lodash");
const logger = require("../../utils/logger");

module.exports = class TeamService {
    constructor({ Helpers, DB, Settings }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.teamModel = DB.model("Team");
        this.matchupModel = DB.model("Matchup");
        this.playerModel = DB.model("Player");
        this.playerStatsModel = DB.model("PlayerStats");
        this.draftPickModel = DB.model("DraftPick");
        this.rankingModel = DB.model("Ranking");
        this.superlativeModel = DB.model("Superlative");
        this.settings = Settings;
        this.sortRosterByPosition = Helpers.roster.sortRosterByPosition;
        this.getMedian = Helpers.team.getMedian;
    }

    async getStandings(year) {
        const teams = await this.teamModel
            .find({ year })
            .sort("standing");
        return teams.map((team) => team.toObject());
    }

    async getStandingsWithDivisions(year, week) {
        let ranks = await this.rankingModel
            .find({ year, week })
            .sort("division_ranking");
        ranks = ranks.map((rank) => {
            return rank.toObject();
        });
        const groupedByDivision = _.groupBy(ranks, (rank) => {
            return rank.division_id;
        });
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
            .findOne({ espn_team_id: teamId });
        if (team) {
            return team.toObject();
        } else {
            return [];
        }
    }

    async getTeams(year) {
        const teams = await this.teamModel
            .find({ "seasons.year": year });
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
        let query = { post_elimination: { $ne: true } };
        if (opponent) {
            query["$or"] = [{ "away_team.id": teamId, "home_team.id": opponent }, { "away_team.id": teamId, "home_team.id": opponent }]
        } else { query["$or"] = [{ "away_team.id": teamId }, { "home_team.id": teamId }]; }
        const matchups = await this.matchupModel
            .find(query).sort({year: -1, week: -1});
        if (matchups) {
            return matchups.map((matchup) => { return matchup.toObject(); });
        } else {
            return [];
        }
    }

    getBestValuePick(picks) {
        let bestPick;
        let biggestDifference = -1000000;
        _.forEach(picks, (pick) => {
            const preRank = parseInt(pick.pre_rank.replace(/\D/g,''));
            const seasonRank = parseInt(pick.season_rank.replace(/\D/g,''));

            if ((preRank - seasonRank) >= biggestDifference) {
                bestPick = pick;
                biggestDifference = (preRank - seasonRank);
            }
        });
        return bestPick;
    }

    getPositionBreakdown(picks, position) {
        let differences = [];
        _.forEach(picks, (pick) => {
            const preRank = parseInt(pick.pre_rank.replace(/\D/g,''));
            const seasonRank = parseInt(pick.season_rank.replace(/\D/g,''));
            differences.push(preRank-seasonRank);
        });
        return { 
            position, 
            avgDraftEfficiency: _.round(((_.sum(differences))/differences.length), 2),
            medianDraftEfficiency: this.getMedian(differences)
        }
    }

    async getDraftPicksDetails(draftPicks) {
        const picksByPosition = _.groupBy(draftPicks, "position");
        const details = { valuePicks: [], positionBreakdown: [] };
        _.forOwn(picksByPosition, (picks, position) => {
            details.positionBreakdown.push(this.getPositionBreakdown(picks, position));
            details.valuePicks.push(this.getBestValuePick(picks));
        })
        details.valuePicks = this.sortRosterByPosition(details.valuePicks, "position")
        return details;
    }

    async getDraftPicksByTeam(teamId, details = false) {
        const draftPicks = await this.draftPickModel
            .find({ ymys_team_id: teamId });
        const team = await this.teamModel.findOne({espn_team_id: teamId}, ["owner", "name", "logo_id"]);
        const data = { draftPicks: [] };
        if (draftPicks) {
            for (const draftPick of draftPicks) {
                const pick = draftPick.toObject();
                pick.team = team;
                data.draftPicks.push(pick);
            }
            if (details) {
                data.details = await this.getDraftPicksDetails(data.draftPicks);
            }
            return data;
        } else {
            return [];
        }
    }

    async getSuperlatives(teamId) {
        const query = {}
        if (teamId) {
            query.ymys_team_id = parseInt(teamId, 10);
        }
        const superlatives = await this.superlativeModel
            .find(query).lean();

        return superlatives;
    }

};
