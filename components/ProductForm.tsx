'use client';

import { useState, useEffect } from 'react';

interface Product {
  id?: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

interface ProductFormProps {
  edit?: boolean;
  product?: Product;
  onSubmit: (data: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ edit = false, product, onSubmit }) => {
  const [form, setForm] = useState<Product>({
    name: '',
    category: '',
    quantity: 1,
    unit: '',
  });

  useEffect(() => {
    if (edit && product) {
      setForm(product);
    }
  }, [edit, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  if (name === "quantity") {
    const num = Number(value);
    if (isNaN(num) || num < 0) return; // Prevent negative or invalid numbers
    setForm((prev) => ({ ...prev, quantity: num }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-black">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded bg-gray-100"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded bg-gray-100"
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded bg-gray-100"
        min={1}
        required
      />
      <input
        type="text"
        name="unit"
        placeholder="Unit"
        value={form.unit}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded bg-gray-100"
        required
      />
      <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {edit ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
