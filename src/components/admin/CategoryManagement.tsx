import React, { useState } from 'react';
import { Grid, Edit, Trash2, Plus, X } from 'lucide-react';
import { Category, CategoryFormData } from '../../types/category';

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Fitness',
    slug: 'fitness',
    description: 'Gym, personal training, and fitness classes',
    status: 'active',
    servicesCount: 12,
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    name: 'Wellness',
    slug: 'wellness',
    description: 'Yoga, meditation, and spa services',
    status: 'active',
    servicesCount: 8,
    createdAt: '2024-03-02',
  },
  {
    id: '3',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Outdoor activities and extreme sports',
    status: 'active',
    servicesCount: 6,
    createdAt: '2024-03-03',
  },
];

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    status: 'active',
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        status: category.status,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        status: 'active',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
    const timestamp = new Date().toISOString();

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id
          ? { ...cat, ...formData, slug }
          : cat
      ));
    } else {
      const newCategory: Category = {
        id: Math.random().toString(),
        slug,
        servicesCount: 0,
        createdAt: timestamp,
        ...formData,
      };
      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Category Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{category.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-2 py-1 text-xs rounded-full ${
                category.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.status}
              </span>
              <span className="text-sm text-gray-500">
                {category.servicesCount} services
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}