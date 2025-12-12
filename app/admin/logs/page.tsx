'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Activity } from 'lucide-react';

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    resource: '',
    action: '',
  });

  useEffect(() => {
    loadLogs();
  }, [page, filters]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 50 };
      if (filters.resource) params.resource = filters.resource;
      if (filters.action) params.action = filters.action;
      
      const response = await apiClient.getLogs(params);
      if (response.success && response.data) {
        setLogs(response.data.logs || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this log?')) return;
    try {
      await apiClient.deleteLog(id);
      loadLogs();
    } catch (error) {
      console.error('Failed to delete log:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading logs...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Logs</h1>
        <p className="text-gray-600">View system activity logs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Filter by resource"
              className="px-3 py-2 border rounded-md"
              value={filters.resource}
              onChange={(e) => setFilters({ ...filters, resource: e.target.value })}
            />
            <input
              type="text"
              placeholder="Filter by action"
              className="px-3 py-2 border rounded-md"
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            />
            <Button onClick={loadLogs}>Apply Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>{log.resource}</TableCell>
                  <TableCell>{log.user_email || 'System'}</TableCell>
                  <TableCell className="max-w-md truncate">{log.details || 'N/A'}</TableCell>
                  <TableCell>{log.ip_address || 'N/A'}</TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(log.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

