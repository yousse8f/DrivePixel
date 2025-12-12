import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Get total counts
    const [usersCount, leadsCount, servicesCount, portfolioCount, blogCount, testimonialsCount] = await Promise.all([
      query("SELECT COUNT(*) as count FROM users", []),
      query("SELECT COUNT(*) as count FROM leads", []),
      query("SELECT COUNT(*) as count FROM services", []),
      query("SELECT COUNT(*) as count FROM portfolio", []),
      query("SELECT COUNT(*) as count FROM blog_posts", []),
      query("SELECT COUNT(*) as count FROM testimonials", []),
    ]);

    // Get recent leads (last 7 days)
    const recentLeads = await query(
      `SELECT COUNT(*) as count FROM leads 
       WHERE created_at >= NOW() - INTERVAL '7 days'`,
      []
    );

    // Get leads by status
    const leadsByStatus = await query(
      `SELECT status, COUNT(*) as count 
       FROM leads 
       GROUP BY status 
       ORDER BY count DESC`,
      []
    );

    // Get recent activity (last 10 logs)
    const recentActivity = await query(
      `SELECT l.*, u.email as user_email 
       FROM logs l 
       LEFT JOIN users u ON l.user_id = u.id 
       ORDER BY l.created_at DESC 
       LIMIT 10`,
      []
    );

    // Get content statistics
    const activeContent = await query(
      `SELECT 
        (SELECT COUNT(*) FROM services WHERE is_active = true) as active_services,
        (SELECT COUNT(*) FROM portfolio WHERE is_active = true) as active_portfolio,
        (SELECT COUNT(*) FROM blog_posts WHERE is_published = true) as published_blogs,
        (SELECT COUNT(*) FROM testimonials WHERE is_active = true) as active_testimonials`,
      []
    );

    return res.json(
      successResponse("Dashboard statistics retrieved successfully", {
        counts: {
          users: parseInt(usersCount.rows[0].count),
          leads: parseInt(leadsCount.rows[0].count),
          services: parseInt(servicesCount.rows[0].count),
          portfolio: parseInt(portfolioCount.rows[0].count),
          blogPosts: parseInt(blogCount.rows[0].count),
          testimonials: parseInt(testimonialsCount.rows[0].count),
        },
        recentLeads: parseInt(recentLeads.rows[0].count),
        leadsByStatus: leadsByStatus.rows,
        activeContent: activeContent.rows[0],
        recentActivity: recentActivity.rows,
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getLeadsAnalytics = async (req: Request, res: Response) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period as string);

    // Leads over time
    const leadsOverTime = await query(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM leads 
       WHERE created_at >= NOW() - INTERVAL '${days} days'
       GROUP BY DATE(created_at) 
       ORDER BY date ASC`,
      []
    );

    // Leads by status
    const leadsByStatus = await query(
      `SELECT status, COUNT(*) as count 
       FROM leads 
       GROUP BY status 
       ORDER BY count DESC`,
      []
    );

    return res.json(
      successResponse("Leads analytics retrieved successfully", {
        leadsOverTime: leadsOverTime.rows,
        leadsByStatus: leadsByStatus.rows,
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getContentAnalytics = async (req: Request, res: Response) => {
  try {
    const contentStats = await query(
      `SELECT 
        'services' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active
       FROM services
       UNION ALL
       SELECT 
        'portfolio' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active
       FROM portfolio
       UNION ALL
       SELECT 
        'blog_posts' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_published THEN 1 ELSE 0 END) as active
       FROM blog_posts
       UNION ALL
       SELECT 
        'testimonials' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active
       FROM testimonials`,
      []
    );

    return res.json(
      successResponse("Content analytics retrieved successfully", {
        contentStats: contentStats.rows,
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

