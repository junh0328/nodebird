const facebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../models');

module.exports = (passport) =>{
    passport.use(new facebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        callbackURL : '/auth/facebook/callback',
    }, async( accesToken, refreshToke, profile, done) => {
        try {
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'facebook'}});
            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};