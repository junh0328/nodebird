/*
passport는 req 객체에 isAuthenticated 메서드를 추가합니다. 로그인 중이면 req.isAuthenticated()가 true고, 아니면 false압니다.
따라서 로그인 여부를 이 메서드로 파악할 수 있습니다.
라우터 중에 로그아웃 라우터나 이미지 업로드 라우터 등은 로그인한 사람만 접근할 수 있게 해야 하고, 
회원가입 라우터나 로그인 라우터는 로그인하지 않은 사람만 접근할 수 있게 해줘야 합니다.
이럴 때 로그인 여부를 검사하는 미들웨어를 넣어 걸러낼 수 있습니다.
*/
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {    //유효기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        })
    }
}