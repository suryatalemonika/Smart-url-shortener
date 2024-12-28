const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('../config/passport');


const router = express.Router();

router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

router.use(passport.initialize());
router.use(passport.session());


router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.send('Authentication Successful');
    }
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send(err);
        res.send('Logged out successfully!');
    });
});

router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).send('Unauthorized');
    }
});

module.exports = router;