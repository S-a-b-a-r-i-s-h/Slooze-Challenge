'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductForm from '@/components/ProductForm';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (updatedProduct: any) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });

    if (res.ok) {
      router.push('/products');
    } else {
      alert('Failed to update product');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <ProductForm edit product={product} onSubmit={handleUpdate} />
    </div>
  );
}
