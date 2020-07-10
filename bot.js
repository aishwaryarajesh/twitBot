//require two dependencies for our bot.js file
var Twit = require('twit');
var fs = require('fs');

//config file
var T = new Twit(require('./config.js'));

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

//URL of a search for the latest tweets on the '#arts' hashtag.
var artsSearch = {q: '"#machinelearning"OR "#MachineLearning"OR" #artificialintelligence"OR" #DeepLearning"OR" #AI' , 
count: 100, 
result_type: "recent",
lang: 'en'
}; 

// This function finds the latest tweet with the #arts hashtag, and retweets it.
function retweet() {
	T.get('search/tweets', artsSearch, function (error, data) {
	  console.log(error, data);
	  if (!error) {
            //ID of tweet to retweet
            var dat = randomInt(0,100);
            	//ID of the tweet we want to retweet...
		var retweetId = data.statuses[dat].id_str;
		//retweet
		T.post('statuses/retweet/' + retweetId, { }, function (error, callback) {
			if (callback) {
				console.log('Success! Check your bot, it has retweeted something...')
			}
			//error
			if (error) {
				console.log('Error! Sorry about that:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

//start bot & timer (optional)
//retweet()
//setInterval(retweet, Math.floor(((Math.random() * 10) + 5) * 1000) * 60);
