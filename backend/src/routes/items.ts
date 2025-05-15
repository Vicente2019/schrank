// routes/items.ts
import express from "express";
import catchAsync from "../utils/catchAsync";
import * as items from "../controllers/items";

const router = express.Router();

router.route("/")
  .get(catchAsync(items.index))
  .post(catchAsync(items.createItem));

router.route("/:id")
  .get(catchAsync(items.showItem))
  .put(catchAsync(items.updateItem))
  .delete(catchAsync(items.deleteItem));

export default router;
