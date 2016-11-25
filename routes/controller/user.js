var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/create', function(req, res, next) {
  res.render('user/create', { title: '创建用户' });
});
router.post('/create/submit',function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  // TODO: req
});
router.get('/register', function(req, res, next) {
    res.render('user/register', { title: '登录' });
});
router.get('/contest', function(req, res, next) {
    res.render('user/contest', { title: '当前比赛' });
});
router.get('/contestlist', function(req, res, next) {
    res.render('user/contestlist', { title: '比赛列表' });
});
router.get('/problem', function(req, res, next) {
    res.render('user/problem', { title: '题目' });
});
router.get('/ranklist', function(req, res, next) {
    res.render('user/ranklist', { title: '排名' });
});
router.get('/statuslist', function(req, res, next) {
    res.render('user/statuslist', { title: '提交状态' });
});

module.exports = router;
