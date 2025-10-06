import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar";

const PageLayout = ({ setToken }) => {
  return (
    <div className="flex w-full">
      <div className="hidden lg960:block">
        <SideBar setToken={setToken} />
      </div>
      <div className="w-full transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
