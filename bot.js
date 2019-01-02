console.log("Bot is starting");
var Twit = require('twit');
var config = require('./config');
//console.log(config);
var T = new Twit(config);
var fs = require('fs');
var files = fs.readdirSync('memes');
console.log(files);


var iterator = 0;

var myvar = setInterval(TweetIt, 1800000)

myvar;

function TweetIt()
{

	var filename = "memes/" + files[iterator];
	iterator++;

	var b64content = fs.readFileSync(filename, {encoding: 'base64'})

	T.post('media/upload',{media_data: b64content}, uploaded);

	//T.post('statuses/update', tweet, respon);
	function uploaded(err,data,response){
		var id = data.media_id_string;
		var tweet = {
			status : "",
			media_ids: [id]
		}
			T.post("statuses/update",tweet,respon)
	}

	function respon(err, data, response)
	{
		if (err)
		{
			console.log("Error!");
		}
		else{
			console.log("Tweet Sent");
		}
	}
	// Ensures the bot will end functionality once there are no more files to upload from a folder
	if(iterator == files.length)
	{
		clearInterval(myvar);
	}
}




//TweetIt();
