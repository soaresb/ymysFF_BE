const _ = require("lodash")
const nconf = require("nconf");
const { isBoolean, toBoolean } = require("../helpers/boolean");

const REGISTERED_KEYS = [
    "PORT",
    "ALLOWED_ORIGINS",
    "MONGODB_CONNECTION_STRING",
    "ID",
    "SECRET"
];

const config = nconf
    .file(`${__dirname}/local.config.json`)
    .argv()
    .env(REGISTERED_KEYS)
    .defaults(require("./default.config.json"));

config.required(REGISTERED_KEYS);
config.set("NODE_ENV", config.get("APP_ENV"));

_.forEach(config.get(), (value, key) => {
    if (isBoolean(value)) {
        config.set(key, toBoolean(value));
    } else if (_.includes([
        "PORT",
        "REDIS__PORT",
        "PARTNER_FETCH_INTERVAL",
    ], key)) {
        config.set(key, parseInt(value, 10));
    }
});

module.exports = config;
