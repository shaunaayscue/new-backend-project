require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy; 
const userModel = require("../models/users.model");

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/google/callback'
}, function(token, tokenSecret, profile, done) {
    const newUser = {
        name: profile.displayName,
        email: profile.emails[0].value,
        password: null,
        userType: 'shopper',
        googleId: profile.id
    };

    let user = userModel.getUserByEmail(profile.emails[0].value);
    if (!user) {
        userModel.createUser(newUser.name, newUser.email, newUser.password, newUser.userType, newUser.googleId);
        user = userModel.getUserByEmail(newUser.email);
    }

    return done(null, user);
}));

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
        const user = userModel.getUserByEmail(email);

        if (!user || user.google_id) {
            console.log('Local Strategy: User with email ' + email + ' not found or is a Google user.');
            return done(null, false, { message: 'Incorrect email or password' });
        }

        if (user.user_password === password) { 
            console.log('Local Strategy: Password matches for user ' + email + '.');
            return done(null, user);
        } else {
            console.log('Local Strategy: Password does not match for user ' + email + '.');
            return done(null, false, { message: 'Incorrect email or password' });
        }
    }
));

passport.serializeUser(function(user, done) {
    //console.log("Serializing user:", user);
    done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
    const user = userModel.getUserById(id);
    if (user) {
       // console.log("Found user:", user);
        done(null, user);
    } else {
        console.error("User not found for ID:", id);
        done(null, false);
    }
});

module.exports = passport;