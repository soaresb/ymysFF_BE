const awilix = require("awilix");
const Helpers = require("./app/helpers");
const config = require("./app/config");
const logger = require("./app/utils/logger");
const MongoDb = require("./app/model/db");
const Settings = require("./app/model/settings");
const PlayerController = require("./app/controllers/player");
const TeamController = require("./app/controllers/team");
const LeagueController = require("./app/controllers/league");
const SeasonController = require("./app/controllers/season");

const TeamService = require("./app/service/team");
const SeasonService = require("./app/service/season");
const LeagueService = require("./app/service/league");
const PlayerService = require("./app/service/player");


const container = awilix.createContainer();
const { asValue, asClass, Lifetime } = awilix;

// #Config
container.register("config", asValue(config));

// #Utils
container.register("logger", asValue(logger));

container.register("DB", asValue(MongoDb));
container.register("Settings", asClass(Settings));

container.register("Helpers", asValue(Helpers));

container.register({ PlayerController: asClass(PlayerController) });
container.register({ TeamController: asClass(TeamController) });
container.register({ LeagueController: asClass(LeagueController) });
container.register({ SeasonController: asClass(SeasonController) });

container.register({ TeamService: asClass(TeamService) });
container.register({ SeasonService: asClass(SeasonService) });
container.register({ PlayerService: asClass(PlayerService) });
container.register({ LeagueService: asClass(LeagueService, { lifetime: Lifetime.SINGLETON }) });

module.exports = container;
