import WarningIcon from "../../myProfile/warningIcon";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LaunchIcon from "@mui/icons-material/Launch";

const Connections = ({ connections }) => {
  return (
    <div className="bg-[#fafafa] min-h-[150px] flex items-center justify-center">
      {connections.length === 0 ? (
        <div className="flex items-center justify-center gap-2 w-fit">
          <WarningIcon />
          <span className="text-sm font-[500] text-[#3f3e3e]">
            No company connections found for this job at the moment.
          </span>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-2xl p-3 border pr-10">
            <h1 className="text-sm font-[500]">Esther Howard</h1>
            <p className="text-[12px] text-[#666666] my-1">Hiring Manager</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 p-1 px-2 rounded-xl bg-[#fafafa]">
                <MailIcon sx={{ fontSize: "18px", color: "#9587C0" }} />
                <p className="text-[12px] text-[#292929]">Some@gmail.com</p>
              </div>
              <div className="flex items-center gap-1 p-1 px-2 rounded-xl bg-[#fafafa]">
                <LinkedInIcon sx={{ fontSize: "18px", color: "#9587C0" }} />
                <p className="text-[12px] text-[#292929]">LinkedIn</p>
                <LaunchIcon sx={{ fontSize: "12px", color: "#0A0A0A" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
