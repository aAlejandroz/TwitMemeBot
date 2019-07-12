console.log("Bot is starting");
var Twit = require('twit');
var config = require('./config');


var T = new Twit(config);
var fs = require('fs');
var files = fs.readdirSync('memes');
console.log(files);

var iterator = 0;

function TweetIt()
{
	var filename = "memes/" + files[iterator];
	iterator++;

	var b64content = fs.readFileSync(filename, {encoding: 'base64'})

	T.post('media/upload',{media_data: b64content}, (err,data,response) =>{
		var id = data.media_id_string;
		var tweet = {
			status : "",
			media_ids: [id]
		}
		T.post("statuses/update",tweet,(err, data, response) =>{
			if (err)
			{
				console.log(err);
			}
			else{
				console.log("Tweet Sent");
			}
		});
	});

	if(iterator == files.length)
	{
		clearInterval(myvar);
	}
}

var myvar = setInterval(TweetIt, 3000)

myvar;
