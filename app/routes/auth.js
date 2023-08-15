const { Router } = require("express");
const container = require("../../container");

const authController = container.cradle.AuthController;

const apiRouter = Router();

apiRouter.post(
    "/login",
    (req, res, next) => { authController.login(req, res, next); }
);

apiRouter.get(
    "/auth/check-token",
    (req, res, next) => { authController.checkToken(req, res, next); }
);

module.exports = apiRouter;

