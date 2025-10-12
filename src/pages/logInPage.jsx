import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const LogIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://api.ziphire.hr/v2/developer/login",
        { email, password },
        {
          headers: {
            Accept: "application/json; version=1.0",
            "x-api-key":
              "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Login successful", res.data);
        localStorage.setItem("token", res.data.tokens.access);
        setToken(res.data.tokens.access);
        setTimeout(() => navigate("/home"), 100);
      })
      .catch((err) => {
        console.log("Login failed", err);
      });
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="bg-white w-full max-w-md border border-gray-200 rounded-xl shadow-md py-8 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400 transition"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400 transition"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </div>

          <div className="text-center mt-5 text-sm">
            <span className="text-gray-600">
              Don’t have an account?{" "}
              <NavLink to="/signUp" className="text-blue-600 hover:underline">
                Sign Up
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
