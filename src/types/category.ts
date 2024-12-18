export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
  servicesCount: number;
  createdAt: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}