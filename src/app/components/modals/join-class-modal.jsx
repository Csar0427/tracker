"use client";

import { useState } from "react";
import { supabase } from "./../../supabase";
import { X } from "lucide-react";

export default function JoinClassModal({ isOpen, onClose, onClassJoined }) {
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to join a class.");
        setIsLoading(false);
        return;
      }

      // FIXED: Corrected 'code' to 'classCode'
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .select("*")
        .eq("classcode", classCode)
        .single();

      if (classError || !classData) {
        setError("Invalid class code. Please check and try again.");
        setIsLoading(false);
        return;
      }

      const { data: existingEnrollment } = await supabase
        .from("enrollments")
        .select("*")
        .eq("student_id", user.id)
        .eq("class_id", classData.id)
        .maybeSingle();

      if (existingEnrollment) {
        setError("You are already enrolled in this class.");
        setIsLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("enrollments").insert([
        {
          student_id: user.id,
          class_id: classData.id,
        },
      ]);

      if (insertError) {
        setError("Failed to join class. Please try again.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          onClassJoined();
          setSuccess(false);
          setClassCode("");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-800">Join a Class</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Class Code
            </label>
            <input
              type="text"
              placeholder="Enter class code provided by your teacher"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Ask your teacher for the class code.
            </p>
          </div>

          {error && (
            <div className="p-2 bg-red-50 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-2 bg-green-50 text-green-600 text-sm rounded-md">
              Successfully joined the class!
            </div>
          )}

          <div className="border-t pt-4 flex flex-col sm:flex-row sm:justify-end gap-2 sticky bottom-0 bg-white z-10">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-md shadow disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Joining..." : "Join Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
