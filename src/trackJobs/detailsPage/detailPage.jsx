import { useEffect, useRef, useState } from "react";
import {
  getCoverLetterById,
  getJobConnectionsById,
  getJobDetailsById,
  getRecentResume,
  getReminders,
  getSkillTrackerById,
  postStatusJob,
} from "../../apis/trackJobs";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MapIcon from "../../svgs/mapIcon";
import ClockIcon from "../../svgs/clockIcon";
import BuildingIcon from "../../svgs/buildingIcon";
import BarChartIcon from "../../svgs/barChartIcon";
import CalendarIcon from "../../svgs/calendarIcon";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactMarkdown from "react-markdown";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Connections from "./connections";
import SkillTracker from "./skillTracker";
import Resumes from "./Resume";
import CoverLetter from "./coverLetter";
import EmailTemplates from "./emailTemplates";
import Reminder from "./reminders";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [optionValue, setOptionValue] = useState("");
  const [buttonIndex, setButtonIndex] = useState(0);
  const [connections, setConnections] = useState([]);
  const [skills, setSkills] = useState({});
  const [resume, setResume] = useState({});
  const [coverLetters, setCoverLetters] = useState([]);
  const [reminders, setReminders] = useState([]);
  const buttonRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const buttonPage = {
    0: <Connections connections={connections} />,
    1: <SkillTracker skills={skills} />,
    2: <Resumes resume={resume} />,
    3: <CoverLetter coverLetters={coverLetters} />,
    4: <EmailTemplates id={id} />,
    5: <Reminder reminders={reminders} id={id} setReminders={setReminders} />,
  };
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const res = await getJobDetailsById(id);
        console.log("Job details", res.data);
        setData(res.data);
        if (res.data?.status) {
          setOptionValue(wordFormatter(res.data?.status));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, []);

  useEffect(() => {
    if (!data.job) return;
    const fetchConnections = async () => {
      try {
        const res = await getJobConnectionsById(data?.job);
        console.log("Connections", res.data);
        setConnections(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchTrackerSkills = async () => {
      try {
        const res = await getSkillTrackerById(data?.job);
        console.log("Tracker skills", res.data);
        setSkills(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchRecentResume = async () => {
      try {
        const res = await getRecentResume(data?.job);
        console.log("recent resumes", res.data);
        setResume(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCoverLetters = async () => {
      try {
        const res = await getCoverLetterById(data?.job);
        console.log("Cover Letters", res.data);
        setCoverLetters(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchReminders = async () => {
      try {
        const res = await getReminders(id);
        console.log("Reminders", res.data);
        setReminders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchConnections();
    fetchTrackerSkills();
    fetchRecentResume();
    fetchCoverLetters();
    fetchReminders();
  }, [data?.job]);
  const circleStyle = {
    pathColor: "#A38AF1",
    trailColor: "transparent",
    textSize: "30px",
    textColor: "black",
  };
  const textField_style = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      backgroundColor: "#fafafa",
      "& fieldset": {
        borderColor: "#e2e8f0",
      },
      "&:hover fieldset": {
        borderColor: "#e2e8f0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e2e8f0",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#686060",
    },
    "& .MuiFormHelperText-root": {
      color: "#e97979",
      margin: "10px 0 0 0",
    },
  };
  const wordFormatter = (word) => {
    return word
      ?.split("_")
      ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      ?.join(" ");
  };

  const buttons = [
    "Connections",
    "Skill Tracker",
    "Resumes",
    "Cover Letter",
    "Email Templates",
    "Reminders",
  ];

  useEffect(() => {
    const post_jobStatus = async () => {
      try {
        const jobStatusTabs = {
          "In Process": "in_process",
          "Interview Scheduled": "interview_scheduled",
          "Offer Received": "offer_received",
          Rejected: "rejected",
        };
        const res = await postStatusJob(id, {
          status: jobStatusTabs[optionValue],
        });
      } catch (err) {
        console.log(err);
      }
    };
    post_jobStatus();
  }, [optionValue]);

  useEffect(() => {
    const checkScroll = () => {
      if (!buttonRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = buttonRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
    };
    checkScroll();
    buttonRef.current.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, []);
  const scroll = (direction) => {
    if (buttonRef.current) {
      buttonRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-4 px-1 sm:px-5">
      <h1 className="text-[28px] font-bold ml-2 sm:ml-0">
        Application Details
      </h1>
      <div className="flex items-center gap-3 ml-1 mt-5 sm:ml-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-white rounded-2xl p-2 flex justify-center items-center shadowColor2"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "22px", color: "#4c4242" }} />
        </button>
        <p className="font-[500]">Back to Jobs</p>
      </div>
      <div>
        <div className="bg-white mt-5 p-4 rounded-xl shadowColor2">
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
                  <h1 className="text-[22px] text-center font-[500] md:text-start">
                    {data?.job_detail?.job_title}
                  </h1>
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
                    {data?.job_detail?.company_name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex my-4 items-center gap-3 md:my-0">
              <span className="text-[13px] text-[#292929] whitespace-nowrap">
                Job Status:
              </span>
              <TextField
                label="Application Status"
                value={optionValue}
                onChange={(e) => setOptionValue(e.target.value)}
                select
                sx={{
                  width: "200px",
                  ...textField_style,
                }}
              >
                {[
                  "In Process",
                  "Interview Scheduled",
                  "Offer Received",
                  "Rejected",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
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
                  {data?.job_detail?.city +
                    ", " +
                    data?.job_detail?.country_name}
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
                  {data?.job_detail?.selected_job_type}
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
                <BuildingIcon />
                <span className="text-[13px] text-[#2c2b2b]">
                  {data?.job_detail?.selected_work_mode}
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
                  {data?.job_detail?.experience_level_display}
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
                  {`${data?.job_detail?.experience_level} years Exp`}
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
          <hr className="my-4" />
          {loading ? (
            <>
              <Skeleton
                variant="rounded"
                height={80}
                sx={{ marginTop: "10px" }}
              />
            </>
          ) : (
            <div>
              <div className="p-2 px-3 rounded-lg font-semibold bg-[#fafafa]">
                Required Skills and Qualifications
              </div>
              <div className="text-gray-800 font-[500] px-2 py-4 text-[14px] md:px-8">
                <ReactMarkdown
                  components={{
                    ul: (props) => <ul className="list-disc pl-6" {...props} />,
                  }}
                >
                  {data?.job_detail?.qualifications}
                </ReactMarkdown>
              </div>
              <hr className="mt-6 mb-3" />
            </div>
          )}
          <div className="flex items-center mt-4">
            {showLeftButton && (
              <button
                className="bg-[#fafafa] p-2"
                onClick={() => scroll("left")}
              >
                <div className="bg-white shadowColor2 rounded-xl p-1 px-2">
                  <ArrowBackIosNewIcon sx={{ fontSize: "15px" }} />
                </div>
              </button>
            )}
            <div
              className="p-1 flex gap-3 overflow-x-auto overflow-y-visible no-scrollbar whitespace-nowrap"
              ref={buttonRef}
            >
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => setButtonIndex(index)}
                  type="button"
                  className={`font-[500] whitespace-nowrap transition-all duration-300 shadowColor2 px-3 py-2 rounded-2xl border-2  ${
                    index === buttonIndex
                      ? "bg-[#7CFCA6] border-black"
                      : "border-transparent bg-white"
                  }`}
                >
                  {button}
                </button>
              ))}
            </div>
            {showRightButton && (
              <button
                className="bg-[#fafafa] p-2"
                onClick={() => scroll("right")}
              >
                <div className="bg-white shadowColor2 rounded-xl p-1 px-2">
                  <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
                </div>
              </button>
            )}
          </div>
          <div className="mt-8">{buttonPage[buttonIndex]}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
