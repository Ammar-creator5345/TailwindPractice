import MapIcon from "../svgs/mapIcon";
import ClockIcon from "../svgs/clockIcon";
import CalendarIcon from "../svgs/calendarIcon";
import BarChartIcon from "../svgs/barChartIcon";
import BuildingIcon from "../svgs/buildingIcon";
import BookmarkIcon from "../svgs/bookmarkIcon";
import { NavLink, useSearchParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { useState, useEffect } from "react";
import {
  getRecommendedJobs,
  postSavedJob,
  postUnSavedJob,
} from "../apis/findJobs";
import CircularProgress from "@mui/material/CircularProgress";
import ShowAlert from "../components/showSuccessFullMsg";

const JobsItems = ({
  setJobs,
  jobs,
  totalJobs,
  loading,
  setLoading,
  page,
  setPage,
  onSave,
}) => {
  const totalPages = Math.ceil(totalJobs / 4);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const dateFormatter = (value) => {
    const updatedDate = new Date(value);
    const todayDate = new Date();
    const differenceDate = Math.abs(todayDate - updatedDate);
    const realDate = Math.floor(differenceDate / (1000 * 60 * 60 * 24));
    return realDate;
  };
  const SavedPost = (job) => {
    const postJob = async () => {
      if (job?.is_saved) {
        if (onSave) {
          await postUnSavedJob({ job: job?.job_detail?.id });
          setJobs((prev) => {
            return prev.filter((j) => j.id !== job.id);
          });
        } else {
          await postUnSavedJob({ job: job?.id });
        }
        setAlertMessage("job removed successfully");
      } else {
        await postSavedJob({ job: job?.id || job?.job });
        setAlertMessage("job added successfully");
      }
      setJobs((prev) => {
        return prev.map((j) => {
          return j.id === job.id ? { ...j, is_saved: !j.is_saved } : j;
        });
      });
      setShowAlert(true);
    };
    postJob();
  };
  return (
    <>
      {showAlert && (
        <ShowAlert
          section={alertMessage}
          time={2000}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="mt-7">
        {!loading ? (
          jobs?.map((job) => (
            <NavLink to="/find-jobs/details">
              <div className="p-3 rounded-2xl bg-white shadowColor2 mt-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-[90px] h-[90px] rounded-xl shadowColor2">
                      <img
                        src="https://app.ziphire.hr/assets/img/job-icon.png"
                        alt="some"
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">
                        {job?.job_title || job?.job_detail?.job_title}
                      </h1>
                      <p className="text-sm mt-1">
                        {job?.company_name || job?.job_detail?.company_name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <MapIcon />
                          <span>{`${job?.city || job?.job_detail?.city}, ${
                            job?.country_name || job?.job_detail?.country_name
                          }`}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <ClockIcon />
                          <span>
                            {job?.selected_job_type ||
                              job?.job_detail?.selected_job_type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <BuildingIcon />
                          <span>
                            {job?.selected_work_mode ||
                              job?.job_detail?.selected_work_mode}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <BarChartIcon />
                          <span>
                            {job?.experience_level_display ||
                              job?.job_detail?.experience_level_display}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <CalendarIcon />
                          <span>{`${
                            job?.years_of_experience ||
                            job?.job_detail?.years_of_experience
                          } years exp`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="w-[115px] h-[115px] min-w-[115px] min-h-[115px]">
                      <CircularProgressbarWithChildren
                        value={
                          job?.match_percentage ||
                          job?.job_detail?.match_percentage
                        }
                        styles={buildStyles({
                          trailColor: "transparent",
                          pathColor: "#A38AF1",
                        })}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <h1 className="text-lg font-bold">{`${Math.floor(
                            job?.match_percentage ||
                              job?.job_detail?.match_percentage
                          )}%`}</h1>
                          <p className="text-[13px] text-gray-800">Job Match</p>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-t border-t-[#EDEDED]" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[3px] text-[13px] text-gray-700">
                    <span>{`${
                      job?.days_since_posted
                        ? job?.days_since_posted
                        : dateFormatter(job?.job_detail?.posted_at)
                    } days ago`}</span>
                    <FiberManualRecordIcon
                      sx={{ fontSize: "4px", color: "gray" }}
                    />
                    <span>{`${
                      !job?.days_since_posted
                        ? job?.job_detail?.application_count + " Applicants"
                        : ""
                    }`}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        SavedPost(job);
                      }}
                      className="bg-[#fafafa] p-2 px-3 rounded-2xl transition-all hover:bg-[#e7e3e3]"
                    >
                      <BookmarkIcon
                        color={job?.is_saved ? "#1FFFA5" : "transparent"}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="bg-[#7CFCA3] p-3 px-4 rounded-2xl font-[500] transition-all hover:p-[14px] hover:px-5"
                    >
                      Unlock Job
                    </button>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="flex justify-center">
            <CircularProgress color="success" size={50} />
          </div>
        )}
        {!onSave && jobs.length > 0 && (
          <div>
            <div className="flex w-[60%] m-auto my-5 items-center justify-between">
              <button
                className="border p-1 m-2 rounded-full bg-[#f3f0f0] hover:bg-slate-50 "
                onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
              >
                <NavigateBeforeIcon sx={{ color: "gray" }} />
              </button>
              <span className="text-[14px] text-[#463f3f] whitespace-nowrap">{`page ${page} of ${totalPages}`}</span>
              <button
                className="border p-1 m-2 rounded-full bg-[#f3f0f0] hover:bg-slate-50 "
                onClick={() =>
                  setPage((prev) => (prev < totalPages ? prev + 1 : prev))
                }
              >
                <NavigateNextIcon sx={{ color: "gray" }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JobsItems;
