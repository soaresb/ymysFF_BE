const container = require("../container");

module.exports = async function initApp() {
    const { LeagueService } = container.cradle;
    await LeagueService.init();
};
