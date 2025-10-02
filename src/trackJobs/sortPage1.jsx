import MapIcon from "../svgs/mapIcon";
import ClockIcon from "../svgs/clockIcon";
import BuildigIcon from "../svgs/buildingIcon";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import WarningIcon from "../myProfile/warningIcon";
import { useNavigate } from "react-router-dom";

const SortPage1 = ({ data }) => {
  const navigate = useNavigate();
  const wordFormatter = (word) => {
    return word
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };
  const dateAppliedFormatter = (date) => {
    return Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
  };
  return (
    <div>
      {data.length ? (
        <div>
          {data?.map((job) => (
            <div
              key={job.id}
              className="bg-white p-3 rounded-2xl shadowColor2 mt-4"
            >
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <div className="w-[75px] h-[75px] min-w-[75px] min-h-[75px] rounded-2xl shadowColor2 flex justify-center items-center md:w-[90px] md:h-[90px] md:min-w-[90px] md:min-h-[90px]">
                    <img
                      src="https://app.ziphire.hr/assets/img/job-icon.png"
                      alt="some"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col flex-wrap justify-center text-center items-center gap-3 md:flex-row md:justify-start">
                      <h1 className="text-2xl font-[500]">
                        {job?.job_detail?.job_title}
                      </h1>
                      <span className="text-[13px] whitespace-nowrap flex items-center justify-center bg-[#BEADF5] rounded-xl px-2 py-[3px]">
                        {wordFormatter(job?.status)}
                      </span>
                    </div>
                    <p className="text-[13px] font-[500] text-[#353434] mt-1 mb-2">
                      {job?.job_detail?.company_name}
                    </p>
                    <div className="flex whitespace-nowrap flex-wrap mb-4 justify-center items-center gap-3 md:mb-0 md:justify-start">
                      <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                        <MapIcon />
                        <span className="text-[13px] text-[#2c2b2b]">
                          {job?.job_detail?.city},
                        </span>
                        <span className="text-[13px] text-[#2c2b2b]">
                          {job?.job_detail?.country_name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                        <ClockIcon />
                        <span className="text-[13px] text-[#2c2b2b]">
                          {job?.job_detail?.selected_job_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                        <BuildigIcon />
                        <span className="text-[13px] text-[#2c2b2b]">
                          {job?.job_detail?.selected_work_mode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="w-10 h-10">
                    <CircularProgressbar
                      styles={buildStyles({
                        textSize: "28px",
                        textColor: "black",
                        trailColor: "transparent",
                        pathColor: "#A38AF1",
                      })}
                      value={job?.base_score}
                      text={`${job?.base_score}%`}
                    />
                  </div>
                  <span className="text-[12px] text-[#4b4949] font-[500]">
                    Job Match
                  </span>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center gap-3 flex-col justify-between md:flex-row md:gap-0">
                <div className="break-words text-center text-[13px] text-[#504e4e] md:text-start">
                  <span>{`Applied ${dateAppliedFormatter(
                    job?.applied_date
                  )} days ago`}</span>
                  <span className="mx-1">.</span>
                  <span>{`Employer last active ${dateAppliedFormatter(
                    job?.last_activity_date
                  )} days ago`}</span>
                </div>
                <div>
                  <button
                    onClick={() => navigate(`/track-my-jobs/${job?.id}`)}
                    className="font-semibold whitespace-nowrap rounded-[12px] px-[80px] py-3 bg-[#7CFCA8] transition-all hover:px-5 hover:py-[14px] md:px-4 md:rounded-[18px]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <WarningIcon />
          <p className="text-sm text-[#615f5f] font-[500]">
            Nothing to show here.
          </p>
        </div>
      )}
    </div>
  );
};

export default SortPage1;
