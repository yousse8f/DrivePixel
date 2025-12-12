'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [leadsAnalytics, setLeadsAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        apiClient.getDashboardStats(),
        apiClient.getLeadsAnalytics('30'),
      ]);

      if (statsRes.success) setDashboardStats(statsRes.data);
      if (leadsRes.success) setLeadsAnalytics(leadsRes.data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Analytics</h1>
        <p className="text-gray-600">View system statistics and insights</p>
      </div>

      {leadsAnalytics?.leadsByStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
            <CardDescription>Distribution of leads across different statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsAnalytics.leadsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {leadsAnalytics.leadsByStatus.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {leadsAnalytics?.leadsOverTime && leadsAnalytics.leadsOverTime.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Leads Over Time (Last 30 Days)</CardTitle>
            <CardDescription>Daily lead generation trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsAnalytics.leadsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardStats?.activeContent && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Active Services</span>
                  <span className="font-bold">{dashboardStats.activeContent.active_services}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Portfolio</span>
                  <span className="font-bold">{dashboardStats.activeContent.active_portfolio}</span>
                </div>
                <div className="flex justify-between">
                  <span>Published Blogs</span>
                  <span className="font-bold">{dashboardStats.activeContent.published_blogs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Testimonials</span>
                  <span className="font-bold">{dashboardStats.activeContent.active_testimonials}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary-900">
              {dashboardStats?.recentLeads || 0}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

