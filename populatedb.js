
console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);
const userArgs = process.argv.slice(2);
const Url = require("./models/url");
// const urls = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
console.log(userArgs)
console.log(mongoDB)
main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUrls();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function urlCreate(number, urlName) {
  const url = new Url({ number: number, urlName: urlName });
  await url.save();
  console.log(url)
//   urls.push(url);
  console.log(`Added url: ${urlName} as ${number}`);
}

async function createUrls() {
  console.log("Adding urls");
  await Promise.all([
    urlCreate(0, "https://www.google.com"),
    urlCreate(1, "https://www.bing.com")
  ]);
}