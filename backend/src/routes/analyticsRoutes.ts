import { Router } from "express";
import {
  getDashboardStats,
  getLeadsAnalytics,
  getContentAnalytics,
} from "../controllers/analyticsController";

const router = Router();

router.get("/dashboard", getDashboardStats);
router.get("/leads", getLeadsAnalytics);
router.get("/content", getContentAnalytics);

export default router;

