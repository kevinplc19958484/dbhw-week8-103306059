var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

router.post('/', function(req, res, next) {
  var memberName = req.body.name;
  var memberAccount = req.body.account;
  var memberPassword = req.body.password;
  Member.getbyaccount(memberName, memberAccount, memberPassword,function(err, member) {
    if(err || memberName != member.name || memberAccount != member.account || memberPassword != member.password ) {
    res.render('login', {
    member : null
  });

    } else {
      req.session.member = member;
      res.redirect('/');
    }
  });
});


router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;
