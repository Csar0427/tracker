"use client";

import { useState, useEffect } from "react";
import { supabase } from "./../supabase";
import { BookOpen, Plus } from "lucide-react";

// Import components
import ProfileDropdown from "./../components/profile-dropdown";
import ClassCard from "./../components/class-card";
import JoinClassModal from "./../components/modals/join-class-modal";

export default function StudentDashboard() {
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState(null);

  const fetchClasses = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Get classes the student is enrolled in through the enrollments table
      const { data, error } = await supabase
        .from("enrollments")
        .select(
          `
          class_id,
          classes (*)
        `
        )
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else {
        // Extract the classes from the joined query
        const studentClasses = data.map((enrollment) => enrollment.classes);
        setClasses(studentClasses);
      }
    }
  };

  const fetchStudentProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Fetch additional student data if needed
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", user.id)
        .single();

      setStudent({
        id: user.id,
        email: user.email,
        name: data?.name || user.email?.split("@")[0] || "Student",
        avatar: data?.avatar_url,
      });
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchStudentProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header with profile */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              <h1 className="ml-2 text-lg sm:text-xl font-bold text-slate-800 truncate">
                CapstonTracker
              </h1>
            </div>

            {student && <ProfileDropdown user={student} isStudent={true} />}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              My Classes
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              View and manage your enrolled classes
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center sm:justify-start"
          >
            <Plus className="mr-2 h-4 w-4" /> Join Class
          </button>
        </div>

        {/* Classes Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {classes.length ? (
            classes.map((cls, index) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                index={index}
                isStudent={true}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-white rounded-lg border border-dashed border-slate-300">
              <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-slate-300 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-slate-700 mb-1">
                No classes yet
              </h3>
              <p className="text-sm sm:text-base text-slate-500 mb-4">
                Join your first class to get started
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center"
              >
                <Plus className="mr-2 h-4 w-4" /> Join Class
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        <JoinClassModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onClassJoined={fetchClasses}
        />
      </main>
    </div>
  );
}
