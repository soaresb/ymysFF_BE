const _ = require("lodash")

module.exports = {
    formatResponse(code, message, data) {
        return {
            meta: {
                code: `${code}`,
                message,
            },
            results: data || {},
        };
    },
    getIpAddress(req) {
        const ip_address = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        return _.trim(_.last(ip_address.split(",")));
    }
};
