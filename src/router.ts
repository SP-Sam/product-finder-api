import { Router, Request, Response } from "express";

const router = Router();

router.get("/health-check", (_req: Request, res: Response) => {
  return res.json({ message: "API Working" });
});

export default router;
