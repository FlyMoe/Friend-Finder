

// Linking the routes to the data sources. 
var friendsData 	= require('../data/friends.js');
var path 			= require('path');

module.exports = function(app){

	// route to /api/friends. Used to display a JSON of all possible friends
	app.get('/api/friends', function(req, res){
		res.json(friendsData);
		//res.sendFile(path.join(__dirname + '/../data/friends.html'));
	});

	// A post route to /api/friends. Used to handle incoming survey results. 
	// This route will also be used to handle the compatibility logic.
	app.post('/api/friends', function(req, res){

		var newFriend = req.body;

		// Push new friend into the friendsData array
		friendsData.push(newFriend);

		// Display the results as json
		res.json(newFriend);

		var totalDifference = 0;
		var total;
		// Compare the values to each array to come up with a match
		// i = first array, j = second array
		for (var i = 0; i < friendsData[0].scores.length; i++) {
			for (var j = 0; j < friendsData[1].scores.length; j++) { 
				if (i == j) {
					// subtract both values from the array and make sure it's a positive numbers
					total = Math.abs(parseInt(friendsData[0].scores[i]) - parseInt(friendsData[1].scores[j]));

					// Add each total to the totalDifference
					totalDifference = parseInt(totalDifference) + parseInt(total);
				}
			}
		}
	});
}