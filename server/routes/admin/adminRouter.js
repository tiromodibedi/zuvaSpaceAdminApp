/**
 * import dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('../verify');
var Classifieds = require('../../models/classifiedModel'); // import the schema

/**
 * Create an express router and apply the json body-parser middleware
 */
var adminRouter = express.Router();
adminRouter.use(bodyParser.json());

/**
 * Process Routes to "...host/classifieds/  "
 * GET, POST, DELETE methods
 */
adminRouter.route('/')
    .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Classifieds.find(req.query)
            .populate('postedBy')
            .exec(function (err, classified) {
                if (err) {
                    return next(err);
                }
                res.json(classified);
            });
    })
;

module.exports = adminRouter;