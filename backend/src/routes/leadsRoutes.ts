import { Router } from "express";
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from "../controllers/leadsController";

const router = Router();

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
