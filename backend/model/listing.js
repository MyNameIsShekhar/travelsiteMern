const mongoose = require("mongoose");

const { Schema } = mongoose; // Extract Schema

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReztOW5GIRQWQGDXTODACup-bSCtAKxrYVMQ&s",
    set: (v) => (v && v.trim() !== "" ? v : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReztOW5GIRQWQGDXTODACup-bSCtAKxrYVMQ&s"),
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
