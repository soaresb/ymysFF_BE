const { Router } = require("express");
const container = require("../../container");

const seasonController = container.cradle.SeasonController;

const apiRouter = Router();

apiRouter.get(
    "/seasons",
    (req, res, next) => { seasonController.getSeasons(req, res, next); }
);

module.exports = apiRouter;

