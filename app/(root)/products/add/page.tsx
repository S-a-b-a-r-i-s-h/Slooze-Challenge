'use client';

import ProductForm from '@/components/ProductForm';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function AddProductPage() {
  const router = useRouter();

  const handleAdd = async (data: any) => {
    const newProduct = { ...data, id: uuidv4() };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      router.push('/products');
    } else {
      alert('Failed to add product');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}
