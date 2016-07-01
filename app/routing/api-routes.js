

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
		var total,
			index,
		    totalDifference = 0,
		    tmpTotalDifference = 0;
		  
		// Loop through the friends array and compare each one to the new friend.
		for (var i = 0; i < friendsData.length; i++) {
			for (var j = 0; j < friendsData[i].scores.length; j++) { 
				
				// Subtract both score values from the friends array and from the new friends array.
				// Make sure the total ends up being a positive numbers.
				total = Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriend.scores[j]));

				// Add each total to the tmpTotalDifference
				tmpTotalDifference = parseInt(tmpTotalDifference) + parseInt(total);
			}
		
			// If looping through the first time then set totalDifference to tmpTotalDifference,
			// and set index to 0 for the first value in the array.
			if (totalDifference == 0) {
				totalDifference = tmpTotalDifference;
				index = 0;
			}  
		
		 	// If totalDifference if greater than the tmpTotalDifference we have a new match so set the totalDifference 
		 	// to the value and set the index to the index of that value in the array.
			if (totalDifference > tmpTotalDifference) {
				totalDifference = tmpTotalDifference;
				index = i;
			}

			// Rest back to zero
			tmpTotalDifference = 0;			
		}


		// Send data back to html as json object
		res.json(friendsData[index]);

		// Push new friend into the friendsData array
		friendsData.push(newFriend);	

	});
}