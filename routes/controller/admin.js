var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/notice', { title: '公告管理' });
});
router.get('/notice', function(req, res, next) {
  res.render('admin/notice', { title: '公告管理' });
});
router.get('/contest', function(req, res, next) {
  res.render('admin/contest', { title: '比赛管理'});
});
router.get('/problem', function(req, res, next) {
  res.render('admin/problem', { title: '题目管理'});
})
router.get('/edit/notice', function(req, res, next) {
  res.render('admin/edit_notice', { title: '编辑公告'});
})
router.get('/edit/contest', function(req, res, next) {
  res.render('admin/edit_contest', { title: '编辑比赛'});
})
router.get('/edit/problem', function(req, res, next) {
  res.render('admin/edit_problem', { title: '编辑题目'});
})

module.exports = router;