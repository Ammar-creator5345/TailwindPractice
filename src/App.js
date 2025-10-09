import HomePage from "./pages/home";
import LogIn from "./pages/logInPage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./pages/signUp";
import EmailVerification from "./pages/email_verification";
import Resumes from "./pages/resumes";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertDrawer from "./components/alertDrawer";
import ErrorPage from "./pages/errorPage";
import MyProfile from "./myProfile";
import FindJobs from "./findJobs";
import DetailsPage from "./detailsPage/detailPage";
import TrackJobs from "./trackJobs";
import DetailPage from "./trackJobs/detailsPage/detailPage";
import NotificationCenter from "./notificationCenter";
import ZakiAi from "./components/zakiAi";
import PageLayout from "./layout/pageLayout";
import AuthLayout from "./layout/authLayout";
import ManageSubscription from "./manageSubscription";

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
        <Route element={<AuthLayout />}>
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
        </Route>
        <Route path="/" element={<HomePage setToken={setToken} />} />
        {token ? (
          <Route element={<PageLayout setToken={setToken} />}>
            <Route path="/verify" element={<EmailVerification />} />
            <Route path="/my-resumes" element={<Resumes />} />
            <Route path="/home" element={<MyProfile />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/find-jobs/details/:id" element={<DetailsPage />} />
            <Route path="/track-my-jobs" element={<TrackJobs />} />
            <Route path="/track-my-jobs/:id" element={<DetailPage />} />
            <Route
              path="/notifications-center"
              element={<NotificationCenter />}
            />
            <Route
              path="/manage-your-subscription"
              element={<ManageSubscription />}
            />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />}></Route>
        )}
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
