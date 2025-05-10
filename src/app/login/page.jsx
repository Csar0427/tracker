"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./../supabase"; // adjust path if needed
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

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: form.identifier,
        password: form.password,
      });

    if (loginError) {
      console.error("Login error:", loginError.message);
      alert(loginError.message);
      setLoading(false);
      return;
    }

    console.log("Logged in:", loginData);
    console.log("Value of form.identifier before query:", form.identifier); // Keep this for debugging

    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("role")
      .eq("email", form.identifier)
      .maybeSingle();

    if (userError) {
      console.error("Fetching role failed:", userError.message);
      alert("Failed to fetch user role.");
      setLoading(false);
      return;
    }

    console.log("User data fetched:", userData); // Keep this for debugging

    if (!userData || !userData.role) {
      console.warn("No user role found in the user table.");
      alert("No role assigned to this user. Please contact support.");
      setLoading(false);
      return;
    }

    console.log("User role:", userData.role);

    if (userData.role === "professor") {
      console.log("Redirecting to /teacher"); // Added log
      router.push("/teacher");
    } else {
      console.log("Redirecting to /student-dashboard"); // Added log
      router.push("/student-dashboard");
    }

    console.log("Finished handleSubmit"); // Added log
    setLoading(false);
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
