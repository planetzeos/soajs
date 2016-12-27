/**
 *
 * @param param
 * @returns {Function}
 */
module.exports = function (param) {
    if (param.awareness) {
        if (!process.env.SOAJS_DEPLOY_HA) {
            driver = require("./custom.js");
            driver.init(param);
        }
        else {
            driver = require("./ha.js");
            driver.init(param);
        }
    }
    return function (req, res, next) {
        if (param.awareness) {
            req.soajs.awarenessEnv = {
                "getHost": driver.getServiceHost
            };
        }
        next();
    };
};