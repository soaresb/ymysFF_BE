const _ = require("lodash");
const logger = require("../utils/logger");
const mongoose = require('mongoose');

module.exports = class PlayerController {
    constructor({ Helpers, PlayerService, DB }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.playerService = PlayerService;
        this.playerModel = DB.model("Player");
    }

    async getPlayer(req, res, next) {
        try {
            const { playerId } = req.params;
            const player = await this.playerModel.findOne({ espn_id: playerId });
            if (player) {
                res.status(200).json(this.formatResponse(200, "Success", player.toObject()));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Player not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

    async getPlayerStats(req, res, next) {
        try {
            const { playerId } = req.params;
            const playerStats = await this.playerService.getPlayerStats(playerId);
            if (playerStats) {
                res.status(200).json(this.formatResponse(200, "Success", playerStats));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Player not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

    async getPlayerDraftHistory(req, res, next) {
        try {
            const { playerId } = req.params;
            const playerDraftHisory = await this.playerService.getPlayerDraftHistory(playerId);
            if (playerDraftHisory) {
                res.status(200).json(this.formatResponse(200, "Success", playerDraftHisory));
            } else {
                res.status(404).json(this.formatResponse(404, "Not found", [{ msg: "Player not found." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

};
