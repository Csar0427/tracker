"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "./../../supabase";

export default function CreateClassModal({ isOpen, onClose, onClassCreated }) {
  const [form, setForm] = useState({
    classname: "",
    description: "",
    classcode: "",
  });

  const [formErrors, setFormErrors] = useState({
    classname: "",
    description: "",
    classcode: "",
  });

  const [isCheckingCode, setIsCheckingCode] = useState(false);

  const checkClassCodeExists = async (code) => {
    setIsCheckingCode(true);
    const { data, error } = await supabase
      .from("classes")
      .select("id")
      .eq("classcode", code);

    setIsCheckingCode(false);

    if (error) {
      console.error(error);
      return false;
    }

    return data.length > 0;
  };

  const validateForm = async () => {
    const errors = {
      classname: "",
      description: "",
      classcode: "",
    };

    if (!form.classname.trim()) {
      errors.classname = "Class name is required";
    }

    if (!form.description.trim()) {
      errors.description = "Description is required";
    }

    if (!form.classcode.trim()) {
      errors.classcode = "Class code is required";
    } else if (await checkClassCodeExists(form.classcode)) {
      errors.classcode = "This class code is already in use";
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleCreateClass = async () => {
    if (!(await validateForm())) return;

    const { classname, description, classcode } = form;
    const { error } = await supabase
      .from("classes")
      .insert([{ classname, description, classcode }]);

    if (error) console.error(error);
    else {
      setForm({ classname: "", description: "", classcode: "" });
      setFormErrors({ classname: "", description: "", classcode: "" });
      onClose();
      onClassCreated();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center border-b p-3 sm:p-4 sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-bold text-black">
            Create New Class
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Class Name
            </label>
            <input
              type="text"
              placeholder="Enter class name"
              value={form.classname}
              onChange={(e) => setForm({ ...form, classname: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
            />
            {formErrors.classname && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.classname}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter class description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none min-h-[80px] sm:min-h-[100px] text-black"
            />
            {formErrors.description && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.description}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Class Code
            </label>
            <input
              type="text"
              placeholder="Enter unique class code"
              value={form.classcode}
              onChange={(e) => setForm({ ...form, classcode: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
            />
            {formErrors.classcode && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.classcode}
              </p>
            )}
          </div>
        </div>

        <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-end gap-2 sticky bottom-0 bg-white z-10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateClass}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-md shadow order-1 sm:order-2"
          >
            Create Class
          </button>
        </div>
      </div>
    </div>
  );
}
