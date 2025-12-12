import { Router } from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getHeroTexts,
  createHeroText,
  updateHeroText,
  deleteHeroText,
} from "../controllers/contentController";

const router = Router();

// Services routes
router.get("/services", getServices);
router.post("/services", createService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

// Portfolio routes
router.get("/portfolio", getPortfolio);
router.post("/portfolio", createPortfolio);
router.put("/portfolio/:id", updatePortfolio);
router.delete("/portfolio/:id", deletePortfolio);

// Blog posts routes
router.get("/blog", getBlogPosts);
router.get("/blog/:slug", getBlogPost);
router.post("/blog", createBlogPost);
router.put("/blog/:id", updateBlogPost);
router.delete("/blog/:id", deleteBlogPost);

// Testimonials routes
router.get("/testimonials", getTestimonials);
router.post("/testimonials", createTestimonial);
router.put("/testimonials/:id", updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

// Hero texts routes
router.get("/hero-texts", getHeroTexts);
router.post("/hero-texts", createHeroText);
router.put("/hero-texts/:id", updateHeroText);
router.delete("/hero-texts/:id", deleteHeroText);

export default router;

