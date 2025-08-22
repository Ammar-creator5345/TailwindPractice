import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dataForSubmit = { email, password };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked", dataForSubmit);
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
        console.log("login succefull", res.data);
        localStorage.setItem("token", res.data.tokens.access);
        navigate("/home");
      })
      .catch((err) => {
        console.log("cannot be login", err);
      });
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-rose-50 w-[40%] border-2 border-black rounded-lg py-20 px-10">
        <h1 className="text-4xl font-bold my-4 text-center">Login In</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-center">
            <input
              className="border-2 w-full border-black p-2 rounded-lg m-4 "
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border-2 w-full border-black p-2 rounded-lg m-4 "
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border-2 border-green-950 block m-auto mb-1 py-2 px-2 rounded-lg hover:bg-slate-600 hover:text-white transition"
          >
            Submit
          </button>
          <div className="flex justify-center mt-3">
            <span>
              Don't have an Account?{" "}
              <NavLink to="/signUp" className="text-blue-950 hover:underline">
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
