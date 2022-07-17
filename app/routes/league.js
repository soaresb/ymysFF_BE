const { Router } = require("express");
const container = require("../../container");

const teamController = container.cradle.TeamController;
const leagueController = container.cradle.LeagueController;

const apiRouter = Router();

apiRouter.get(
    "/league/standings",
    (req, res, next) => { teamController.getStandings(req, res, next); }
);

apiRouter.get(
    "/league/division/standings",
    (req, res, next) => { teamController.getStandingsWithDivisions(req, res, next); }
);

apiRouter.get(
    "/league/matchups",
    (req, res, next) => { teamController.getMatchups(req, res, next); }
);

apiRouter.get(
    "/league/info",
    (req, res, next) => { leagueController.getLeagueInfo(req, res, next); }
);

apiRouter.get(
    "/league/rankings",
    (req, res, next) => { leagueController.getLeagueRankings(req, res, next); }
);

apiRouter.post(
    "/league/rankings",
    (req, res, next) => { leagueController.postLeagueRankings(req, res, next); }
);

apiRouter.get(
    "/league/career-standings",
    (req, res, next) => { leagueController.getCareerStandings(req, res, next); }
);

apiRouter.get(
    "/league/draft",
    (req, res, next) => { leagueController.getDraft(req, res, next); }
);

module.exports = apiRouter;

