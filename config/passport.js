const { Mongoose } = require('mongoose')

const GoogleStartegy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const User = require('../models/User');
const GOOGLE_CLIENT_ID = "644676652155-of70l3ojb4v2gj0rvi45nve0kg3eak6f.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "jwhW135Ec9VQK2ySJHWrdKWu"

module.exports = function(passport){
    passport.use(new GoogleStartegy({
        clientID:GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'
    }, async(accessToken,refreshToken,profile,done)=>{
            const newUser = {
                googleId:profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }
            try{
                let user = await User.findOne({googleId: profile.id})

                if(user)
                {
                    done(null,user);
                }
                else{
                    user = await User.create(newUser);
                    done(null,user);
                }
            }catch(err)
            {
                console.log(err);
            }
    }));




    passport.serializeUser((user, done) =>{
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}