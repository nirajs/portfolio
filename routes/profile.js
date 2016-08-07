var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Project = require('../models/project');

// Get Homepage
router.get('/profile', ensureAuthenticated, function(req, res){
  // list all the ProjectS
  var email = req.user.email;
  var ans;
  console.log(email);
  Project.listProject(email,function(err,result){
    if(err) throw err;
    ans=result;
    //console.log("result at profile is:"+ans);
    res.render('profile',{result:ans});
  });
  //console.log("result at profile is:"+res);



});

router.get('/upload', ensureAuthenticated, function(req, res){
	res.render('upload');
  //console.log(user);
});

router.get('/index',  function(req, res){
	res.render('index');
});

router.post('/upload', function(req, res){

  //console.log(req.user);

  var newProject = new Project({
    name: req.user.name,
    createdBy: req.user.id,
    project: req.body.project,
    message: req.body.message,
    email: req.user.email,
    client: req.body.client,
    sdate:  req.body.sdate,
    edate:  req.body.edate,
    detail: req.body.detail,
    createdBy:  req.body.id
  });

  //console.log("new project",req);

  Project.saveProject(newProject, function(err, data){
    if(err) throw err;
    //console.log(data);
  });
		req.flash('error_msg', 'You Project Details is saved');
    res.redirect('/users/profile');
		//res.redirect('/users/login');

});



function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		//console.log(req);
		//console.log(res.locals.user);
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
