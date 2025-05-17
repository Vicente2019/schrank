import { Request, Response } from "express";
import Item from "../models/item";

// GET all items
export const index = async (req: Request, res: Response) => {
  const items = await Item.find();
  res.json(items);
};

// GET one item
export const showItem = async (req: Request, res: Response) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

// CREATE new item
export const createItem = async (req: Request, res: Response) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
};

// UPDATE existing item
export const updateItem = async (req: Request, res: Response) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

// DELETE item
export const deleteItem = async (req: Request, res: Response) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json({ message: "Item deleted" });
};
