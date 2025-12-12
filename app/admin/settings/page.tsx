'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    type: 'string' as 'string' | 'number' | 'boolean' | 'json',
    description: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingKey) {
        await apiClient.updateSetting(editingKey, formData);
      } else {
        await apiClient.createSetting(formData);
      }
      setEditingKey(null);
      setShowForm(false);
      resetForm();
      loadSettings();
    } catch (error) {
      console.error('Failed to save setting:', error);
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm('Are you sure you want to delete this setting?')) return;
    try {
      await apiClient.deleteSetting(key);
      loadSettings();
    } catch (error) {
      console.error('Failed to delete setting:', error);
    }
  };

  const handleEdit = (setting: any) => {
    setEditingKey(setting.key);
    setFormData({
      key: setting.key,
      value: setting.value,
      type: setting.type,
      description: setting.description || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      key: '',
      value: '',
      type: 'string',
      description: '',
    });
    setEditingKey(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage system settings</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingKey ? 'Edit Setting' : 'Add New Setting'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Key</Label>
                <Input
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  disabled={!!editingKey}
                />
              </div>
              <div>
                <Label>Type</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Value</Label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
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
          <CardTitle>All Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {settings.map((setting) => (
                <TableRow key={setting.id}>
                  <TableCell className="font-medium">{setting.key}</TableCell>
                  <TableCell className="max-w-md truncate">{setting.value}</TableCell>
                  <TableCell>{setting.type}</TableCell>
                  <TableCell>{setting.description || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(setting)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(setting.key)}>
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

