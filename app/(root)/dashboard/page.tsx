"use client";

import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    setLoading(false);
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (role !== "manager") {
    return (
      <div className="text-center mt-10 text-red-500">
        You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

      <section className="grid md:grid-cols-2 gap-6 text-white">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2"> Manage Commodities</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add, edit, or remove product categories and inventory items.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2"> Manage Store-Keepers</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Assign tasks, view store-keeper activity, and manage permissions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2"> Inventory Overview</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            View commodity levels, recent transactions, and alerts for low stock.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2"> System Settings</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Configure roles, access levels, and system preferences.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
