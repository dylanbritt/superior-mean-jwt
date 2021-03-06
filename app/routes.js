// app/routes.js

module.exports = function (app) {
    
    // server routes ===============================================
    // handle things like api calls
    // authentication routes
    var users = require('./controllers/users')(app);
    app.use('/users', users);

    // frontend routes =============================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });
}