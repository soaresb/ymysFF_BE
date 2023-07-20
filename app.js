const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const { cradle: { config, logger, Helpers: { http: { formatResponse } }, } } = require("./container");

const routes = require("./app/routes");

const app = express();

const path = __dirname + "/dist";
app.use(express.static(path));

app.disable("x-powered-by");

// #PARSERS
app.use(fileupload());
app.use(bodyParser.json({ limit: "20mb", strict: true }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(formidableMiddleware());

// #CORS
app.use((req, res, next) => {
    const allowedOrigins = config.get("ALLOWED_ORIGINS");
    const allowedOriginsArray = allowedOrigins.split(",");
    const { origin } = req.headers;
    if (allowedOrigins === "*") {
        res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
    } else if (allowedOriginsArray.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");

    return next();
});

// #ROUTES
app.get(
    "/",
    (req, res, next) => { res.status(200).send("MO"); }
);

app.use(routes);

app.use(function expressErrorHandler(err, req, res, next) {
    // TODO add isOerational check and fail if not operational
    logger.error(err);
    res.status(500).json(formatResponse(500, "Internal server error.", [{ msg: "Internal server error" }]));
});

module.exports = app;
