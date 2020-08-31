/*
serializeUser는 req.session 객체에 어떤 데이터를 저장할지 선택합니다.
세션에 사용자 정보를 모두 저장하면 세션의 용량이 커지고 데이터 일관성에 문제가 발생하므로 사용자의 아이디만 저장하라고 명령합니다.
즉, serializeUser는 사용자 정보 객체를 세션에 아이디로 저장하는 것이고, deserializeUser는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것입니다.

deserializeUser는 매 요청 시 실행됩니다. 
좀 전에 serializeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회합니다.
조회한 정보를 req.user에 저장하므로 앞으로 req.user를 통해 로그인할 사용자의 정보를 가져올 수 있습니다.
*/

const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const facebook = require('./facebookStrategy');
const naver = require('./naverStrategy');

const { user, User } = require('../models');
const passport = require('passport');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
    facebook(passport);
    naver(passport);
};


