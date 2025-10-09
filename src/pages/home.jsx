import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage({ setToken }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">personalProject</h1>
        </div>
      </header>

      <footer className="bg-white py-4 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} personalProject. All rights reserved.
      </footer>
    </div>
  );
}
