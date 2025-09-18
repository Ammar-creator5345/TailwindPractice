import HomePage from "./pages/home";
import LogIn from "./pages/logInPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./pages/signUp";
import EmailVerification from "./pages/email_verification";
import Resumes from "./pages/resumes";
import ResumeSideDrawer from "./components/ResumeSideDrawer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertDrawer from "./components/alertDrawer";
import ErrorPage from "./pages/errorPage";
import MyProfile from "./myProfile";
import FindJobs from "./findJobs";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          setShowAlert(true);
          localStorage.removeItem("token");
          setToken(null);
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <div className="App">
      {showAlert && <AlertDrawer />}
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
            <Route path="/" element={<HomePage setToken={setToken} />} />
            <Route path="/verify" element={<EmailVerification />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/some" element={<ResumeSideDrawer />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/find-jobs" element={<FindJobs />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
