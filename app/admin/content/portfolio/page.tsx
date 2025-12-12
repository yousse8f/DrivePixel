'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    techStack: [] as string[],
    results: '',
    imageUrl: '',
    order: 0,
    isActive: true,
  });
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getPortfolio(true);
      if (response.success && response.data) {
        setPortfolio(response.data);
      }
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await apiClient.updatePortfolio(editingId, formData);
      } else {
        await apiClient.createPortfolio(formData);
      }
      setEditingId(null);
      setShowForm(false);
      resetForm();
      loadPortfolio();
    } catch (error) {
      console.error('Failed to save portfolio item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      await apiClient.deletePortfolio(id);
      loadPortfolio();
    } catch (error) {
      console.error('Failed to delete portfolio item:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      techStack: item.tech_stack || [],
      results: item.results,
      imageUrl: item.image_url || '',
      order: item.order || 0,
      isActive: item.is_active,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      techStack: [],
      results: '',
      imageUrl: '',
      order: 0,
      isActive: true,
    });
    setEditingId(null);
  };

  const addTech = () => {
    if (newTech.trim()) {
      setFormData({ ...formData, techStack: [...formData.techStack, newTech.trim()] });
      setNewTech('');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading portfolio...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Portfolio</h1>
          <p className="text-gray-600">Manage portfolio items</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Tech Stack</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTech()}
                  placeholder="Add technology"
                />
                <Button type="button" onClick={addTech}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded flex items-center gap-2">
                    {tech}
                    <button onClick={() => setFormData({ ...formData, techStack: formData.techStack.filter((_, i) => i !== index) })}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Results</Label>
                <Input
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); resetForm(); }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Portfolio Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tech Stack</TableHead>
                <TableHead>Results</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.tech_stack?.join(', ') || 'N/A'}</TableCell>
                  <TableCell>{item.results}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

