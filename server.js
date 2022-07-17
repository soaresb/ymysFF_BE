const app = require("./app");
const config = require("./app/config");
const logger = require("./app/utils/logger");
const init = require("./app/init");

(async () => {

    await init();

    const server = app.listen(config.get("PORT"), async () => {
        logger.info(`APP started on port ${config.get("PORT")}`);
    });

    process.on("SIGINT", () => {
        server.close(() => {
            process.exit(0);
        });
    });
    process.on("SIGTERM", () => {
        server.close(() => {
            process.exit(0);
        });
    });
})();

process.on("uncaughtException", (err) => {
    logger.error(err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    logger.error(err);
    process.exit(1);
});
