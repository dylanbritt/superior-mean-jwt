// app/controllers/user.js

module.exports = function (app) {

    var express = require('express');
    var router = express.Router();
    var jwt = require('jsonwebtoken');

    // models ======================================================
    var User = require('../models/user');

    /* testing */
    router.get('/createTestUser', function (req, res) {

        // create a sample user
        var user = new User({
            name: 'Test User',
            password: 'password',
            admin: true
        });

        // save the sample user
        user.save(function (err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });

    // route to authenticate a user (POST http://localhost:8080/user/authenticate)
    router.post('/authenticate', function (req, res) {

        // find the user
        User.findOne({
            name: req.body.username
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is correct
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                        //expiresInMinutes: 1440 // expires in 24 hours /* deprecated */
                        expiresIn: '1440m' // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });

    // route middleware to verify a token
    router.use(function (req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            var decoded = jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {

                    // quick test
                    return res.json({ success: true, message: decoded._doc });

                    // if everything is good, save to request for use in other routes
                    //req.decoded = decoded;
                    //next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    // route to show a random message (GET http://localhost:8080/users/)
    router.get('/', function (req, res) {
        res.json({ message: 'Secure access.' });
    });

    return router;

};