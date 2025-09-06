import Testing from "./pages/testing";
import LogIn from "./pages/logInPage";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import EmailVerification from "./pages/email_verification";
import Resumes from "./pages/resumes";
import ResumeSideDrawer from "./components/ResumeSideDrawer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          alert("token Expired");
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LogIn setToken={setToken} />}
        />
        <Route
          path="/signUp"
          element={token ? <Navigate to="/" /> : <SignUp />}
        />
        {token ? (
          <>
            <Route path="/" element={<Testing setToken={setToken} />} />
            <Route path="/verify" element={<EmailVerification />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/some" element={<ResumeSideDrawer />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
