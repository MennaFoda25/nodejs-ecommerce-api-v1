const mongoose = require("mongoose");

//Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      //A and B => shopping.com/a-and-b
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//create model
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
