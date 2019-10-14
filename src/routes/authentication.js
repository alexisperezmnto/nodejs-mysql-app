const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

//SIGN IN

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});


// SIGNUP
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});
  
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


//PROFILE
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});


//LOGOUT
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin');
});

module.exports = router;