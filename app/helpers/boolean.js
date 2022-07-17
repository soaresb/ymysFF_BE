const _ = require("lodash");

const BOOL_VALUES = [true, false, "true", "false", 1, 0, "1", "0", "yes", "no"];
const isBoolean = (value) => {
    const lcValue = _.isString(value) ? _.lowerCase(value) : value;
    return _.some(BOOL_VALUES, v => v === lcValue);
};
const TRUE_VALUES = [true, "true", 1, "1", "yes"];
const toBoolean = (value) => {
    const lcValue = _.isString(value) ? _.lowerCase(value) : value;
    return _.some(TRUE_VALUES, v => v === lcValue);
};

module.exports.isBoolean = isBoolean;
module.exports.toBoolean = toBoolean;