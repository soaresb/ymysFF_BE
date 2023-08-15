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

apiRouter.get(
    "/league/draft/years",
    (req, res, next) => { leagueController.getDraftYears(req, res, next); }
);

apiRouter.post(
    "/league/power-ranking",
    (req, res, next) => { leagueController.postLeaguePowerRanking(req, res, next); }
);

apiRouter.get(
    "/league/power-ranking",
    (req, res, next) => { leagueController.getLeaguePowerRanking(req, res, next); }
);

apiRouter.get(
    "/league/power-rankings",
    (req, res, next) => { leagueController.getLeaguePowerRankings(req, res, next); }
);

apiRouter.post(
    "/league/upload-image",
    (req, res, next) => { leagueController.uploadImage(req, res, next); }
);


module.exports = apiRouter;

