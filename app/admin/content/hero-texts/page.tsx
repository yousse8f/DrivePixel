'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save } from 'lucide-react';

export default function HeroTextsPage() {
  const [heroTexts, setHeroTexts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    loadHeroTexts();
  }, []);

  const loadHeroTexts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getHeroTexts(true);
      if (response.success && response.data) {
        setHeroTexts(response.data);
      }
    } catch (error) {
      console.error('Failed to load hero texts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await apiClient.updateHeroText(editingId, formData);
      } else {
        await apiClient.createHeroText(formData);
      }
      setEditingId(null);
      setShowForm(false);
      resetForm();
      loadHeroTexts();
    } catch (error) {
      console.error('Failed to save hero text:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero text?')) return;
    try {
      await apiClient.deleteHeroText(id);
      loadHeroTexts();
    } catch (error) {
      console.error('Failed to delete hero text:', error);
    }
  };

  const handleEdit = (heroText: any) => {
    setEditingId(heroText.id);
    setFormData({
      title: heroText.title,
      subtitle: heroText.subtitle,
      order: heroText.order || 0,
      isActive: heroText.is_active,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      order: 0,
      isActive: true,
    });
    setEditingId(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading hero texts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Hero Texts</h1>
          <p className="text-gray-600">Manage homepage hero section texts</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Hero Text
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Hero Text' : 'Add New Hero Text'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
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
          <CardTitle>All Hero Texts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heroTexts.map((heroText) => (
                <TableRow key={heroText.id}>
                  <TableCell className="font-medium">{heroText.title}</TableCell>
                  <TableCell className="max-w-md truncate">{heroText.subtitle}</TableCell>
                  <TableCell>{heroText.order}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      heroText.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {heroText.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(heroText)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(heroText.id)}>
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

