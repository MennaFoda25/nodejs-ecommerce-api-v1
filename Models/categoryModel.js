const mongoose = require("mongoose");

//Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
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

categorySchema.post("init", function (doc) {
  //return image url + image name
  setImageURL(doc);
});

categorySchema.post("save", function (doc) {
  //return image url + image name
  setImageURL(doc);
});
//create model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
