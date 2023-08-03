const { Router } = require("express");
const container = require("../../container");

const teamController = container.cradle.TeamController;

const apiRouter = Router();

apiRouter.get(
    "/team/:teamId/roster",
    (req, res, next) => { teamController.getRosterByTeamId(req, res, next); }
);

apiRouter.get(
    "/team/superlatives",
    (req, res, next) => { teamController.getSuperlatives(req, res, next); }
);

apiRouter.get(
    "/team/:teamId",
    (req, res, next) => { teamController.getTeamById(req, res, next); }
);

apiRouter.get(
    "/teams",
    (req, res, next) => { teamController.getTeams(req, res, next); }
);

apiRouter.get(
    "/team/:teamId/matchups",
    (req, res, next) => { teamController.getMatchupsByTeam(req, res, next); }
);

apiRouter.get(
    "/team/:teamId/draftpicks",
    (req, res, next) => { teamController.getDraftPicksByTeam(req, res, next); }
);

module.exports = apiRouter;

