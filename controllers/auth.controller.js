const passport = require('passport');
const userModel = require('../models/users.model');

exports.signup = (req, res) => {
    const { name, email, password, user_type = 'shopper' } = req.body; 

    if (!name || !email || !password) {
        return res.render('signup', { error: 'All fields are required.' });
    }

    const existingUser = userModel.getUserByEmail(email);
    if (existingUser) {
        return res.render('signup', { error: 'Email already registered.' });
    }

    userModel.createUser(name, email, password, user_type, null); 
    res.redirect('/auth/login');
};

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: req.session.returnTo || '/',
        failureRedirect: '/auth/login',
        failureFlash: true 
    })(req, res, next);
};

