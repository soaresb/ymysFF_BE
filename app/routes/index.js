const { Router } = require("express");
const playerRoutes = require("./player");
const leagueRoutes = require("./league");
const teamRoutes = require("./team");
const seasonRoutes = require("./season");
const authRoutes = require("./auth");


const apiRouter = Router();

apiRouter.use(playerRoutes);
apiRouter.use(leagueRoutes);
apiRouter.use(teamRoutes);
apiRouter.use(seasonRoutes);
apiRouter.use(authRoutes);

apiRouter.use((req, res) => {
    res.status(404).send("Not Found.");
});

module.exports = apiRouter;
