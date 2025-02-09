import express from "express";
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  getPortfoliosByUser,
  deletePortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/create", createPortfolio);
router.get("/all", getAllPortfolios);
router.get("/:id", getPortfolioById);
router.get("/user/:userEmail", getPortfoliosByUser);
router.delete("/:id", deletePortfolio);

export default router;
