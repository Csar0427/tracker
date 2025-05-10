"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "./../supabase";
import { useRouter } from "next/navigation";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Step 1: Create user in Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: form.email,
        password: form.password,
      }
    );

    if (signUpError) {
      console.error(signUpError);
      setMessage("Registration failed: " + signUpError.message);
      setLoading(false);
      return;
    }

    // Step 2: Insert extra user data into 'user' table
    const { data: insertData, error: insertError } = await supabase
      .from("user")
      .insert([
        {
          name: form.name,
          email: form.email,
          role: form.role,
        },
      ]);

    if (insertError) {
      console.error(insertError);
      setMessage("Registration failed: " + insertError.message);
    } else {
      console.log("Registered:", insertData);
      setMessage("Registration successful! Please login.");
      // Optional: Redirect to login page after a few seconds
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
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

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="professor">professor</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-sm mt-4 text-green-500">{message}</p>
          )}
        </form>

        {/* Link to login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
