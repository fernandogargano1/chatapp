const express = require('express');
const router = express.Router();

const passport = require('passport');

module.exports = router;

router.get('/login', (req, res) => {
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
