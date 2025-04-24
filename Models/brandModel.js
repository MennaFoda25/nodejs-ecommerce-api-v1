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

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post("init", (doc) => {
  setImageURL(doc);
});

brandSchema.post("save", (doc) => {
  setImageURL(doc);
});

//create model
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
