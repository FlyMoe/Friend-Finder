
var path = require("path");

module.exports = function(app){

	// route to /survey, which should display the survey page.
	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// route to /survey, which should display the survey page.
	app.get('/home', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

	// default route to the home page.
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

}