var express = require('express'),
    app = express(),
    port = process.env.PORT || 9000,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    dotenv = require('dotenv');

dotenv.load();

var configDB = require('./config/database');


mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));

    app.set('view engine', 'ejs');

    app.use(express.session({ secret: 'thissecretsuckschangeit' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
});

require('./app/routes')(app, passport);

app.listen(port);
console.log('Come see the magic on port ' + port);
