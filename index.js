require('dotenv').config();
const express = require('express');
// const cors = require('cors');
// app.use(cors());
// Basic Configuration
const port = process.env.PORT || 3000;
const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI; 
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const shorterRouter = require('./routes/shorter');
app.use('/api/shorturl', shorterRouter);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});



// I misunderstood I should use Array
// Array of URL
// const arrayOfUrl = [
//   { number: 1, url: "e" },
//   { number: 2, url: "boilerplate-project-urlshortener.memorandum876.repl.co" },
//   { number: 3, url: "b" }
// ];

// // Function check whether reqesut URL is in array
// const isUrlInArray = (hostUrl, number) => {
//   for (let item of arrayOfUrl) {
//     if (item.number == number && item.url == hostUrl) {
//       return item;  // Return the matched item
//     }
//   }
//   return null;
// };