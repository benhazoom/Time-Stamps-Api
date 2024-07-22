// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//handeling empty call
app.get("/api/", function (req, res) {
  date = new Date();
  const utc = date.toUTCString();
  const unix = Math.floor(date.getTime());
  
  res.json({
    unix: unix,
    utc: utc
  });
});

//main logic
app.get("/api/:data", function (req, res) {
  const data = req.params.data;
  let date;
  
  date = new Date(data);
  //if making Date from string doesnt work make it from a Number (miliseconds)
  if (isNaN(date.getTime())) date = new Date(Number(data));
  //if still invalid res error
  if (isNaN(date.getTime())) res.json({ error : "Invalid Date" })    

  const utc = date.toUTCString();
  const unix = Math.floor(date.getTime());
  
  res.json({
    unix: unix,
    utc: utc
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
