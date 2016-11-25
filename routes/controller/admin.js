var express = require('express');
var router = express.Router();
// time formatting plugin
var moment = require('moment');
// 
var nojdb = require('../../mongo/nojdb.js');

var async = require('async');

// temporary settings
var timeFormat = 'YYYY/MM/DD HH:mm:ss';

// ===== nojdb =====
function showerr(err, object) {
    if (err == null) {
        console.log(object);
    } else {
        console.log(err);
    }
}
// universal page query
// page
// | pageNumber
// | pageCount
// | results
var pageQuery = function(page, pageSize, Model, populate, queryParams, sortParams, callback) {
  page = parseInt(page);
  var $page = {
    pageNumber: page
  };
  async.waterfall([
    function(done) {
      Model.count(queryParams).exec(function (err, count) {
        done(err, count);
      });
    },
    function(count, done) {
      $page.pageCount = parseInt((count - 1) / pageSize) + 1;
      if (page > $page.pageCount) page = $page.pageCount;
      if (page < 1) page = 1;
      $page.pageNumber = page;
      var start = (page - 1) * pageSize;
      Model.find(queryParams)
        .skip(start)
        .limit(pageSize)
        .populate(populate)
        .sort(sortParams)
        .exec(function(err, doc) {
          done(err, doc);
        });
    }
  ], function(err, doc) {
    $page.results = doc;
    callback(err, $page);
  });
}

// login function isnot finished
// login page
router.get('/', function(req, res, next) {
  res.render('admin/login', { title: '管理员登录' });
});
// login handler
router.post('/portal', function(req, res, next) {
  var query_doc = {userid: req.body.userid, password: req.body.password};
  res.redirect('/admin');
});

// news create update delete
// req.body.mode = "create" | "update" | "delete"
// req.body.content
// | id, title, content, type, create_time, author
router.post('/newsdb', function(req, res, next) {
  var rdoc = req.body;
  if (rdoc.mode == 'delete') {
    nojdb.news.remove({ _id: rdoc.id }, showerr);
  }else if (rdoc.mode == 'create') {
    var model = {
      title: rdoc.title,
      content: rdoc.content,
      type: rdoc.type,
      author: "root"
    };
    nojdb.news.create(model, showerr);
  }else if (rdoc.mode == 'update') {
    var model = {
      title: rdoc.title,
      content: rdoc.content,
      type: rdoc.type,
      author: "root"
    };
    nojdb.news.update({ _id: rdoc.id }, model, showerr);
  }
  res.redirect("/admin/news");
});

// admin pages
router.get('/news', function(req, res, next) {
  var qdoc = req.query;
  var page = qdoc.page ? parseInt(qdoc.page) : 1;
  var pageSize = 20;
  pageQuery(page, pageSize, nojdb.news, '', '', { 'create_time': -1 }, function(err, results) {
    // set time format
    results.results.forEach(function (x) {
      x.create_time_string = moment(x.create_time).format(timeFormat);
    });
    res.render(
      'admin/index',
      { 
        title: '公告管理', 
        status: 'news',
        page: results
      }
    );
  });
});
router.get('/contest', function(req, res, next) {
  var qdoc = req.query;
  var page = qdoc.page ? parseInt(qdoc.page) : 1;
  var pageSize = 20;
  pageQuery(page, pageSize, nojdb.contest, '', '', { 'create_time': -1 }, function(err, results) {
    // set time format
    results.results.forEach(function (x) {
      x.create_time_string = moment(x.begin_time).format(timeFormat);
      x.create_time_string = moment(x.end_time).format(timeFormat);
      x.create_time_string = moment(x.create_time).format(timeFormat);
    });
    res.render(
      'admin/index',
      { 
        title: '比赛管理', 
        status: 'contest',
        page: results
      }
    );
  });
});
router.get('/problem', function(req, res, next) {
  var qdoc = req.query;
  var page = qdoc.page ? parseInt(qdoc.page) : 1;
  var pageSize = 20;
  pageQuery(page, pageSize, nojdb.question, '', '', { 'create_time': -1 }, function(err, results) {
    // set time format
    results.results.forEach(function (x) {
      x.create_time_string = moment(x.create_time).format(timeFormat);
    });
    res.render(
      'admin/index',
      { 
        title: '题目管理', 
        status: 'problem',
        page: results
      }
    );
  });
});

// create pages
router.get('/create/news', function(req, res, next) {
  var context = {
    _id: -1,
    title: '创建公告',
    mode: 'create',
    model: {
      title: '',
      content: ''
    }
  };
  res.render('admin/edit_news', context);
});
router.get('/create/problem', function(req, res, next) {
  res.render('admin/edit_problem', { title: '创建题目'});
});
router.get('/create/contest', function(req, res, next) {
  res.render('admin/edit_contest', { title: '创建比赛'});
});

// edit pages
router.get('/edit/news', function(req, res, next) {
  var rdoc = req.query;
  var context = {
    _id: rdoc.id,
    mode: 'update',
    title: '编辑公告',
    model: {
      title: '',
      content: ''
    }
  };
  nojdb.news.findOne({ _id: context._id }, function(err, model) {
    context.model = model;
    res.render('admin/edit_news', context);
  });
});
router.get('/edit/contest', function(req, res, next) {
  res.render('admin/edit_contest', { title: '编辑比赛'});
});
router.get('/edit/problem', function(req, res, next) {
  res.render('admin/edit_problem', { title: '编辑题目'});
});

module.exports = router;
