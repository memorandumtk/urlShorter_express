require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const myUrl = 'https://boilerplate-project-urlshortener.memorandum876.repl.co/'

// app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Array of URL
const arrayOfUrl = [
  { number: 1, url: "e" },
  { number: 2, url: "boilerplate-project-urlshortener.memorandum876.repl.co" },
  { number: 3, url: "b" }
];

// Function check whether reqesut URL is in array
const isUrlInArray = (hostUrl, number) => {
  for (let item of arrayOfUrl) {
    if (item.number == number && item.url == hostUrl) {
      return item;  // Return the matched item
    }
  }
  return null;
};
// Your first API endpoint
// console.log(JSON.stringify(req.headers)); //header info get
app.post('/api/shorturl/:number', (req, res) => {
  const numberValue = req.params.number;
  const hostUrl = req.headers.host;

  const matchedUrl = isUrlInArray(hostUrl, numberValue);
  if (matchedUrl) {
    const originalUrl = `https://${hostUrl}/api/shorturl/${numberValue}`;
    res.json({ "original_url": originalUrl, "short_url": matchedUrl.number });
  } else {
    res.status(400).json({ "error": "URL not found in the array" });
  }
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
