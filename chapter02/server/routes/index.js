var express = require('express');
var passport = require('passport');
var router = express.Router();
var gravatar = require('gravatar');

/* GET 메서드용 홈(인덱스) 페이지 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express from server folder' });
});

/* GET 메서드용 로그인 처리 */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
});

/* POST 메서드용 로그인 처리 */
router.post('/login', passport.authenticate('local-login', {
  //Success go to Profile Page / Fail go to login page
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

/* GET 메서드용 가입 처리 */
router.get('/signup', function (req, res) {
  res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
});

/* POST 메서드용 가입 처리 */
router.post('/signup', passport.authenticate('local-signup', {
  // 성공하면 프로필 페이지로, 실패하면 로그인 페이지로
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));


/* GET 메서드용 프로필 페이지 */
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', { title: 'Profile Page', user: req.user, avatar: gravatar.url(req.user.email, { s: '100', r: 'x', d: 'retro' }, true) });
});

/* 사용자가 로그인했는지 확인 */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

/* GET 메서드용 로그아웃 페이지 */
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
