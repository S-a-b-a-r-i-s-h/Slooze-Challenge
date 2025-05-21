"use client"

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

type LoginResponse = {
  token: string;
  user: {
    email: string;
    role: "manager" | "store-keeper";
  };
};

const LoginComponent = () => {
    // const getIn = localStorage.getItem("token");
    // if (getIn) {
    //     redirect("/home");
    // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkingLogin, setCheckingLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getIn = localStorage.getItem("token");
    if (getIn) {
      return redirect("/home");
    } else {
        setCheckingLogin(false);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data: LoginResponse = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);

      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  if (checkingLogin) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">Login</h2>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginComponent