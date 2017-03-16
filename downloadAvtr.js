var request = require("request");
var fs = require("fs");

var GITHUB_USER = "freakolope";
var GITHUB_TOKEN = "a62afc793537ed7a3c009ffbb65fccb8cd41e38d";

var GitHubrepo;
var GitHubname;

console.log("Welcome to GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

	var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

	var options = {

		url: requestURL,
		headers: {
			'User-Agent': "GitHub Avatar Downloader"
		}
	};

	request.get(options, function(error, response, body) {

		if (error) {

			throw error;
			console.log(error);
		
		} else {

			var data = JSON.parse(response.body);

			for (let avatarURL in data)
				cb(data[avatarURL].avatar_url, "./avatars");
		}
	});
}

function downloadAvatarImage(url, path) {

	request.get(url)

	.on("response", function(response, body) {  

		var filePath = path + "/avatar" + ((Math.random() * 10) + 1) + ".png";
		request(url).pipe(fs.createWriteStream(filePath));
	})
}

getRepoContributors(process.argv[2], process.argv[3], downloadAvatarImage);