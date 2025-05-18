"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { supabase } from "./../supabase";

export default function ProfileDropdown({ teacher }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    else window.location.href = "/login";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  if (!teacher) return null;

  return (
    <div className="relative dropdown-container" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
      >
        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
          {teacher.avatar ? (
            <img
              src={teacher.avatar || "/placeholder.svg"}
              alt={teacher.name}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
            />
          ) : (
            <span>{teacher.name?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <span className="font-medium text-slate-700 hidden xs:block">
          {teacher.name}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg border z-10">
          <div className="p-2 border-b">
            <p className="font-medium">{teacher.name}</p>
            <p className="text-sm text-slate-500 truncate">{teacher.email}</p>
          </div>
          <div className="p-1">
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded-md flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded-md flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </button>
            <div className="border-t my-1"></div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded-md flex items-center text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
