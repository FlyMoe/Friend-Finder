
// npm packages that are used.
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// create the app instance of express
var app = express(); 

// Sets an initial port.
var PORT = process.env.PORT || 80; 

// BodyParser makes it easy for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Node will see the app directory as public
app.use(express.static("app"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs. 
// ================================================================================

require('./app/routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);


// ==============================================================================
// LISTENER
// The below code effectively "starts" our server 
// ==============================================================================

//app.listen(PORT, function() {
app.listen(process.env.PORT, function() {
	console.log("App listening on PORT: " + PORT);
});