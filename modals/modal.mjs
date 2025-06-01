import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  description: { type: String },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: { type: String, required: [true, "Category is required"] },
  inStock: {
    type: String,
    default: "yes",
  },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
