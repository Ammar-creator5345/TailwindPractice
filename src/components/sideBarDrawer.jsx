import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import CloseDrawerIcon from "../svgs/closeDrawerIcon";

const SideBarDrawer = ({ setToken, open, setOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const NavLinkItem = ({ src_1, src_2, url, title }) => {
    return (
      <NavLink to={url}>
        {({ isActive }) => {
          return (
            <div className="flex items-center justify-start gap-3">
              <img src={isActive ? src_2 : src_1} alt="link" />
              <span>{title}</span>
            </div>
          );
        }}
      </NavLink>
    );
  };
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
    <Drawer
      open={open}
      slotProps={{
        paper: {
          sx: {
            boxShadow: "1px 1px 15px #847777",
            borderRadius: "0px 30px 30px 0px",
            borderRight: "1px solid #e2e8f0",
            padding: "0 40px",
          },
        },
        backdrop: {
          sx: {
            background: "rgba(0, 0, 0, 0)",
            boxShadow: "none",
          },
        },
      }}
    >
      <div className="bg-white h-screen py-5">
        <nav className="h-full flex flex-col items-center justify-between">
          <div className="flex flex-col gap-12 items-center">
            <NavLink>
              <div className="flex items-center justify-center w-[48px]">
                <img
                  src="https://app.ziphire.hr/assets/img/Ziphire-Logo-3.png"
                  alt=""
                  className="w-full"
                />
              </div>
            </NavLink>
            <div className="flex flex-col gap-8 overflow-y-scroll hide-scrollbar">
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Profile.svg"
                src_2="	https://app.ziphire.hr/assets/img/menu-icons/Profile-Selected.svg"
                url="/home"
                title="Profile"
              />
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Search.svg"
                src_2="https://app.ziphire.hr/assets/img/menu-icons/Search-Selected.svg"
                url="/find-jobs"
                title="Find Jobs"
              />
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Track-My-Job.svg"
                src_2="https://app.ziphire.hr/assets/img/menu-icons/Track-My-Job-Selected.svg"
                url="/track-my-jobs"
                title="Track My Job"
              />
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Notification-Center.svg"
                src_2="https://app.ziphire.hr/assets/img/menu-icons/Notification-Center-Selected.svg"
                url="/notifications-center"
                title="Notification Center"
              />
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Resume-Builder.svg"
                src_2="https://app.ziphire.hr/assets/img/menu-icons/Resume-Builder-Selected.svg"
                url="/my-resumes"
                title="Resume Builder"
              />
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Chat.svg"
                src_2="	https://app.ziphire.hr/assets/img/menu-icons/Chat-Selected.svg"
                url="/messages"
                title="Chat"
              />
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Settings.svg"
                src_2="https://app.ziphire.hr/assets/img/menu-icons/Settings-Selected.svg"
                url="/settings"
                title="Settings"
              />
              <NavLinkItem
                src_1="https://app.ziphire.hr/assets/img/menu-icons/Credit.svg"
                src_2="https://app.ziphire.hr/assets/img/menu-icons/Credit-Selected.svg"
                url="/manage-your-subscription"
                title="Credits"
              />
            </div>
          </div>

          <div className="p-1 px-2 w-full shadowColor2 rounded-xl flex items-center justify-between bg-[#fafafa] ">
            <button
              onClick={logOut}
              className="p-2 rounded-xl bg-[#fafafa] transition-all hover:bg-[#ecebeb] hover:shadowColor2"
            >
              <img
                src="https://app.ziphire.hr/assets/img/menu-icons/Logout.svg"
                alt=""
              />
            </button>
            <button onClick={() => setOpen(false)} className="opposite">
              <CloseDrawerIcon />
            </button>
          </div>
        </nav>
      </div>
    </Drawer>
  );
};

export default SideBarDrawer;
