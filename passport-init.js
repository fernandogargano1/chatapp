const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash');

const users = require('./data/users.json');

passport.use(new LocalStrategy(function(username, password, done) {
    const user = _.find(users, u => u.name === username);

    if (!user  || user.password !== password) {
        done(null, false); 
        return;
    }

    done(null, user);
})); 

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});