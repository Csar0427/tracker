"use client";

import { useState, useEffect } from "react";
import { X, Search, UserPlus, Check, Loader2, Mail, UserX } from "lucide-react";
import { supabase } from "./../../supabase";

export default function ManageStudentsModal({ managingClass, onClose }) {
  const [students, setStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [studentError, setStudentError] = useState("");

  const fetchStudentsForClass = async (classId) => {
    setIsLoadingStudents(true);

    const { data, error } = await supabase
      .from("enrollments")
      .select(
        `
        id,
        students (
          id, 
          name, 
          email, 
          avatar_url
        )
      `
      )
      .eq("class_id", classId);

    if (error) {
      console.error(error);
      setStudents([]);
    } else {
      const formattedStudents = data.map((enrollment) => ({
        enrollmentId: enrollment.id,
        ...enrollment.students,
        id: enrollment.students?.id || "unknown",
        name: enrollment.students?.name || "Unknown Student",
        email: enrollment.students?.email || "",
        avatar_url: enrollment.students?.avatar_url || null,
      }));

      setStudents(formattedStudents);
    }

    setIsLoadingStudents(false);
  };

  const addStudentToClass = async () => {
    if (!newStudentEmail.trim()) {
      setStudentError("Email is required");
      return;
    }

    if (!newStudentEmail.includes("@")) {
      setStudentError("Please enter a valid email");
      return;
    }

    setStudentError("");
    setIsAddingStudent(true);

    // First check if student exists
    const { data: existingStudents, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("email", newStudentEmail.trim())
      .limit(1);

    let studentId;

    if (studentError) {
      console.error(studentError);
      setStudentError("Error checking student");
      setIsAddingStudent(false);
      return;
    }

    // If student doesn't exist, create a new one
    if (!existingStudents.length) {
      const { data: newStudent, error: createError } = await supabase
        .from("students")
        .insert([
          {
            email: newStudentEmail.trim(),
            name: newStudentEmail.split("@")[0], // Use part of email as name
          },
        ])
        .select("id")
        .single();

      if (createError) {
        console.error(createError);
        setStudentError("Error creating student");
        setIsAddingStudent(false);
        return;
      }

      studentId = newStudent.id;
    } else {
      studentId = existingStudents[0].id;
    }

    // Now enroll the student in the class
    const { error: enrollError } = await supabase.from("enrollments").insert([
      {
        student_id: studentId,
        class_id: managingClass?.id,
      },
    ]);

    if (enrollError) {
      console.error(enrollError);
      setStudentError("Error enrolling student");
      setIsAddingStudent(false);
      return;
    }

    // Refresh the student list
    if (managingClass) {
      fetchStudentsForClass(managingClass.id);
    }
    setNewStudentEmail("");
    setIsAddingStudent(false);
  };

  const removeStudentFromClass = async (enrollmentId) => {
    const { error } = await supabase
      .from("enrollments")
      .delete()
      .eq("id", enrollmentId);

    if (error) {
      console.error(error);
      return;
    }

    // Refresh the student list
    if (managingClass) {
      fetchStudentsForClass(managingClass.id);
    }
  };

  const closeManageModal = () => {
    setStudents([]);
    setStudentSearch("");
    setIsAddingStudent(false);
    setNewStudentEmail("");
    setStudentError("");
    onClose();
  };

  useEffect(() => {
    if (managingClass) {
      fetchStudentsForClass(managingClass.id);
    }
  }, [managingClass]);

  // Filter students based on search
  const filteredStudents = studentSearch
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
          student.email.toLowerCase().includes(studentSearch.toLowerCase())
      )
    : students;

  if (!managingClass) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center border-b p-3 sm:p-4 sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-bold text-black">
            Manage Students: {managingClass.classname}
          </h2>
          <button
            onClick={closeManageModal}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          {/* Search and Add Student */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
              />
            </div>
            <button
              onClick={() => setIsAddingStudent(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Add Student
            </button>
          </div>

          {/* Add Student Form */}
          {isAddingStudent && (
            <div className="mb-4 p-3 border border-slate-200 rounded-lg bg-slate-50">
              <h3 className="text-sm font-medium text-slate-800 mb-2">
                Add New Student
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="Student email address"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                  />
                  {studentError && (
                    <p className="mt-1 text-xs text-red-500">{studentError}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addStudentToClass}
                    disabled={isAddingStudent && !newStudentEmail}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md flex items-center justify-center disabled:opacity-50"
                  >
                    {isAddingStudent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingStudent(false);
                      setNewStudentEmail("");
                      setStudentError("");
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-md flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Student List */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7 sm:col-span-5 text-sm font-medium text-slate-700">
                  Student
                </div>
                <div className="hidden sm:block col-span-5 text-sm font-medium text-slate-700">
                  Email
                </div>
                <div className="col-span-5 sm:col-span-2 text-sm font-medium text-slate-700 text-right">
                  Actions
                </div>
              </div>
            </div>

            {isLoadingStudents ? (
              <div className="p-8 flex justify-center items-center">
                <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
              </div>
            ) : filteredStudents.length > 0 ? (
              <div className="divide-y">
                {filteredStudents.map((student) => (
                  <div
                    key={student.enrollmentId}
                    className="px-4 py-3 hover:bg-slate-50"
                  >
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-7 sm:col-span-5 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mr-3">
                          {student.avatar_url ? (
                            <img
                              src={student.avatar_url || "/placeholder.svg"}
                              alt={student.name}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <span>{student.name?.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-slate-800">
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-500 sm:hidden truncate">
                            {student.email}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:block col-span-5 text-sm text-slate-600 truncate">
                        {student.email}
                      </div>
                      <div className="col-span-5 sm:col-span-2 flex justify-end gap-1">
                        <button
                          className="p-1 text-slate-400 hover:text-indigo-600"
                          title="Email student"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            removeStudentFromClass(student.enrollmentId)
                          }
                          className="p-1 text-slate-400 hover:text-red-600"
                          title="Remove from class"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                {studentSearch ? (
                  <div>
                    <p className="text-slate-500 mb-2">
                      No students match your search
                    </p>
                    <button
                      onClick={() => setStudentSearch("")}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div>
                    <UserX className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 mb-2">
                      No students in this class yet
                    </p>
                    <button
                      onClick={() => setIsAddingStudent(true)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Add your first student
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t p-3 sm:p-4 flex justify-end sticky bottom-0 bg-white z-10">
          <button
            onClick={closeManageModal}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
