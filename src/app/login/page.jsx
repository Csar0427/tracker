"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./../supabase"; // adjust if path differs
import Link from "next/link";

const Login = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Login with email and password
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: form.identifier,
        password: form.password,
      });

    if (loginError) {
      console.error("Login error:", loginError.message);
      alert(loginError.message);
      setLoading(false);
    } else {
      console.log("Logged in:", loginData);

      // 2. Fetch user role from your custom "user" table
      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("role")
        .eq("email", form.identifier)
        .limit(1)
        .maybeSingle(); // safer than .maybeSingle() here

      if (userError) {
        console.error("Fetching role failed:", userError.message);
        alert("Failed to fetch user role.");
      } else {
        console.log("User role:", userData.role);

        // 3. Redirect user based on their role
        if (userData.role === "professor") {
          router.push("/teacher"); // Redirect to teacher dashboard
        } else {
          router.push("/student-dashboard"); // Redirect to student dashboard
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 py-2 rounded-lg text-white hover:bg-purple-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
