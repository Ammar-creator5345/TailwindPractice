import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SideBar = ({ setToken }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const NavLinkItem = ({ src_1, src_2, url }) => {
    return (
      <NavLink to={url}>
        {({ isActive }) => <img src={isActive ? src_2 : src_1} alt="link" />}
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
    <div className="rounded-[0px_28px_28px_0px] p-6 pt-[80px] pb-[50px] bg-white border border-[#E2E8F0] h-screen">
      <nav>
        <NavLink>
          <div className="flex items-center justify-center w-[57px] mb-[110px]">
            <img
              src="https://app.ziphire.hr/assets/img/Ziphire-Logo-3.png"
              alt=""
              className="w-full"
            />
          </div>
        </NavLink>
        <div className="flex flex-col items-center gap-8 h-[calc(100vh-380px)] overflow-y-scroll hide-scrollbar">
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Profile.svg"
            src_2="	https://app.ziphire.hr/assets/img/menu-icons/Profile-Selected.svg"
            url="/home"
          />
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Search.svg"
            src_2="https://app.ziphire.hr/assets/img/menu-icons/Search-Selected.svg"
            url="/find-jobs"
          />
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Track-My-Job.svg"
            src_2="https://app.ziphire.hr/assets/img/menu-icons/Track-My-Job-Selected.svg"
            url="/track-my-jobs"
          />
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Notification-Center.svg"
            src_2="https://app.ziphire.hr/assets/img/menu-icons/Notification-Center-Selected.svg"
            url="/notifications-center"
          />
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Resume-Builder.svg"
            src_2="https://app.ziphire.hr/assets/img/menu-icons/Resume-Builder-Selected.svg"
            url="/my-resumes"
          />
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Chat.svg"
            src_2="	https://app.ziphire.hr/assets/img/menu-icons/Chat-Selected.svg"
            url="/messages"
          />
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Settings.svg"
            src_2="https://app.ziphire.hr/assets/img/menu-icons/Settings-Selected.svg"
            url="/settings"
          />
          <NavLinkItem
            src_1="https://app.ziphire.hr/assets/img/menu-icons/Credit.svg"
            src_2="https://app.ziphire.hr/assets/img/menu-icons/Credit-Selected.svg"
            url="/manage-your-subscription"
          />
        </div>
        <div className="flex items-center pt-5">
          <div className="p-1 shadowColor2 rounded-xl flex items-center justify-center bg-[#fafafa] ">
            <button
              onClick={logOut}
              className="p-2 rounded-xl bg-[#fafafa] transition-all hover:bg-[#ecebeb] hover:shadowColor2"
            >
              <img
                src="https://app.ziphire.hr/assets/img/menu-icons/Logout.svg"
                alt=""
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
