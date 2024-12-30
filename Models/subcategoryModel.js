const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Subcategory must be unique"],
      minleength: [3, "Too short"],
      malength: [32, "tooo long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Subcategory must belong too parent category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subcategorySchema);
