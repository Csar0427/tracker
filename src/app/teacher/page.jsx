"use client";

import { useState } from "react";
import {
  BookOpen,
  Bell,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Plus,
  Users,
  MoreHorizontal,
} from "lucide-react";

const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [classCode, setClassCode] = useState("");
  const [fileTypes, setFileTypes] = useState({
    docs: false,
    pdf: false,
    mp4: false,
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const generateClassCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setClassCode(code);
  };

  const handleFileTypeChange = (type) => {
    setFileTypes({ ...fileTypes, [type]: !fileTypes[type] });
  };

  const handleCreateClass = () => {
    const newClass = {
      className,
      description,
      classCode,
      allowedFileTypes: Object.keys(fileTypes).filter((key) => fileTypes[key]),
    };
    console.log("Class Created:", newClass);
    // TODO: Send `newClass` to backend or database
    toggleModal();
    setClassName("");
    setDescription("");
    setClassCode("");
    setFileTypes({ docs: false, pdf: false, mp4: false });
  };

  // Sample data for the dashboard
  const sampleClasses = [
    {
      id: 1,
      className: "Advanced Computer Science",
      students: 24,
      projects: 8,
      classCode: "CS4582",
      lastActive: "Today",
    },
    {
      id: 2,
      className: "Web Development",
      students: 18,
      projects: 5,
      classCode: "WD2023",
      lastActive: "Yesterday",
    },
    {
      id: 3,
      className: "Data Structures",
      students: 32,
      projects: 12,
      classCode: "DS1092",
      lastActive: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-purple-800 flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            CapstoneTrackr
          </h2>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="space-y-1 px-2">
            <button className="w-full flex items-center text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </button>
            <button className="w-full flex items-center text-left px-3 py-2 rounded-md text-sm font-medium bg-purple-50 text-purple-900">
              <BookOpen className="mr-2 h-4 w-4" />
              Classes
            </button>
            <button className="w-full flex items-center text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
              <Users className="mr-2 h-4 w-4" />
              Students
            </button>
            <button className="w-full flex items-center text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 md:px-6">
          <div className="flex-1 flex">
            <h1 className="text-xl font-semibold text-slate-900 md:hidden">
              CapstoneTrackr
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-purple-600 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="relative">
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100">
                <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-medium">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-slate-500">Computer Science</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50">
          <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Classes</h1>
                <p className="text-slate-500">
                  Manage your classes and student projects
                </p>
              </div>
              <button
                onClick={toggleModal}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Class
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Total Classes
                </div>
                <div className="text-3xl font-bold text-purple-700">3</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Total Students
                </div>
                <div className="text-3xl font-bold text-purple-700">74</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Active Projects
                </div>
                <div className="text-3xl font-bold text-purple-700">25</div>
              </div>
            </div>

            {/* Classes List */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Your Classes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200"
                  >
                    <div className="bg-purple-50 p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-900">
                          {cls.className}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white border border-slate-200">
                          {cls.classCode}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        Last active: {cls.lastActive}
                      </p>
                    </div>
                    <div className="p-4 pt-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-slate-500">Students</p>
                          <p className="font-medium">{cls.students}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Projects</p>
                          <p className="font-medium">{cls.projects}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t bg-slate-50 p-3 flex justify-between">
                      <button className="text-sm text-slate-700 hover:text-purple-700">
                        View Details
                      </button>
                      <div className="relative">
                        <button className="text-slate-500 hover:text-slate-700 p-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border border-dashed border-slate-300 rounded-lg flex items-center justify-center h-[220px]">
                  <button
                    onClick={toggleModal}
                    className="flex flex-col h-full w-full items-center justify-center text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg"
                  >
                    <Plus className="h-8 w-8 mb-2" />
                    <span>Add New Class</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-purple-800">
                  Create New Class
                </h2>
                <p className="text-sm text-slate-500">
                  Fill in the details below to create a new class for your
                  students.
                </p>
              </div>
              <button
                onClick={toggleModal}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="className"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Class Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter class name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a brief description of the class"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="classCode"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Class Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="classCode"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    placeholder="Enter or generate code"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={generateClassCode}
                    className="px-3 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Allowed File Types
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="docs"
                      checked={fileTypes.docs}
                      onChange={() => handleFileTypeChange("docs")}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="docs"
                      className="ml-2 block text-sm text-slate-700"
                    >
                      DOCS
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pdf"
                      checked={fileTypes.pdf}
                      onChange={() => handleFileTypeChange("pdf")}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="pdf"
                      className="ml-2 block text-sm text-slate-700"
                    >
                      PDF
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="mp4"
                      checked={fileTypes.mp4}
                      onChange={() => handleFileTypeChange("mp4")}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="mp4"
                      className="ml-2 block text-sm text-slate-700"
                    >
                      MP4
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={toggleModal}
                className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateClass}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
