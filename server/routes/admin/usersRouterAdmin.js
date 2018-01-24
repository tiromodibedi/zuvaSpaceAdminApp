/**
 * import dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../../models/userModel');
var Verify = require('../verify');

/**
 * express router with body-parser for processing json data
 */
var userRouter = express.Router();
userRouter.use(bodyParser.json());

/**
 * process Routes to "...host/users"
 */
userRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    User.find(req.query, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    })
});
/*
userRouter.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, '/:ID', function (req, res, next) {
    User.findById(req.params.ID, function (err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    })
})
*/

/**
 * Register a new User
 * POST Method
 */
userRouter.post('/register', function (req, res, next) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone
    }), req.body.password, function (err, user) {
        if (err) {
            return res.status(500).json({ err: err });
        }
        if (req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        user.save(function (err, user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({ status: "Registration Succesful" });
            });
        });
    });
});

/**
 * LOGIN as an existing user
 * use POST method
 */
userRouter.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, data) {
        /** if error is not null i.e there is an error **/
        if (err) {
            return next(err);
        }
        /** if user is not null but provided information is wrong **/
        if (!user) {
            return res.status(401).json({
                err: data
            })
        }
        /** then login **/
        req.login(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: "could not log in user"
                })
            }
            /* if login was successful */
            console.log("User in users: ", user);
            var token = Verify.getToken({
                "username": user.username,
                "_id": user._id,
                "admin": user.admin
            }); // generate token
            res.status(200).json({
                status: "Login successful",
                success: true,
                token: token
            })
        })
    })(req, res, next)
})

/**
 * LOGOUT user
 * method GET
 */
userRouter.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: "Bye!"
    })
})

module.exports = userRouter;
