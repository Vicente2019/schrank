import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: {
        type: String,
        enum: ["top", "bottom", "shoes", "accessory", "outerwear", "other"],
        required: true,
    },
    color: String,
    image: {
        url: String,
        filename: String
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