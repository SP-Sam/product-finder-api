import { Router, Request, Response } from "express";
import { searchByCategory, searchByTerm } from "./controllers/searchController";

import { searchValidation } from "./middleware/searchValidation";
import { validate } from "./middleware/handleValidation";

const router = Router();

router.get("/health-check", (_req: Request, res: Response) => {
  return res.json({ message: "API Working" });
});

router.post("/search", searchValidation(), validate, searchByTerm);

router.post(
  "/product-category",
  searchValidation(),
  validate,
  searchByCategory
);

export default router;
