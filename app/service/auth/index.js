const _ = require("lodash");
const logger = require("../../utils/logger");
const config = require("../../config");
const jwt = require('jsonwebtoken');

module.exports = class AuthService {
    constructor({ Helpers, Settings }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.settings = Settings;
    }

    async login(username, password) {
        if (username === config.get("YMYS_ADMIN_USERNAME") && password === config.get("YMYS_ADMIN_PASSWORD")) {
            const token = jwt.sign({ foo: 'bar' }, config.get("YMYS_JWT_SECRET"));
            return token
        }
        return null;
    }

    async checkToken(token) {
        try {
            const decoded = jwt.verify(token, config.get("YMYS_JWT_SECRET"));
            return true;
          } catch(err) {
            return false;
          }
    }
    
};
