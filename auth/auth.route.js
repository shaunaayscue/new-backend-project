const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require('../controllers/auth.controller'); 

router.get(
    "/google",
    passport.authenticate("google", {
        keepSessionInfo: true,
        scope: [
            "https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        console.log("User authenticated:", req.user);  
        if (req.user) {
            return res.redirect(req.session.returnTo || '/');
        } else {
            return res.redirect('/auth/login');
        }
    });

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
