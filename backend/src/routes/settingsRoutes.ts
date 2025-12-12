import { Router } from "express";
import {
  getSettings,
  createSetting,
  updateSetting,
  deleteSetting,
} from "../controllers/settingsController";

const router = Router();

router.get("/", getSettings);
router.post("/", createSetting);
router.put("/:key", updateSetting);
router.delete("/:key", deleteSetting);

export default router;

