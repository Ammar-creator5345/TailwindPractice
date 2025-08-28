import Testing from "./pages/testing";
import LogIn from "./pages/logInPage";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import EmailVerification from "./pages/email_verification";
import Resumes from "./pages/resumes";
import ResumeSideDrawer from "./components/ResumeSideDrawer";
import LoadingTesting from "./components/loadingStateTesting";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            token ? <Navigate to="/" /> : <LogIn setToken={setToken} />
          }
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
            <Route path="/loading" element={<LoadingTesting />} />
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
