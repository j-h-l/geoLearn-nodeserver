var Usergrid = require("usergrid");
var OAuth = require('oauth').OAuth;
var restify = require('restify');


// ---------------
// Foursquare oauth testing setup

// ---------------
// Restify Setup
function respond(req, res, next) {
    res.send('send response from foursquare');
}

var rest_server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8008, function () {
    console.log('%s listening at %s', server.name, server.url);
});

// --------------
// Apigee Setup
var client = new Usergrid.client({
    orgName:'jeeq',
    appName:'sandbox',
});

/*
    3. Set some details for your first object

    Great, we know where your where account is now!
    Let’s try to create a book, save it on Apigee, and output it on the page.
    
    - Keep the type as “book”.
    - Enter the title of your favorite book below, instead of “the old man and the sea”.    */

var options = {
    type:"book",
    name:"the old man and the sea"
};

/*
    4. Now, run it!
    
    You’re good to go! Use the command 'node index.js' to run the script.	*/

client.createEntity(options, function(error, response){
    if(error) {
        console.log("Could not create the book. Did you enter your orgName (username) correctly on line 15 of index.js?");
    } else {
        console.log("Success! Here is the object we stored; ");
        console.log("notice the timestamps and unique id we created for you:");
        console.log(response.get());
    }
});


/*
    5. Congrats, you’re done!

    - You can try adding more properties after line 30 and re-running the script!
    - You can then see the admin view of this data by logging in at https://apigee.com/usergrid
    - Or you can go explore more advanced examples in our docs: http://apigee.com/docs/usergrid         */

   //36.976141,-121.892541
