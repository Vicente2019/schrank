// routes/items.ts
import express from "express";
import catchAsync from "../utils/catchAsync";
import * as items from "../controllers/items";
import multer from "multer";
import { storage } from "../cloudinary";
const upload = multer({ storage });

const router = express.Router();

router.route("/")
  .get(catchAsync(items.index))
  .post(upload.array("image"), catchAsync(items.createItem));

router.route("/:id")
  .get(catchAsync(items.showItem))
  .put(catchAsync(items.updateItem))
  .delete(catchAsync(items.deleteItem));

export default router;
