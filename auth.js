const express = require('express');
const router = express.Router();

const passport = require('passport');
const _ = require("lodash");

const users = require('./data/users.json');

module.exports = router;

router.get('/login', (req, res) => {    
    if (req.app.get("env") === "development") {
        var user = users[0];
        if (req.query.user) {
           user = _.find(users, u => u.name === req.query.user);
        }         
        req.logIn(user, function(err) {
            if (err) return next(error);
            return res.redirect("/");
        });
        return;
    }
    res.render('login');
});

router.post('/login', passport.authenticate('local', {    
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});
