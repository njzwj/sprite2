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
  req
})

module.exports = router;
