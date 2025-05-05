const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');

router.post('/signup', authController.signup);

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            if (user.user_type === 'admin') {
                return res.redirect('/admin/products/bulk');
            } else {
                return res.redirect(req.session.returnTo || '/');
            }
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/', 
    failureRedirect: '/auth/login',
    failureFlash: true
}), (req, res) => {
    if (req.user && req.user.user_type === 'admin') {
        return res.redirect('/admin/products/bulk');
    } else {
        return res.redirect(req.session.returnTo || '/');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

module.exports = router;