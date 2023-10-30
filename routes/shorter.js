// Router and Controller
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const Url = require("../models/url.js");
const asyncHandler = require("express-async-handler");

// Regex if URL is valid format
// Ref https://www.makeuseof.com/regular-expressions-validate-url/
const checkNumber = new RegExp("^[0-9]+$")
const checkUrl = new RegExp("^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$");


// Ref https://stackoverflow.com/questions/29175465/body-parser-extended-option-qs-vs-querystring
router.use(bodyParser.urlencoded({ extended: false }))

// Function to post url if :number is valid url,
// if the url exists, return the number corresponding it
const urlPost = asyncHandler(async (req, res, next, postedUrl) => {
  const targetUrl = await (
    Url.findOne({ urlName: postedUrl }).exec()
  );
  console.log(targetUrl)
  // Check target url exists or not
  if (!targetUrl) {
    // find url having max number to add new url
    const maxNumberUrl = await Url.findOne().sort({ number: -1 }).limit(1);
    // If an attemp is first time, define number as 1
    if (!maxNumberUrl) {
      const url = new Url({ number: 1, urlName: postedUrl });
      await url.save();
    } else {
      // insert new url having newest max number
      const url = new Url({ number: maxNumberUrl.number + 1, urlName: postedUrl });
      await url.save();
    }
    const insetedUrl = await Url.findOne({ urlName: postedUrl }).exec();
    res.json({ "original_url": insetedUrl.urlName, "short_url": insetedUrl.number });
  } else {
    res.json({ "original_url": targetUrl.urlName, "short_url": targetUrl.number });
  }
})
router.post("/", (req, res, next) => {
  const postedUrl = req.body.url;
  console.log(`This is postedUrl, ${postedUrl}`)
  if (checkUrl.test(postedUrl)) {
    urlPost(req, res, next, postedUrl);
  } else {
    res.json({ error: 'invalid url' });
  }
});

// Function to get url if :number is number existing db
const urlGet = asyncHandler(async (req, res, next) => {
  const requestTarget = req.params.number;
  const targetNumber = await (
    Url.findOne({ number: requestTarget }).exec()
  );
  console.log(targetNumber)
  if (targetNumber === null) {
    const err = new Error("Url not found");
    err.status = 404;
    return next(err);
  }
  res.json({ "original_url": targetNumber.urlName, "short_url": targetNumber.number });
});

// Function to jump url that is entered by get method
const jumpUrl = asyncHandler(async (req, res, next) => {
  const requestNumber = req.params.number;
  const targetNumber = await (
    Url.findOne({ number: requestNumber }).exec()
  );
  console.log(targetNumber)
  if (targetNumber === null) {
    const err = new Error("Url not found");
    err.status = 404;
    return next(err);
  }
  res.redirect(targetNumber.urlName);
});

// Check the value of :numbe
const numberChecker = (req, res, next) => {
  if (checkNumber.test(req.params.number)) {
    console.log(req.method) //for test
    req.method === 'POST'
      ? urlGet(req, res, next)
      : jumpUrl(req, res, next);
  } else {
    res.json({ error: 'please enter number' });
  }
};

router.post("/:number", numberChecker);

router.get("/:number", numberChecker)

module.exports = router;