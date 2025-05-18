"use client";

import { useState } from "react";
import { Edit, Check, X, AlertCircle } from "lucide-react";
import { supabase } from "./../supabase";
export default function ClassCard({
  cls,
  index,
  onClassUpdated,
  onManageClass,
}) {
  const [editingClass, setEditingClass] = useState(null);
  const [editClassCode, setEditClassCode] = useState("");
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [formErrors, setFormErrors] = useState({
    classcode: "",
  });

  // Generate a random pastel color for each class card
  const getRandomPastelColor = (seed) => {
    const hue = (seed * 137.5) % 360;
    return `hsl(${hue}, 70%, 95%)`;
  };

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

    // If editing, exclude the current class from the check
    if (editingClass) {
      return data.some((c) => c.id !== editingClass.id);
    }

    return data.length > 0;
  };

  const startEditingClassCode = (cls) => {
    setEditingClass(cls);
    setEditClassCode(cls.classcode);
    setFormErrors({ classcode: "" });
  };

  const cancelEditingClassCode = () => {
    setEditingClass(null);
    setEditClassCode("");
  };

  const saveClassCode = async () => {
    if (!editClassCode.trim()) {
      setFormErrors({ classcode: "Class code is required" });
      return;
    }

    if (editClassCode !== editingClass?.classcode) {
      if (await checkClassCodeExists(editClassCode)) {
        setFormErrors({
          classcode: "This class code is already in use",
        });
        return;
      }

      const { error } = await supabase
        .from("classes")
        .update({ classcode: editClassCode })
        .eq("id", editingClass?.id);

      if (error) {
        console.error(error);
        return;
      }
    }

    onClassUpdated();
    setEditingClass(null);
    setEditClassCode("");
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border border-slate-200"
      style={{
        borderTop: `4px solid ${getRandomPastelColor(index)}`,
      }}
    >
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
          {cls.classname}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
          {cls.description}
        </p>

        {editingClass && editingClass.id === cls.id ? (
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-black mb-1">
                Class Code
              </label>
              {formErrors.classcode && (
                <span className="ml-2 text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {formErrors.classcode}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={editClassCode}
                onChange={(e) => setEditClassCode(e.target.value)}
                className="px-2 py-1 border border-slate-300 rounded text-xs sm:text-sm font-mono text-black w-full"
                disabled={isCheckingCode}
              />
              <div className="flex ml-2">
                <button
                  onClick={saveClassCode}
                  className="p-1 text-green-600 hover:text-green-800"
                  disabled={isCheckingCode}
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={cancelEditingClassCode}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="inline-block bg-slate-100 px-2 py-1 rounded text-xs sm:text-sm font-mono text-slate-800">
              Code: {cls.classcode}
            </div>
            <button
              onClick={() => startEditingClassCode(cls)}
              className="ml-2 text-slate-500 hover:text-slate-700"
              title="Edit class code"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        )}
      </div>
      <div className="bg-slate-50 px-4 sm:px-5 py-2 sm:py-3 flex justify-between items-center border-t">
        <span className="text-xs sm:text-sm text-slate-500">
          {cls.student_count || 0} Students
        </span>
        <button
          onClick={() => onManageClass(cls)}
          className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Manage
        </button>
      </div>
    </div>
  );
}
