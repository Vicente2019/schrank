import { Request, Response } from "express";
import Outfit from "../models/outfit";

// GET all outfits
export const index = async (req: Request, res: Response) => {
  const outfits = await Outfit.find().populate("items");
  res.json(outfits);
};

// GET one outfit
export const showOutfit = async (req: Request, res: Response) => {
  const outfit = await Outfit.findById(req.params.id).populate("items");
  if (!outfit) return res.status(404).json({ error: "Outfit not found" });
  res.json(outfit);
};

// CREATE new outfit
export const createOutfit = async (req: Request, res: Response) => {
  const outfit = new Outfit(req.body);
  await outfit.save();
  res.status(201).json(outfit);
};

// UPDATE existing outfit
export const updateOutfit = async (req: Request, res: Response) => {
  const outfit = await Outfit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("items");
  if (!outfit) return res.status(404).json({ error: "Outfit not found" });
  res.json(outfit);
};

// DELETE outfit
export const deleteOutfit = async (req: Request, res: Response) => {
  const outfit = await Outfit.findByIdAndDelete(req.params.id);
  if (!outfit) return res.status(404).json({ error: "Outfit not found" });
  res.json({ message: "Outfit deleted" });
};
