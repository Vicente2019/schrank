import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    items: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true,
            },
        ],
        validate: {
            validator: (value: mongoose.Types.ObjectId[]) => value.length > 0,
            message: "An outfit must have at least one item.",
        },
    },
    images: [
        {
            url: String,
            filename: String
        }
    ],
    tags: {
        type: [String],
        default: [],
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Outfit", outfitSchema);
