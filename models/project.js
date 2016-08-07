var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var ProjectSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	project: {
		type: String
	},
	client: {
		type: String
	},
	sdate: {
		type: String
	},
	edate: {
		type: String
	},
	message: {
		type: String
	},
	createdOn: {
		type:Date,
	  default:Date.now
	},
	createdBy: {
		type: Schema.Types.ObjectId,
	  ref: 'users'
  }
});

var Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.saveProject = function(newProject, callback){
	  newProject.save(callback);
}

module.exports.listProject = function(email,callback){

  var filter=email;
	if(filter==null||email=="admin@gmail.com")
        query = Project.find().sort({'createdOn': 'desc'});

  else
				query = Project.find({email:filter}).sort({'createdOn': 'desc'});
        //query = Project.find({correct:filter});



	query.exec(function(err,result){
        if(err) callback(err,null);
				else
				//console.log("result at model project with id" + filter + result);
        callback(null,result);
    });

    };
