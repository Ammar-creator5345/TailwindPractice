import Testing from "./pages/testing";
import LogIn from "./pages/logInPage"
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import SignUp from "./pages/signUp";
import EmailVerification from "./pages/email_verification";
import Resumes from "./pages/resumes";
import ResumeSideDrawer from "./components/ResumeSideDrawer";
import LoadingTesting from "./components/loadingStateTesting";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Testing />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/loading" element={<LoadingTesting />} />
        <Route path="/some" element={<ResumeSideDrawer />} />
      </Routes>
    </div>
  );
}

export default App;
