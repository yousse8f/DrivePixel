import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";
import { ServiceInput, PortfolioInput, BlogPostInput, TestimonialInput, HeroTextInput } from "../models/contentModel";

// Services
export const getServices = async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
    const result = await query(
      `SELECT id, title, description, icon, items, "order", is_active, created_at, updated_at 
       FROM services ${whereClause} ORDER BY "order" ASC, created_at DESC`,
      []
    );
    return res.json(successResponse("Services retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const data: ServiceInput = req.body;
    const result = await query(
      `INSERT INTO services (title, description, icon, items, "order", is_active) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, title, description, icon, items, "order", is_active, created_at, updated_at`,
      [data.title, data.description, data.icon, data.items || [], data.order || 0, data.isActive !== false]
    );
    return res.status(201).json(successResponse("Service created successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(400).json(errorResponse("Error creating service", error.message));
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<ServiceInput> = req.body;
    
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
      updateFields.push(`title = $${paramIndex++}`);
      updateValues.push(data.title);
    }
    if (data.description !== undefined) {
      updateFields.push(`description = $${paramIndex++}`);
      updateValues.push(data.description);
    }
    if (data.icon !== undefined) {
      updateFields.push(`icon = $${paramIndex++}`);
      updateValues.push(data.icon);
    }
    if (data.items !== undefined) {
      updateFields.push(`items = $${paramIndex++}`);
      updateValues.push(data.items);
    }
    if (data.order !== undefined) {
      updateFields.push(`"order" = $${paramIndex++}`);
      updateValues.push(data.order);
    }
    if (data.isActive !== undefined) {
      updateFields.push(`is_active = $${paramIndex++}`);
      updateValues.push(data.isActive);
    }

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE services SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, description, icon, items, "order", is_active, created_at, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Service not found"));
    }

    return res.json(successResponse("Service updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM services WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Service not found"));
    }
    return res.json(successResponse("Service deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

// Portfolio
export const getPortfolio = async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
    const result = await query(
      `SELECT id, title, category, description, tech_stack, results, image_url, "order", is_active, created_at, updated_at 
       FROM portfolio ${whereClause} ORDER BY "order" ASC, created_at DESC`,
      []
    );
    return res.json(successResponse("Portfolio retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const createPortfolio = async (req: Request, res: Response) => {
  try {
    const data: PortfolioInput = req.body;
    const result = await query(
      `INSERT INTO portfolio (title, category, description, tech_stack, results, image_url, "order", is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, title, category, description, tech_stack, results, image_url, "order", is_active, created_at, updated_at`,
      [data.title, data.category, data.description, data.techStack || [], data.results, data.imageUrl || null, data.order || 0, data.isActive !== false]
    );
    return res.status(201).json(successResponse("Portfolio item created successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(400).json(errorResponse("Error creating portfolio item", error.message));
  }
};

export const updatePortfolio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<PortfolioInput> = req.body;
    
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbKey = key === 'techStack' ? 'tech_stack' : key === 'imageUrl' ? 'image_url' : key === 'isActive' ? 'is_active' : key === 'order' ? '"order"' : key;
        updateFields.push(`${dbKey} = $${paramIndex++}`);
        updateValues.push(value);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE portfolio SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, category, description, tech_stack, results, image_url, "order", is_active, created_at, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Portfolio item not found"));
    }

    return res.json(successResponse("Portfolio item updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deletePortfolio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM portfolio WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Portfolio item not found"));
    }
    return res.json(successResponse("Portfolio item deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

// Blog Posts
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const { includeUnpublished } = req.query;
    const whereClause = includeUnpublished === 'true' ? '' : 'WHERE is_published = true';
    const result = await query(
      `SELECT id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at 
       FROM blog_posts ${whereClause} ORDER BY date DESC, created_at DESC`,
      []
    );
    return res.json(successResponse("Blog posts retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getBlogPost = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await query(
      `SELECT id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at 
       FROM blog_posts WHERE slug = $1`,
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Blog post not found"));
    }
    return res.json(successResponse("Blog post retrieved successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const data: BlogPostInput = req.body;
    const result = await query(
      `INSERT INTO blog_posts (title, category, author, date, excerpt, content, image, slug, is_published) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at`,
      [data.title, data.category, data.author, data.date, data.excerpt, data.content || null, data.image, data.slug, data.isPublished || false]
    );
    return res.status(201).json(successResponse("Blog post created successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(400).json(errorResponse("Error creating blog post", error.message));
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<BlogPostInput> = req.body;
    
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbKey = key === 'isPublished' ? 'is_published' : key;
        updateFields.push(`${dbKey} = $${paramIndex++}`);
        updateValues.push(value);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE blog_posts SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Blog post not found"));
    }

    return res.json(successResponse("Blog post updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM blog_posts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Blog post not found"));
    }
    return res.json(successResponse("Blog post deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

// Testimonials
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
    const result = await query(
      `SELECT id, name, email, rating, text, "order", is_active, created_at, updated_at 
       FROM testimonials ${whereClause} ORDER BY "order" ASC, created_at DESC`,
      []
    );
    return res.json(successResponse("Testimonials retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const data: TestimonialInput = req.body;
    const result = await query(
      `INSERT INTO testimonials (name, email, rating, text, "order", is_active) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, email, rating, text, "order", is_active, created_at, updated_at`,
      [data.name, data.email, data.rating, data.text, data.order || 0, data.isActive !== false]
    );
    return res.status(201).json(successResponse("Testimonial created successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(400).json(errorResponse("Error creating testimonial", error.message));
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<TestimonialInput> = req.body;
    
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbKey = key === 'isActive' ? 'is_active' : key === 'order' ? '"order"' : key;
        updateFields.push(`${dbKey} = $${paramIndex++}`);
        updateValues.push(value);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE testimonials SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, name, email, rating, text, "order", is_active, created_at, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Testimonial not found"));
    }

    return res.json(successResponse("Testimonial updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM testimonials WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Testimonial not found"));
    }
    return res.json(successResponse("Testimonial deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

// Hero Texts
export const getHeroTexts = async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
    const result = await query(
      `SELECT id, title, subtitle, "order", is_active, created_at, updated_at 
       FROM hero_texts ${whereClause} ORDER BY "order" ASC, created_at DESC`,
      []
    );
    return res.json(successResponse("Hero texts retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const createHeroText = async (req: Request, res: Response) => {
  try {
    const data: HeroTextInput = req.body;
    const result = await query(
      `INSERT INTO hero_texts (title, subtitle, "order", is_active) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, title, subtitle, "order", is_active, created_at, updated_at`,
      [data.title, data.subtitle, data.order || 0, data.isActive !== false]
    );
    return res.status(201).json(successResponse("Hero text created successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(400).json(errorResponse("Error creating hero text", error.message));
  }
};

export const updateHeroText = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<HeroTextInput> = req.body;
    
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbKey = key === 'isActive' ? 'is_active' : key === 'order' ? '"order"' : key;
        updateFields.push(`${dbKey} = $${paramIndex++}`);
        updateValues.push(value);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE hero_texts SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, subtitle, "order", is_active, created_at, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Hero text not found"));
    }

    return res.json(successResponse("Hero text updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteHeroText = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM hero_texts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Hero text not found"));
    }
    return res.json(successResponse("Hero text deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

