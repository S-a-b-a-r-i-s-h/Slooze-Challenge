"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [showDashboard, setShowDashboard] = useState(false);

  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "manager") {
      setShowDashboard(true);
    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <Image 
        src="/FFFFFF-1.png"
        alt="Logo"
        width={100}
        height={100}
        className="h-10 w-auto"
      />

      {/* Center Links */}
      <div className="space-x-6 hidden md:flex">
        {showDashboard && (
          <Link href="/dashboard" className="text-gray-700 dark:text-gray-200">
            Dashboard
          </Link>
        )}
        <Link href="/products" className="text-gray-700 dark:text-gray-200">
          Products
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
