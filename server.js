// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const https = require('https');
var macros = require('json-ld-macros').JSONLDMacro;
macros.registerAPI({
  "https://example.metapack.net": {
     "$": {
         "@context": {
             "data": "http://socialrdf.org/github/datafeed"
         }
     }
  }
});


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get("/", function (request, response) {
  console.log(`Working? ${macros.NS}`);
  
  let resourceURI = "https://example.metapack.net/info";
  let data = {Hello: "World"};
  
  console.log(`Output: ${data}`);  
  
  //let jsonld = macros.resolve(resourceURI, data);
  //var jsonld = macro.toJSONLD();
//  console.log(`Output: ${jsonld}`);  
  
  //response.send(parsedData);
  response.json(data);
});

async function downloadData(url) {
  let parsedData = '';
  https.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);

    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        parsedData = JSON.parse(rawData);
        console.log(JSON.stringify(parsedData, undefined, 2));
        return parsedData
      } catch (e) {
        console.log(e.message);
      }
    });

  }).on('error', (e) => {
    console.error(e);
  });
  
}

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
