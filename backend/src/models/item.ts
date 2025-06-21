import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["top", "bottom", "shoes", "accessory", "outerwear", "other"],
    },
    image: {
        url: {
            type: String,
            required: true,
        },
        filename: {
            type: String,
            required: true,
        },
    },
    tags: {
        type: [String],
        default: [],
    },
    price: {
        type: Number,
        min: 0,
    },
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "One Size", "Custom", "Unknown"],
        default: "Unknown",
    },
    brand: String,
    wearCount: {
        type: Number,
        default: 0,
        min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);