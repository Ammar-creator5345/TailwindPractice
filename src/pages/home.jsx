import axios from "axios";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage({ setToken }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logOut = () => {
    axios
      .get("https://api.ziphire.hr/v2/logout", {
        headers: {
          Accept: "application/json; version=1.0",
          "x-api-key": "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">personalProject</h1>
          <nav className="flex gap-4">
            <NavLink to="/" className="text-gray-600 hover:text-black">
              Home
            </NavLink>
            <NavLink to="/resumes" className="text-gray-600 hover:text-black">
              Resumes
            </NavLink>
            <NavLink to="/profile" className="text-gray-600 hover:text-black">
              My Profile
            </NavLink>
            <NavLink to="/find-jobs" className="text-gray-600 hover:text-black">
              Find Jobs
            </NavLink>
            <NavLink
              to="/track-my-jobs"
              className="text-gray-600 hover:text-black"
            >
              Track Jobs
            </NavLink>
            <NavLink
              to="/notifications-center"
              className="text-gray-600 hover:text-black"
            >
              Notifications
            </NavLink>
            <NavLink to="/ai" className="text-gray-600 hover:text-black">
              Zaki AI
            </NavLink>
          </nav>
          <button
            onClick={logOut}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to personalProject
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          Build resumes, tailor cover letters, and find jobs with ease. Your
          career growth starts here.
        </p>
        <div className="flex gap-4">
          <NavLink
            to="/resumes"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600"
          >
            Build Resume
          </NavLink>
          <NavLink
            to="/find-jobs"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300"
          >
            Find Jobs
          </NavLink>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} personalProject. All rights reserved.
      </footer>
    </div>
  );
}
