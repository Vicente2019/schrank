// routes/outfits.ts
import express from "express";
import catchAsync from "../utils/catchAsync";
import * as outfits from "../controllers/outfits";

const router = express.Router();

router.route("/")
  .get(catchAsync(outfits.index))
  .post(catchAsync(outfits.createOutfit));

router.route("/:id")
  .get(catchAsync(outfits.showOutfit))
  .put(catchAsync(outfits.updateOutfit))
  .delete(catchAsync(outfits.deleteOutfit));

export default router;
