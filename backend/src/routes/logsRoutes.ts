import { Router } from "express";
import {
  createLog,
  getLogs,
  getLog,
  deleteLog,
} from "../controllers/logsController";

const router = Router();

router.post("/", createLog);
router.get("/", getLogs);
router.get("/:id", getLog);
router.delete("/:id", deleteLog);

export default router;

