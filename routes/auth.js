const passport = require('passport');
const express = require('express');
const { route } = require('.');
const router = express.Router();


// Login/Landing
// GET / to auth.google

router.get('/google', passport.authenticate('google',{scope: ['profile']}));

//DashBoard
// GET/ /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),
(req,res) =>{
    res.redirect('/dashboard');
});

// Log out

router.get('/logout',(req,res) =>{
    req.logOut();
    res.redirect('/');
})

module.exports = router