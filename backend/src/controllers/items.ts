import { Request, Response } from "express";
import Item from "../models/item";

export const index = async (req: Request, res: Response) => {
  const items = await Item.find();
  res.json(items);
};

export const showItem = async (req: Request, res: Response) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

export const createItem = async (req: Request, res: Response) => {
  const item = new Item(req.body);

  const file = req.file as Express.Multer.File | undefined;
  if (file) {
    item.image = {
      url: file.path,
      filename: file.filename,
    };
  }
  
  await item.save();
  res.status(201).json(item);
};

export const updateItem = async (req: Request, res: Response) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

export const deleteItem = async (req: Request, res: Response) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json({ message: "Item deleted" });
};
