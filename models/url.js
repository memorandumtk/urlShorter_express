const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  number: { type: Number, required: true, min: 1 },
  urlName: { type: String, required: true }
});

// // Virtual for book's URL
// BookSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/book/${this._id}`;
// });

// Export model
module.exports = mongoose.model("Url", UrlSchema);

