const _ = require("lodash");

module.exports = class Settings {
    constructor({ logger, DB }) {
        this.logger = logger;
        this.seasonModel = DB.model("Season");
    }

    async getYear() {
        const seasons = await this.seasonModel.find().sort({year: -1})
        return _.head(seasons).year;
    }


};
