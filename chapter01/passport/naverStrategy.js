const naverStrategy = require('passport-naver').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new naverStrategy({
        clientID: process.env.NAVER_ID,
        clientSecret: 'cYsXL_zvJA',
        callbackURL: '/auth/naver/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'naver' } });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'naver',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
}