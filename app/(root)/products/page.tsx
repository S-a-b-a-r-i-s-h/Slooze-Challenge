"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      return redirect("/login");
    }
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleDelete = async (id: string) => {
    try {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete product");
        setProducts(products.filter((product) => product.id !== id));
    } catch (err: any) { 
        setError(err.message || "Something went wrong");
    }
  }
  if (loading) return <p className="text-center text-gray-500 mt-6">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white text-white dark:bg-gray-800 p-4 rounded"
            >
              <h2 className="text-lg font-medium mb-1 ">{product.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Category: {product.category}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Quantity: {product.quantity} {product.unit}
              </p>
              <Link href={`products/edit/${product.id}`} className="text-green-500"> Edit </Link> <br />
              <button onClick={() => handleDelete(product.id)} className="text-red-500" > Delete </button>
            </div>
          ))}
        </div>
      )}
        <div className="mt-6">
            <Link href="/products/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Add New Product
            </Link>
        </div>
    </div>
  );
};

export default ProductsPage;
