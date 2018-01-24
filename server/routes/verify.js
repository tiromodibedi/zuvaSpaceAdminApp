/**
 * import dependencies
 */
var User =  require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');

/**
 * Send a token to an authenticated user
 * The token will expire is 3600 seconds .i.e 1 hour
 */
exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    })
}

/**
 * Verify an existing user i.e check if their token is valid
 */
exports.verifyOrdinaryUser = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error("You are not authenticated");
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded; // save token to request (req.decoded)
                next()
            }
        })
    } else {
        /** if there's no token provided **/
        var err = new Error("No token provided");
        err.status = 403;
        return next(err);
    }
};

/**
 * Verify if user has administrator privileges via verifyAdmin() fnc
 */
exports.verifyAdmin = function (req, res, next) {
    if (req.decoded.admin) {
        next();
    } else {
        var err = new Error("You are not authorised to perform this operation");
        err.status = 403;
        return next(err);
    }
}