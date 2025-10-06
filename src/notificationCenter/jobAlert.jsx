import MapIcon from "../svgs/mapIcon";
import ClockIcon from "../svgs/clockIcon";
import BuildingIcon from "../svgs/buildingIcon";
import BookmarkIcon from "../svgs/bookmarkIcon";
import { useNavigate } from "react-router-dom";
import {
  getRecommendedJobs,
  postSavedJob,
  postUnSavedJob,
} from "../apis/findJobs";
import CircularProgress from "@mui/material/CircularProgress";
import ShowAlert from "../components/showSuccessFullMsg";
import { useState, useEffect } from "react";

const JobAlert = ({ jobAlert, setJobAlert, loading }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const dateFormatter = (value) => {
    const updatedDate = new Date(value);
    const todayDate = new Date();
    const differenceDate = Math.abs(todayDate - updatedDate);
    const realDate = Math.floor(differenceDate / (1000 * 60 * 60 * 24));
    return realDate;
  };
  const SavedPost = (job, section) => {
    const postJob = async () => {
      if (job?.is_saved) {
        await postUnSavedJob({ job: job?.id });
        setAlertMessage("job removed successfully");
      } else {
        await postSavedJob({ job: job?.id });
        setAlertMessage("job added successfully");
      }
      setJobAlert((prev) => ({
        ...prev,
        [section]: prev[section].map((j) => {
          return j.id === job.id ? { ...j, is_saved: !j.is_saved } : j;
        }),
      }));
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
      <div className="mt-6">
        {!loading ? (
          <div className="pb-4 px-1">
            <div className="mx-1">
              <h3 className="text-sm font-bold ">New Job Matches for You!</h3>
              <p className="text-[12px] text-[#666666] ">
                {jobAlert?.new_jobs?.length} new jobs in Pakistan match your
                preferences.
              </p>
            </div>
            <div className="mt-1">
              {jobAlert?.new_jobs?.map((job) => (
                <div className="p-4 rounded-2xl bg-white shadowColor2 mt-4">
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <div className="flex text-center flex-col justify-center items-center gap-5 sm:flex-row sm:text-start">
                      <div className="w-[60px] p-2 h-[60px] min-w-[60px] min-h-[60px] rounded-xl shadowColor2 sm:w-[90px] sm:h-[90px] sm:min-w-[90px] sm:min-h-[90px]">
                        <img
                          src="https://app.ziphire.hr/assets/img/job-icon.png"
                          alt="some"
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold">{job?.job_title}</h1>
                        <p className="text-sm mt-1">{job?.company_name}</p>
                        <div className="flex items-center justify-center gap-2 mt-2 whitespace-nowrap flex-wrap sm:justify-start">
                          <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                            <MapIcon />
                            <span>{`${job?.city}, ${job?.country_name}`}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                            <ClockIcon />
                            <span>{job?.selected_job_type}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                            <BuildingIcon />
                            <span>{job?.selected_work_mode}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-center items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            SavedPost(job, "new_jobs");
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
                            navigate(`/find-jobs/details/${job?.id}`);
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          className="bg-[#7CFCA3] p-3 px-4 rounded-2xl font-[500] transition-all hover:p-[14px] hover:px-5"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 mx-1">
              <h3 className="text-sm font-bold ">
                Similar to Jobs you Applied for
              </h3>
              <p className="text-[12px] text-[#666666] ">
                Explore opportunities that match your interests and experience.
              </p>
            </div>
            {jobAlert?.similar_jobs?.map((job) => (
              <div className="p-4 rounded-2xl bg-white shadowColor2 mt-4">
                <div className="flex flex-col items-center justify-between sm:flex-row">
                  <div className="flex text-center flex-col justify-center items-center gap-5 sm:flex-row sm:text-start">
                    <div className="w-[60px] p-2 h-[60px] min-w-[60px] min-h-[60px] rounded-xl shadowColor2 sm:w-[90px] sm:h-[90px] sm:min-w-[90px] sm:min-h-[90px]">
                      <img
                        src="https://app.ziphire.hr/assets/img/job-icon.png"
                        alt="some"
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">{job?.job_title}</h1>
                      <p className="text-sm mt-1">{job?.company_name}</p>
                      <div className="flex items-center justify-center gap-2 mt-2 whitespace-nowrap flex-wrap sm:justify-start">
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <MapIcon />
                          <span>{`${job?.city}, ${job?.country_name}`}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <ClockIcon />
                          <span>{job?.selected_job_type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm bg-[#FAFAFA] py-1 px-2 rounded-xl w-fit">
                          <BuildingIcon />
                          <span>{job?.selected_work_mode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          SavedPost(job, "similar_jobs");
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
                          navigate(`/find-jobs/details/${job?.id}`);
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        className="bg-[#7CFCA3] p-3 px-4 rounded-2xl font-[500] transition-all hover:p-[14px] hover:px-5"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default JobAlert;
