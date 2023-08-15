const _ = require("lodash");
const logger = require("../utils/logger");

module.exports = class AuthController {
    constructor({ Helpers, AuthService }) {
        this.formatResponse = Helpers.http.formatResponse;
        this.authService = AuthService;
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const loginResponse = await this.authService.login(username, password);
            if (loginResponse) {
                res.status(200).json(this.formatResponse(200, "Success", { token: loginResponse }));
            } else {
                res.status(404).json(this.formatResponse(401, "Unauthorized", [{ msg: "Unauthorized." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

    async checkToken(req, res, next) {
        try {
            const { token } = req.query;
            const response = await this.authService.checkToken(token);
            if (response) {
                res.status(200).json(this.formatResponse(200, "Success", { allowed: true }));
            } else {
                res.status(404).json(this.formatResponse(401, "Unauthorized", [{ msg: "Unauthorized." }]));
            }
            
        } catch (err) {
            next(err);
        }
    }

};
