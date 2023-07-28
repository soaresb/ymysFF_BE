const _ = require("lodash");
const logger = require("../../utils/logger");
const AWS = require('aws-sdk');
const fs = require('fs');
const Jimp = require("jimp");
const config = require("../../config");

module.exports = class LeagueService {
    constructor({ TeamService, Helpers, DB, Settings }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.leagueModel = DB.model("League");
        this.teamModel = DB.model("Team");
        this.rankingsModel = DB.model("Ranking");
        this.matchupModel = DB.model("Matchup");
        this.draftPickModel = DB.model("DraftPick");
        this.powerRankingModel = DB.model("PowerRanking");
        this.teamService = TeamService
        this.settings = Settings;
        this.league = null;
    }

    async init() {
        let league = await this.leagueModel
            .find({ });
        league = _.head(league).toObject()
        this.league = league;
    }

    async getLeagueInfo() {
        const powerRankings = await this.getLeaguePowerRankings();
        return {
            powerRankings,
            ...this.league
        };
    }

    getLeague() {
        return this.league;
    }

    async getLeagueRankings(week, year) {
        const rankings = await this.rankingsModel.find({ week, year }).sort({ranking: 1});
        if (rankings) {
            return rankings.map((ranking) => ranking.toObject());
        }
        return { };
    }

    async postLeagueRanking(ranking) {
        const response = await this.rankingsModel.create(ranking);
        return response;
    }
    
    async postLeagueRankings(rankings) {
        const promises = [];
        for (const ranking of rankings) {
            const result = await this.postLeagueRanking(ranking);
            console.log(result);
        }
        return { };
    }

    addToObject(obj, field, value) {
        if (_.get(obj, field)) {
            _.set(obj, field, (_.get(obj, field)) + 1);
        } else {
            _.set(obj, field, value);
        }
    }

    async getCareerStandings(year) {
        const standings = {};
        let matchups = [];
        if (year) {
            matchups = await this.matchupModel.find({ year: parseInt(year) });
        } else {
            matchups = await this.matchupModel.find({ post_elimination: { $ne: true } });
        }
        if (matchups) {
            _.forEach(matchups, (matchup) => {
               if (!_.isNull(matchup.away_team) && _.has(standings, matchup.away_team.id)) {
                   if (matchup.away_team.id === parseInt(matchup.winner)) {
                        this.addToObject(standings, `${matchup.away_team.id}.wins`, 1);
                   } else {
                        this.addToObject(standings, `${matchup.away_team.id}.losses`, 1);
                   }
               } else {
                    if (_.isNull(matchup.away_team)) {
                        return;
                    }
                    standings[matchup.away_team.id] = {};
                    if (matchup.away_team.id === parseInt(matchup.winner)) {
                        this.addToObject(standings, `${matchup.away_team.id}.wins`, 1);
                    } else {
                        this.addToObject(standings, `${matchup.away_team.id}.losses`, 1);
                    }
               }
               if (!_.isNull(matchup.home_team) && _.has(standings, matchup.home_team.id)) {
                    if (matchup.home_team.id === parseInt(matchup.winner)) {
                        this.addToObject(standings, `${matchup.home_team.id}.wins`, 1);
                    } else {
                        this.addToObject(standings, `${matchup.home_team.id}.losses`, 1);
                    }
                } else {
                    standings[matchup.home_team.id] = {};
                    if (matchup.home_team.id === parseInt(matchup.winner)) {
                        this.addToObject(standings, `${matchup.home_team.id}.wins`, 1);
                    } else {
                        this.addToObject(standings, `${matchup.home_team.id}.losses`, 1);
                    }
                }
            });
        }
        const standingsWithTeam = []
        for (const espn_team_id of Object.keys(standings)) {
            const standing = standings[espn_team_id];
            const team = await this.teamModel.findOne({ espn_team_id })
            standingsWithTeam.push({ team, standing })
        }
        return standingsWithTeam;
    }

    async getDraft(year) {
        const draftPicks = await this.draftPickModel.find({ year }).sort("total_pick")
        if (draftPicks) {
            const picksWithTeam = [];
            for (const draftPick of draftPicks) {
                const pick = draftPick.toObject();
                const team = await this.teamModel.findOne({espn_team_id: draftPick.ymys_team_id});
                pick.team = team;
                picksWithTeam.push(pick);
            }
            return picksWithTeam;
        }
        return { };
    }

    async postLeaguePowerRanking(body, week, year) {
        const ranking_article = await this.powerRankingModel.findOneAndUpdate(
            { week, year },
            { $set: { body, week, year } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        return ranking_article;
    }

    async getLeaguePowerRanking(week, year) {
        const ranking_article = await this.powerRankingModel.findOne(
            { week, year }
        )
        return ranking_article.toObject();
    }

    async getLeaguePowerRankings() {
        let powerRankings = await this.powerRankingModel.find(
            {  },
            ["year", "week"]
        );
        powerRankings = _.sortBy(powerRankings, ["year", "week"])
        return powerRankings.map((powerRanking) => powerRanking.toObject());
    }

    async uploadImage(files) {
        const { image }  = files;
        const BUCKET_NAME = 'ymys';
        const s3 = new AWS.S3({
            accessKeyId: config.get("ID"),
            secretAccessKey: config.get("SECRET")
        });
        const j = await Jimp.read(image.data);
        j.resize(Jimp.AUTO, 900);
        const buffer = await j.getBufferAsync(Jimp.AUTO);

        const params = {
            Bucket: BUCKET_NAME,
            Key: `images/${image.name}`, // File name you want to save as in S3
            Body: buffer
        };

        const resp = await s3.upload(params).promise()
        if (resp) {
            return resp.Location;
        }
    }
};
