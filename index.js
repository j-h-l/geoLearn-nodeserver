var Usergrid = require("usergrid");
var restify = require('restify');
var request = require('request');
var fs = require('fs');

// --------------
// Apigee Setup
var client = new Usergrid.client({
    // sandbox is public, so only for development
    orgName:'jeeq',
    appName:'sandbox',
});

// ---------------
// Foursquare testing setup
// find secure way soon
FS_CLIENT_ID = "COVIVNQAEXRUTRZPU3N1P5MPPCBVVQCYH41T0DB1KDUYAKHR";
FS_CLIENT_SECRET = "Q3JM230MN4FK2WDOUOPFQQOADRRUQ3XSQA4V5KREHRBQIAMT";
// venue explore request should be of the form
// https://api.foursquare.com/v2/venues/explore?ll=36.976141,-121.892541&client_id=FS_CLIENT_ID&client_secret=FS_CLIENT_SECRET&v=20130815
var base_url = "https://api.foursquare.com/v2/venues/explore?";
var sample_geo = "36.976141,-121.892541";

var newday = new Date();
var month = newday.getMonth();
if (month < 10) {
    month = "0" + month.toString();
}
var today = newday.getDate() + 1;
if (today < 10) {
    today = "0" + today.toString();
}

var dayString = newday.getFullYear().toString() + month.toString() + today.toString();

function build_fs_request (lat, lng) {
    var req = base_url +
                "ll=" + lat + "," + lng +
                "&client_id=" + FS_CLIENT_ID +
                "&client_secret=" + FS_CLIENT_SECRET +
                "&v=" + dayString;
    return req;
}

var full_sample_request = base_url + "ll=" + sample_geo + "&client_id=" + FS_CLIENT_ID + "&client_secret=" + FS_CLIENT_SECRET + "&v=" + dayString;
// console.log(full_sample_request);
// console.log(build_fs_request(36.976141, -121.892541));

// request.get(full_sample_request, function (err, res, body) {
//     if (!err) {
//         console.log("error: " + res.statusCode);
//     }
//     console.log("body: \n" + body);
// });

// sample json for testing
var venues = JSON.parse(fs.readFileSync('foursquare_venue_explore_sample.json'));
var arr_venues = [];
for (var i = 0; i < venues.response.groups[0].items.length; i++) {
    arr_venues.push(venues.response.groups[0].items[i].venue.categories[0].shortName);
}

// console.log(arr_venues);

// ---------------
// Restify Setup
function respond_to_ios (req, res, next) {
    // make request to foursquare (using local sample file for now)
    // gather recommendations from apigee (also localdb when set up)
    // send recommendations
    res.send(arr_venues);
}

var rest_server = restify.createServer();
rest_server.get('/giverec/:loc', respond_to_ios);
rest_server.head('/giverec/:loc', respond_to_ios);

rest_server.listen(8008, function () {
    console.log('%s listening at %s', rest_server.name, rest_server.url);
});
