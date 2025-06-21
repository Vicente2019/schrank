import { Request, Response } from "express";
import Item from "../models/item";
import { exec } from "child_process";
import util from "util";
import { cloudinary } from "../cloudinary";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
const execAsync = util.promisify(exec);

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
  const file = req.file;

  if (!file) {
    await item.save();
    return res.status(201).json(item);
  }

  const inputPath = file.path;
  const removedBgPath = `${file.path}-no-bg.png`;
  const resizedPath = `${file.path}-resized.png`;
  const rembgPath = path.resolve(__dirname, "../../venv/bin/rembg");

  try {
    // Remove background
    await execAsync(`${rembgPath} i ${inputPath} ${removedBgPath}`);

    // Resize the image
    await sharp(removedBgPath)
      .resize(500, 500, {
        fit: "cover",
        position: "center",
      })
      .toFile(resizedPath);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(resizedPath, { folder: "items" });

    item.image = {
      url: result.secure_url,
      filename: result.public_id,
    };

    await item.save();

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image processing or upload failed" });
  } finally {
    fs.unlink(inputPath).catch(() => {});
    fs.unlink(removedBgPath).catch(() => {});
    fs.unlink(resizedPath).catch(() => {});
  }
};

export const updateItem = async (req: Request, res: Response) => {
  console.log("id:", req.params.id);
  console.log("body:", req.body);

  const file = req.file as Express.Multer.File | undefined;
  if (file) {
    req.body.image = {
      url: file.path,
      filename: file.filename,
    };
  }

  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};


export const deleteItem = async (req: Request, res: Response) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json({ message: "Item deleted" });
};
