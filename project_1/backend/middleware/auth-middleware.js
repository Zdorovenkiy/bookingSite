const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error("User unauthorized");
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            throw new Error("User unauthorized");
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            throw new Error("User unauthorized");
        }

        req.user = userData;
        next();
    } catch (e) {
        console.log(e);
    }
};