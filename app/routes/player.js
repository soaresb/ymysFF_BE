const { Router } = require("express");
const container = require("../../container");

const playerController = container.cradle.PlayerController;

const apiRouter = Router();

apiRouter.get(
    "/player/:playerId",
    (req, res, next) => { playerController.getPlayer(req, res, next); }
);

apiRouter.get(
    "/player/:playerId/stats",
    (req, res, next) => { playerController.getPlayerStats(req, res, next); }
);

apiRouter.get(
    "/player/:playerId/draft-history",
    (req, res, next) => { playerController.getPlayerDraftHistory(req, res, next); }
);

module.exports = apiRouter;
