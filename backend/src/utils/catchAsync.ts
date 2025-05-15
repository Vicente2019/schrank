import { RequestHandler } from "express";

const catchAsync = (fn: (...args: any[]) => Promise<any>): RequestHandler =>
  (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export default catchAsync;
