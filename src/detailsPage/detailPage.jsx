import { useEffect, useState } from "react";
import { getDetailsOfJob, postSavedJob, unlockJob } from "../apis/findJobs";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MapIcon from "../svgs/mapIcon";
import ClockIcon from "../svgs/clockIcon";
import BuildigIcon from "../svgs/buildingIcon";
import BarChartIcon from "../svgs/barChartIcon";
import CalendarIcon from "../svgs/calendarIcon";
import BookmarkIcon from "../svgs/bookmarkIcon";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DocumentIcon from "../svgs/TailordResumeIcon";
import FolderDocumentIcon from "../svgs/folderIcon";
import ConnectionIcon from "../svgs/connectionIcon";
import ReactMarkdown from "react-markdown";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LaunchIcon from "@mui/icons-material/Launch";
import LockIcon from "@mui/icons-material/Lock";
import { postUnSavedJob } from "../apis/findJobs";
import ShowAlert from "../components/showSuccessFullMsg";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import GenerateTailordModal from "./generateTailord";
import TailordLetterModal from "./tailordLetter";
import CompanyConnectionModal from "./companyConnections";
import JobAppliedModal from "./jobAppliedModal";
import ZakiAi from "../components/zakiAi";
import SideBarDrawer from "../components/sideBarDrawer";
import MenuIcon from "@mui/icons-material/Menu";

const DetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [TailordResumeModal, setTailordResumeModal] = useState(false);
  const [TailordLetterModalOpen, setTailordLetterModalOpen] = useState(false);
  const [companyConnModal, setCompanyConnModal] = useState(false);
  const [appliedJobModal, setAppliedJobModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [zakiOpen, setZakiOpen] = useState(false);

  const circleStyle = {
    pathColor: "#A38AF1",
    trailColor: "transparent",
    textSize: "30px",
    textColor: "black",
  };
  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const res = await getDetailsOfJob(id);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, []);

  const handleSavedJob = () => {
    setShowAlert(true);
    if (data?.is_saved) {
      postUnSavedJob({ job: data?.id });
      setMessage("Job removed Successfully");
    } else {
      postSavedJob({ job: data?.id });
      setMessage("Job Saved Successfully");
    }
    setData((prev) => ({ ...prev, is_saved: !prev.is_saved }));
  };

  const handleApplyJob = () => {
    const unlockingJob = async () => {
      try {
        const res = await unlockJob({ job_id: id });
        console.log(res);
        setData((prev) => ({
          ...prev,
          is_unlocked: !data.is_unlocked,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    if (data?.is_unlocked) {
      window.open(data?.job_url, "_blank");
      localStorage.setItem("onPage", "true");
    } else {
      unlockingJob();
    }
  };

  useEffect(() => {
    const visibilityHandle = () => {
      const ShouldOpen = localStorage.getItem("onPage");
      if (document.visibilityState === "visible" && ShouldOpen === "true") {
        setAppliedJobModal(true);
        localStorage.removeItem("onPage");
      }
    };
    document.addEventListener("visibilitychange", visibilityHandle);
    return () => {
      document.removeEventListener("visibilitychange", visibilityHandle);
    };
  }, []);

  return (
    <>
      <GenerateTailordModal
        open={TailordResumeModal}
        setOpen={setTailordResumeModal}
        jobId={id}
        data={data}
      />
      <TailordLetterModal
        open={TailordLetterModalOpen}
        setOpen={setTailordLetterModalOpen}
        jobId={id}
        data={data}
      />
      <CompanyConnectionModal
        open={companyConnModal}
        setOpen={setCompanyConnModal}
        jobId={id}
        resumeData={data}
      />
      {showAlert && (
        <ShowAlert
          section={message}
          onClose={() => setShowAlert(false)}
          time={2000}
        />
      )}

      <JobAppliedModal
        open={appliedJobModal}
        setOpen={setAppliedJobModal}
        jobId={id}
        setData={setData}
      />
      <SideBarDrawer
        open={openSideBar}
        setOpen={setOpenSideBar}
        setToken={setToken}
      />
      <ZakiAi open={zakiOpen} setOpen={setZakiOpen} />
      {!zakiOpen && (
        <div
          onClick={() => setZakiOpen(true)}
          className="shadow-[0_4px_14px_#0003] w-[55px] h-[55px] z-[50000] rounded-full p-[9px] bg-white text-white flex justify-center items-center fixed bottom-6 right-5 cursor-pointer transition-all hover:p-1"
        >
          <img
            src="https://app.ziphire.hr/assets/img/zaki_ai_image.jpeg"
            alt=""
            className="w-[90%] h-[90%] rounded-full"
          />
        </div>
      )}

      <div className="pt-4 pb-0 px-1 sm:px-5">
        <div className="flex items-center gap-3 pt-2 pl-3 pb-5">
          <button
            onClick={() => setOpenSideBar(true)}
            className="flex justify-center items-center lg960:hidden"
          >
            <MenuIcon />
          </button>
          <h1 className="text-[28px] font-bold">Job Details</h1>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-86px)] px-1 pb-3">
          <div className="flex items-center gap-3 ml-1 mt-5 sm:ml-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-white rounded-2xl p-2 flex justify-center items-center shadowColor2"
            >
              <ArrowBackIosNewIcon
                sx={{ fontSize: "22px", color: "#4c4242" }}
              />
            </button>
            <p className="font-[500]">Back to Jobs</p>
          </div>
          <div>
            <div className="bg-white mt-5 pb-14 rounded-xl shadowColor2 p-4">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="flex flex-col items-center gap-3 md:flex-row">
                  <div className="w-[46px] h-[46px] min-w-[46px] min-h-[46px] shadowColor2 flex justify-center items-center rounded-lg">
                    <img
                      src="https://app.ziphire.hr/assets/img/job-icon.png"
                      alt="some"
                      className="w-[60%] h-[60%]"
                    />
                  </div>
                  <div className="flex flex-col">
                    {loading ? (
                      <Skeleton variant="rounded" width={310} height={20} />
                    ) : (
                      <div className="flex flex-col gap-2 md:flex-row">
                        <h1 className="text-[22px] text-center font-[500] md:text-start">
                          {data?.job_title}
                        </h1>
                        <div className="flex gap-1 items-center py-1">
                          <span className="text-[12px] text-[#7B6967] font-[500]">
                            {new Date(data?.posted_at).toLocaleDateString(
                              "en-gb"
                            )}
                          </span>
                          <FiberManualRecordIcon sx={{ fontSize: "2px" }} />
                          <span className="text-[12px] text-[#7B6967] font-[500]">
                            {`Expires on: ${new Date(
                              data?.job_expiry
                            ).toLocaleDateString("en-gb")}`}
                          </span>
                        </div>
                      </div>
                    )}

                    {loading ? (
                      <Skeleton
                        variant="rounded"
                        className="mt-2"
                        width={150}
                        height={20}
                      />
                    ) : (
                      <p className="text-sm text-gray-700">
                        {data?.company_name}
                      </p>
                    )}
                  </div>
                </div>
                {data?.has_applied ? (
                  <div className="bg-[#8BFCC1] py-1 px-2 rounded-2xl text-[12px] font-[500]">
                    Applied!
                  </div>
                ) : (
                  <div className="flex mt-2 w-full flex-col items-center gap-3 md:flex-row md:w-fit md:mt-0">
                    {loading ? (
                      <Skeleton
                        variant="rounded"
                        sx={{ borderRadius: "15px" }}
                        width={50}
                        height={40}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={handleSavedJob}
                        className="bg-[#fafafa] flex justify-center items-center w-full p-2 px-3 rounded-2xl transition-all hover:bg-[#e7e3e3] md:w-fit"
                      >
                        <BookmarkIcon
                          color={data?.is_saved ? "#1FFFA5" : "transparent"}
                        />
                      </button>
                    )}
                    {loading ? (
                      <Skeleton
                        variant="rounded"
                        sx={{ borderRadius: "15px" }}
                        width={100}
                        height={40}
                      />
                    ) : (
                      <Tooltip
                        title={`${
                          !data?.is_unlocked
                            ? "Customize your resume, get discovered faster, craft cover letters, and access company contacts."
                            : ""
                        }`}
                        placement="top"
                      >
                        <button
                          onClick={handleApplyJob}
                          type="button"
                          className="bg-[#7CFCA3] w-full whitespace-nowrap p-3 px-4 rounded-2xl font-[500] transition-all hover:p-[14px] hover:px-5 md:w-fit"
                        >
                          {data?.is_unlocked ? "Apply Job" : "Unlock Job"}
                        </button>
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-2 whitespace-nowrap justify-center flex-wrap flex items-center gap-2 md:justify-start">
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ borderRadius: "15px" }}
                    width={80}
                    height={25}
                  />
                ) : (
                  <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                    <MapIcon />
                    <span className="text-[13px] text-[#2c2b2b]">
                      {data?.scraped_job_json?.jobLocation}
                    </span>
                  </div>
                )}
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ borderRadius: "15px" }}
                    width={70}
                    height={25}
                  />
                ) : (
                  <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                    <ClockIcon />
                    <span className="text-[13px] text-[#2c2b2b]">
                      {data?.selected_job_type}
                    </span>
                  </div>
                )}

                {loading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ borderRadius: "15px" }}
                    width={60}
                    height={25}
                  />
                ) : (
                  <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                    <BuildigIcon />
                    <span className="text-[13px] text-[#2c2b2b]">
                      {data?.selected_work_mode}
                    </span>
                  </div>
                )}
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ borderRadius: "15px" }}
                    width={70}
                    height={25}
                  />
                ) : (
                  <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                    <BarChartIcon />
                    <span className="text-[13px] text-[#2c2b2b]">
                      {data?.experience_level_display}
                    </span>
                  </div>
                )}

                {loading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ borderRadius: "15px" }}
                    width={85}
                    height={25}
                  />
                ) : (
                  <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg w-fit">
                    <CalendarIcon />
                    <span className="text-[13px] text-[#2c2b2b]">
                      {`${data?.experience_level} years Exp`}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
                <div className="flex w-[85%] flex-col gap-4 items-center sm:flex-row sm:gap-0">
                  <div className="w-1/3 flex justify-center items-center p-2">
                    <div className="flex flex-col justify-center items-center gap-1">
                      {loading ? (
                        <Skeleton variant="circular" width={50} height={50} />
                      ) : (
                        <div className="w-11 h-11">
                          <CircularProgressbar
                            styles={buildStyles(circleStyle)}
                            value={`${data?.exp_score}`}
                            text={`${data?.exp_score}%`}
                          />
                        </div>
                      )}
                      <p className="text-[13px]">Exp. Level</p>
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-center items-center p-2 md:border-l">
                    <div className="flex flex-col justify-center items-center gap-1">
                      {loading ? (
                        <Skeleton variant="circular" width={50} height={50} />
                      ) : (
                        <div className="w-11 h-11">
                          <CircularProgressbar
                            styles={buildStyles(circleStyle)}
                            value={`${data?.skills_score}`}
                            text={`${data?.skills_score}%`}
                          />
                        </div>
                      )}
                      <p className="text-[13px]">Skills</p>
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-center items-center p-2 md:border-l">
                    <div className="flex flex-col justify-center items-center gap-1">
                      {loading ? (
                        <Skeleton variant="circular" width={50} height={50} />
                      ) : (
                        <div className="w-11 h-11">
                          <CircularProgressbar
                            styles={buildStyles(circleStyle)}
                            value={`${data?.education_score}`}
                            text={`${data?.education_score}%`}
                          />
                        </div>
                      )}
                      <p className="text-[13px]">Education Score</p>
                    </div>
                  </div>
                </div>
                <div className="w-[15%] flex items-center justify-center">
                  <div className="whitespace-nowrap">
                    <div className="bg-[#FAFAFA] rounded-lg p-1 px-9 flex flex-col justify-center items-center ">
                      <h2 className="text-[22px] font-[500]">
                        {loading ? "0" : data?.base_score}%
                      </h2>
                      <p className="text-sm">Job Match</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mt-5" />
              <h1 className="text-[22px] font-semibold mt-3">
                Increase Your Match Score
              </h1>
              <p className="text-[13px] text-gray-700">
                Boost your chances with Ziphire's AI-generated documents
                tailored for this job
              </p>
              <div className="mt-4 whitespace-nowrap flex-wrap flex flex-col items-center gap-3 sm:flex-row sm:w-fit">
                <Tooltip
                  title={
                    data?.is_unlocked ? "" : "Unlock Job to use this Feature"
                  }
                  placement="top"
                >
                  <div
                    onClick={() => {
                      if (data?.is_unlocked) {
                        setTailordResumeModal(true);
                      }
                    }}
                    className="flex gap-3 font-[500] text-sm items-center justify-center p-3 rounded-2xl cursor-pointer shadowColor2 border w-full sm:w-fit"
                  >
                    <DocumentIcon />
                    <span>Generate Tailord Resume</span>
                    {!data?.is_unlocked && (
                      <LockIcon sx={{ fontSize: "20px" }} />
                    )}
                  </div>
                </Tooltip>
                <Tooltip
                  title={
                    data?.is_unlocked ? "" : "Unlock Job to use this Feature"
                  }
                  placement="top"
                >
                  <div
                    onClick={() => {
                      if (data?.is_unlocked) {
                        setTailordLetterModalOpen(true);
                      }
                    }}
                    className="flex gap-3 font-[500] text-sm items-center justify-center p-3 rounded-2xl cursor-pointer shadowColor2 border w-full sm:w-fit"
                  >
                    <FolderDocumentIcon />
                    <span>Generate Tailord Cover Letter</span>
                    {!data?.is_unlocked && (
                      <LockIcon sx={{ fontSize: "20px" }} />
                    )}
                  </div>
                </Tooltip>
                <Tooltip
                  title={
                    data?.is_unlocked ? "" : "Unlock Job to use this Feature"
                  }
                  placement="top"
                >
                  <div
                    onClick={() => {
                      if (data?.is_unlocked) {
                        setCompanyConnModal(true);
                      }
                    }}
                    className="flex gap-3 font-[500] text-sm items-center justify-center p-3 rounded-2xl cursor-pointer shadowColor2 border w-full sm:w-fit"
                  >
                    <div className="w-8 h-[30px]">
                      <img src="/folder.svg" className="w-full h-full" />
                    </div>
                    <span>Find Company Connections</span>
                    {!data?.is_unlocked && (
                      <LockIcon sx={{ fontSize: "20px" }} />
                    )}
                  </div>
                </Tooltip>
              </div>
              <hr className="my-4" />

              {loading ? (
                <>
                  <Skeleton
                    variant="rounded"
                    height={80}
                    sx={{ marginTop: "10px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    height={80}
                    sx={{ marginTop: "10px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    height={80}
                    sx={{ marginTop: "10px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    height={80}
                    sx={{ marginTop: "10px" }}
                  />
                </>
              ) : (
                <div>
                  <div className="p-2 px-3 rounded-lg font-semibold bg-[#fafafa]">
                    Job Summary
                  </div>
                  <div className="text-gray-800 px-2 leading-7 py-4 font-[500] text-[14px] pr-10 md:px-8 md:text-[15px]">
                    <ReactMarkdown
                      components={{
                        ul: (props) => (
                          <ul className="list-disc pl-6" {...props} />
                        ),
                      }}
                    >
                      {data?.job_description}
                    </ReactMarkdown>
                  </div>
                  <div className="p-2 px-3 rounded-lg font-semibold bg-[#fafafa]">
                    Required Skills and Qualifications
                  </div>
                  <div className="text-gray-800 font-[500] px-2 py-4 text-[14px] md:px-8">
                    <ReactMarkdown
                      components={{
                        ul: (props) => (
                          <ul className="list-disc pl-6" {...props} />
                        ),
                      }}
                    >
                      {data?.qualifications}
                    </ReactMarkdown>
                  </div>
                  <hr className="mt-6 mb-3" />
                  <h1 className="text-[22px] font-semibold">
                    About The Company
                  </h1>
                  <div className="mt-4 flex items-center flex-col gap-4 md:flex-row">
                    <div className="flex items-center gap-3">
                      <div className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] shadowColor2 flex justify-center items-center rounded-lg md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px]">
                        <img
                          src="https://app.ziphire.hr/assets/img/job-icon.png"
                          alt="some"
                          className="w-[80%] h-[80%]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 md:items-start">
                      <h6 className="text-sm font-bold">
                        {data?.company_name}
                      </h6>
                      <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start md:w-[90%]">
                        <div className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg">
                          <MapIcon />
                          <span className="text-[13px] font-[500] text-[#2c2b2b]">
                            {data?.scraped_job_json?.jobLocation}
                          </span>
                        </div>
                        <a
                          href={data?.scraped_job_json?.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg cursor-pointer"
                        >
                          <LanguageIcon
                            sx={{ fontSize: "20px", color: "#9587C0" }}
                          />
                          <span className="text-[13px] font-[500] text-[#2c2b2b]">
                            Company Website
                          </span>
                          <LaunchIcon
                            sx={{ fontSize: "15px", color: "#535259" }}
                          />
                        </a>

                        <a
                          href={data?.scraped_job_json?.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-[#fafafa] p-1 px-2 rounded-lg cursor-pointer"
                        >
                          <LinkedInIcon sx={{ color: "#9587C0" }} />
                          <span className="text-[13px] font-[500] text-[#2c2b2b]">
                            LinkedIn
                          </span>
                          <LaunchIcon
                            sx={{ fontSize: "15px", color: "#535259" }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
