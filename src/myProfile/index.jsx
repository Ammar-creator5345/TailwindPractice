import { useEffect, useRef, useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import WarningIcon from "./warningIcon";
import SideDrawer from "./sideDrawer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  getProfile,
  getCompletionPercentage,
  getEducations,
  getWorks,
  getSkills,
  getLanguages,
  getProjects,
  getCertificates,
  getPublications,
  getHobbies,
  getStats,
  getAllCountries,
  getRecommendedSkills,
  getAllSkills,
  getAllLanguages,
  getAboutMe,
} from "../apis/mainApi";
import { useNavigate } from "react-router-dom";
import ZakiAi from "../components/zakiAi";

const MyProfile = () => {
  const [zakiOpen, setZakiOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [selectedBtn, setSeletedBtn] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [ProfileCompletion, setProfileCompletion] = useState({});
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [publications, setPublications] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [stats, setStats] = useState({});
  const [countries, SetCountries] = useState([]);
  const [showRightBtn, setShowRightBtn] = useState(false);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const navigate = useNavigate();

  // for the fields of Form
  const [profileDataApi, setProfileDataApi] = useState({});
  const [allSkills, setAllSkills] = useState([]);
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [excludedIds, setExcludedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]);
  const [resumeQualityLoading, setResumeQualityLoading] = useState(false);

  useEffect(() => {
    const clickOutsideButton = (e) => {
      if (!ref.current.contains(e.target)) {
        setSeletedBtn(null);
      }
    };
    document.addEventListener("mousedown", clickOutsideButton);
    const checkScroll = () => {
      if (!ref.current) {
        return;
      }
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setShowLeftBtn(scrollLeft > 0);
      setShowRightBtn(scrollLeft + clientWidth < scrollWidth - 1);
    };
    checkScroll();

    ref.current.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    getProfile().then((res) => {
      // console.log(res.data.data);
      setProfileData(res.data.data);
      const value = res?.data?.data;
      const formattedProfileData = {
        jobTitle: value?.dev_title || "",
        firstName: value?.user?.first_name || "",
        lastName: value?.user?.last_name || "",
        countryCode: value?.user?.country || "",
        phoneNumber: value?.user?.mobile || "",
        city: value?.city_residence || "",
        email: value?.user?.email || "",
        linkedinLink: value?.linkedin_url || "",
        gitHubLink: value?.github_url || "",
        countryDigit: value?.country_residence?.iso2,
      };
      setProfileDataApi(formattedProfileData);
    });
    setResumeQualityLoading(true);
    getCompletionPercentage().then((res) => {
      console.log("Profile Completion", res.data);
      setProfileCompletion(res.data);
      setResumeQualityLoading(false);
    });
    getEducations().then((res) => {
      console.log("Educations", res.data.data);
      const cgpaSystemMap = {
        cgpa_4: "CGPA(out of 4)",
        cgpa_5: "CGPA(out of 5)",
        cgpa_10: "CGPA(out of 10)",
        percentage: "Percentage",
      };
      const degreeSystem = {
        1: "Doctorate(or equivalent)",
        2: "Masters(or equivalent)",
        3: "MBA(or equivalent)",
        4: "Bachelors(or equivalent)",
      };
      const FormattedEducation = res.data.data.map((edu) => ({
        id: edu?.id ? edu.id : null,
        schoolName: edu.school ? edu.school : "",
        degreeName: edu.field_of_study ? edu.field_of_study : "",
        degreeType: edu.degree ? degreeSystem[edu.degree] : "",
        score: edu.score ? edu.score : "",
        scoreType: edu.score_type ? cgpaSystemMap[edu.score_type] : "",
        startYear: edu.started_year ? edu.started_year : "",
        completionYear: edu.completed_year ? edu.completed_year : "",
        location: edu.location ? edu.location : "",
        description: edu.description ? edu.description : "",
      }));
      setEducation(FormattedEducation);
    });
    getWorks().then((res) => {
      const formattedWorkHistory = res.data.data.map((work) => ({
        id: work.id ? work.id : null,
        jobTitle: work.role ? work.role : "",
        companyName: work.company_name ? work.company_name : "",
        startDate: work.start_date ? work.start_date : "",
        endDate: work.is_running ? "" : work.end_date ? work.end_date : "",
        workLocation: work.location ? work.location : "",
        description: work.description ? work.description : "",
        present: work.is_running ? work.is_running : false,
      }));
      setWork(formattedWorkHistory);
    });
    getSkills().then((res) => {
      console.log("skills", res.data.data);
      const formattedSkills = res.data.data.map((skill) => ({
        id: skill?.id ? skill.id : "",
        skill: skill?.label ? skill.label : "",
      }));
      setSkills(formattedSkills);
    });
    getLanguages().then((res) => {
      console.log("Languages", res.data.data);
      setLanguages(res.data.data);
    });
    getProjects().then((res) => {
      console.log("Projects", res.data.data);
      setProjects(res.data.data);
    });
    getCertificates().then((res) => {
      console.log("certificates", res.data.data);
      setCertificates(res.data.data);
    });
    getPublications().then((res) => {
      console.log("Publications", res.data.data);
      setPublications(res.data.data);
    });
    getHobbies().then((res) => {
      console.log("Hobbies", res.data.data);
      setHobbies(res.data.data);
    });
    getAllCountries().then((res) => {
      console.log("All countries", res.data.data);
      const formattedCountries = res?.data?.data.map((country) => ({
        id: country?.id || "",
        label: country?.label || "",
        CountryCode: country?.phone_code || "",
      }));
      SetCountries(formattedCountries);
    });

    getStats().then((res) => {
      console.log("Stats", res.data);
      setStats(res.data);
    });

    getAllSkills().then((res) => {
      console.log("all skills", res.data.data || res.data);
      setAllSkills(res.data.data || res.data);
    });

    setLoading(true);
    getRecommendedSkills(excludedIds.join(",")).then((res) => {
      console.log("recommended skills", res.data.data || res.data);
      setRecommendedSkills(res.data.data || res.data);
      setLoading(false);
    });
    getAllLanguages().then((res) => {
      console.log("all languages", res.data.data);
      setAllLanguages(res.data.data);
    });
    getAboutMe().then((res) => {
      console.log("about me", res.data.data || res.data);
    });

    return () => {
      document.removeEventListener("mousedown", clickOutsideButton);
      if (ref.current) {
        ref.current.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, []);
  const scroll = (section) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: section === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    setLoading(true);
    getRecommendedSkills(excludedIds.join(",")).then((res) => {
      setRecommendedSkills(res.data.data || res.data);
      setLoading(false);
    });
  }, [excludedIds]);
  useEffect(() => {
    console.log("blah blah blah");
  }, [!setOpen]);

  const dateFormatter = (value) => {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };
  const formSections = [
    "Personal Info",
    "Education",
    "Work History",
    "Skills",
    "Languages",
    "Projects",
    "Certificates",
    "Publications",
    "Hobbies & Interests",
  ];
  const refetchApis = () => {
    getProfile().then((res) => {
      setProfileData(res.data.data);
      const value = res?.data?.data;
      const formattedProfileData = {
        jobTitle: value?.dev_title || "",
        firstName: value?.user?.first_name || "",
        lastName: value?.user?.last_name || "",
        countryCode: value?.user?.country || "",
        phoneNumber: value?.user?.mobile || "",
        city: value?.city_residence || "",
        email: value?.user?.email || "",
        linkedinLink: value?.linkedin_url || "",
        gitHubLink: value?.github_url || "",
        countryDigit: value?.country_residence?.iso2,
      };
      setProfileDataApi(formattedProfileData);
    });
    getCompletionPercentage().then((res) => {
      setProfileCompletion(res.data);
    });
    getEducations().then((res) => {
      console.log("Educations", res.data.data);
      const cgpaSystemMap = {
        cgpa_4: "CGPA(out of 4)",
        cgpa_5: "CGPA(out of 5)",
        cgpa_10: "CGPA(out of 10)",
        percentage: "Percentage",
      };
      const degreeSystem = {
        1: "Doctorate(or equivalent)",
        2: "Masters(or equivalent)",
        3: "MBA(or equivalent)",
        4: "Bachelors(or equivalent)",
      };
      const FormattedEducation = res.data.data.map((edu) => ({
        id: edu?.id ? edu.id : null,
        schoolName: edu.school ? edu.school : "",
        degreeName: edu.field_of_study ? edu.field_of_study : "",
        degreeType: edu.degree ? degreeSystem[edu.degree] : "",
        score: edu.score ? edu.score : "",
        scoreType: edu.score_type ? cgpaSystemMap[edu.score_type] : "",
        startYear: edu.started_year ? edu.started_year : "",
        completionYear: edu.completed_year ? edu.completed_year : "",
        location: edu.location ? edu.location : "",
        description: edu.description ? edu.description : "",
      }));
      setEducation(FormattedEducation);
    });
    getWorks().then((res) => {
      const formattedWorkHistory = res.data.data.map((work) => ({
        id: work.id ? work.id : null,
        jobTitle: work.role ? work.role : "",
        companyName: work.company_name ? work.company_name : "",
        startDate: work.start_date ? work.start_date : "",
        endDate: work.is_running ? "" : work.end_date ? work.end_date : "",
        workLocation: work.location ? work.location : "",
        description: work.description ? work.description : "",
        present: work.is_running ? work.is_running : false,
      }));
      setWork(formattedWorkHistory);
    });
    getSkills().then((res) => {
      const formattedSkills = res.data.data.map((skill) => ({
        id: skill?.id ? skill.id : "",
        skill: skill?.label ? skill.label : "",
      }));
      setSkills(formattedSkills);
    });
    getLanguages().then((res) => {
      setLanguages(res.data.data);
    });
    getProjects().then((res) => {
      setProjects(res.data.data);
    });
    getCertificates().then((res) => {
      setCertificates(res.data.data);
    });
    getPublications().then((res) => {
      setPublications(res.data.data);
    });
    getHobbies().then((res) => {
      setHobbies(res.data.data);
    });
    getStats().then((res) => {
      console.log("Stats", res.data);
      setStats(res.data);
    });
  };
  return (
    <>
      <ZakiAi open={zakiOpen} setOpen={setZakiOpen} />
      <SideDrawer
        profileDataApi={profileDataApi}
        open={open}
        setOpen={setOpen}
        countries={countries}
        profileData={profileData}
        education={education}
        work={work}
        skills={skills}
        allSkills={allSkills}
        recommendedSkills={recommendedSkills}
        setExcludedIds={setExcludedIds}
        loading={loading}
        allLanguages={allLanguages}
        languages={languages}
        hobbies={hobbies}
        projects={projects}
        certificates={certificates}
        publications={publications}
        ProfileCompletion={ProfileCompletion}
        resumeQualityLoading={resumeQualityLoading}
        refetchApis={refetchApis}
      />
      <div className={`p-2 bg-[#FAFAFA] sm:p-4 md:p-10 `}>
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
        <h1 className="text-[25px] font-bold">My Profile</h1>
        <div className="relative">
          {showLeftBtn && (
            <div
              onClick={() => scroll("left")}
              className="p-2 px-3 cursor-pointer border bg-white rounded-2xl absolute left-0 top-[16%]"
            >
              <ArrowBackIosNewIcon sx={{ fontSize: "10px" }} />
            </div>
          )}
          <div
            ref={ref}
            className="flex overflow-x-auto no-scrollbar gap-3 py-2 mt-5 mx-4"
          >
            {formSections.map((value, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSeletedBtn(index);
                  const sectionId = value.toLowerCase().replace(/\s+/g, "-");
                  const section = document.getElementById(sectionId);
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
                className={`px-[10px] whitespace-nowrap text-[15px] border-2 transition-all duration-300 py-2 rounded-2xl shadowColor2 font-semibold
              ${
                index === 0
                  ? "bg-[#7CFCA6] border-black"
                  : selectedBtn === index
                  ? "border-black bg-white"
                  : "border-transparent bg-white"
              }`}
              >
                {value}
              </button>
            ))}
          </div>
          {showRightBtn && (
            <div
              onClick={() => scroll("right")}
              className="p-2 px-3 cursor-pointer border bg-white rounded-2xl absolute right-0 top-[16%]"
            >
              <ArrowForwardIosIcon sx={{ fontSize: "10px" }} />
            </div>
          )}
        </div>
        <div className="shadowColor2  bg-white mt-8 rounded-2xl px-3 py-2 flex flex-col sm:flex-row justify-between">
          <div className="flex items-center gap-2 text-[15px]">
            <WarningIcon />
            <span>
              Your profile is{" "}
              <span className="font-semibold">{`${ProfileCompletion?.profile_completion_percentage}%`}</span>{" "}
              complete. A strong profile increases your chances.
            </span>
          </div>
          <div className="flex mt-4 sm:mt-0 justify-center items-center">
            <button
              type="button"
              className="bg-black whitespace-nowrap w-fit font-semibold rounded-2xl p-2 px-3 text-white"
              onClick={() => setOpen(true)}
            >
              Complete Profile
            </button>
          </div>
        </div>
        <div className="shadowColor2 bg-white mt-5 rounded-2xl p-5 pl-8">
          <div className="flex gap-4 relative">
            <div className="w-[100px] min-w-[100px] min-h-[100px] h-[100px] rounded-3xl overflow-hidden">
              <img
                src={
                  profileData?.user?.profile_img
                    ? profileData?.user?.profile_img
                    : `https://app.ziphire.hr/assets/img/avatar-male.png`
                }
                alt=""
              />
            </div>
            <div className="mt-3">
              <div className="text-[23px] flex items-center gap-2 pr-9 flex-wrap whitespace-nowrap font-semibold">
                <span>{profileData?.user?.first_name} </span>
                <span>{profileData?.user?.last_name}</span>
              </div>
              <div className="flex gap-2 pr-5 flex-col sm:flex-row flex-wrap">
                <div className="flex items-center justify-center gap-1 bg-[#FAFAFA] w-fit rounded-2xl py-[3px] px-2 ">
                  <FmdGoodIcon sx={{ color: "#9587C0", fontSize: "20px" }} />
                  <span className="text-[12px]">
                    {profileData?.city_residence},{" "}
                    {profileData?.country_residence?.label}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 bg-[#FAFAFA] w-fit rounded-2xl py-[3px] px-2 ">
                  <MailIcon sx={{ color: "#9587C0", fontSize: "20px" }} />
                  <span className="text-[12px]">
                    {profileData?.user?.email}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 bg-[#FAFAFA] w-fit rounded-2xl py-[3px] px-2 ">
                  <LocalPhoneIcon sx={{ color: "#9587C0", fontSize: "20px" }} />
                  <span className="text-[12px]">
                    {profileData?.user?.mobile}
                  </span>
                </div>
                <a href={profileData?.linkedin_url} target="_blank">
                  <div className="flex items-center justify-center gap-1 bg-[#FAFAFA] w-fit rounded-2xl py-[3px] px-2 ">
                    <LinkedInIcon sx={{ color: "#9587C0", fontSize: "20px" }} />
                    <span className="text-[12px]">LinkedIn</span>
                    <OpenInNewIcon
                      sx={{ color: "#514343", fontSize: "15px" }}
                    />
                  </div>
                </a>
                <a href={profileData?.github_url} target="_blank">
                  <div className="flex items-center justify-center gap-1 bg-[#FAFAFA] w-fit rounded-2xl py-[3px] px-2 ">
                    <GitHubIcon sx={{ color: "#9587C0", fontSize: "20px" }} />
                    <span className="text-[12px]">GitHub</span>
                    <OpenInNewIcon
                      sx={{ color: "#514343", fontSize: "15px" }}
                    />
                  </div>
                </a>
              </div>
            </div>
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer absolute right-0 top-0"
            >
              <ModeEditOutlinedIcon />
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly mt-3">
            <div className="flex flex-col gap-2 items-center justify-center border-b p-4 border-gray-400 w-1/2 md:w-1/4 md:border-b-transparent">
              <span className="font-[500]">Job Applied</span>
              <span className="text-xl font-bold">
                {stats?.total_applications}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center border-b p-4 border-gray-400 w-1/2 md:w-1/4 md:border-l md:border-b-transparent">
              <span className="font-[500]">Hired</span>
              <span className="text-xl font-bold">{stats?.hired}</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center border-b p-4 border-gray-400 w-1/2 md:w-1/4 md:border-l md:border-b-transparent">
              <span className="font-[500]">In Process</span>
              <span className="text-xl font-bold">
                {stats?.in_process_applications}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center border-b p-4 border-gray-400 w-1/2 md:w-1/4 md:border-l md:border-b-transparent">
              <span className="font-[500]">Rejected</span>
              <span className="text-xl font-bold">
                {stats?.rejected_applications}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 mr-3 rounded-2xl bg-[#FAFAFA] mt-4">
            <div className="flex items-center gap-2">
              <ArticleOutlinedIcon sx={{ color: "#725858" }} />
              <span>Manage Resume</span>
            </div>
            <div
              onClick={() => navigate("/resumes")}
              className="flex justify-center items-center bg-[#7CFCA6] p-2 rounded-xl cursor-pointer"
            >
              <ArrowForwardIosOutlinedIcon
                sx={{
                  fontSize: "16px",
                }}
              />
            </div>
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-0 md:pr-4">
            <h1 className="text-2xl font-semibold my-5">About Me</h1>
            <span className="text-[15px]" id="personal-info">
              {profileData?.about}
            </span>
            <div className="flex mt-3">
              <h5 className="text-[15px] whitespace-nowrap font-bold mr-3">
                Work Preference:
              </h5>
              <div className="flex items-center flex-wrap gap-2">
                {(profileData?.preferred_job_type || []).map((value, index) => (
                  <span
                    key={index}
                    className="bg-[#FAFAFA] whitespace-nowrap text-[12px] rounded-full px-2 py-1 font-[500]"
                  >
                    {value.type}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex mt-2">
              <h5 className="text-[15px] whitespace-nowrap font-bold mr-3">
                Work Mode:
              </h5>
              <div className="flex items-center flex-wrap gap-2">
                {(profileData?.work_mode || []).map((value, index) => (
                  <span
                    key={index}
                    className="bg-[#FAFAFA] whitespace-nowrap text-[12px] rounded-full px-2 py-1 font-[500]"
                  >
                    {value.mode}
                  </span>
                ))}
              </div>
            </div>
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer absolute right-0 top-1"
            >
              <ModeEditOutlinedIcon />
            </div>
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-4 md:pr-10">
            <h1 className="text-2xl font-semibold my-5" id="education">
              Education
            </h1>
            {education?.map((value) => (
              <div key={value.id}>
                <div className="bg-[#FAFAFA] rounded-xl p-2 px-4 text-[15px] font-[500]">
                  <div className="flex items-center gap-1">
                    <span>{value?.startYear}</span>
                    <span>-</span>
                    <span>{value?.completionYear}</span>
                  </div>
                </div>
                <div className="mt-3 px-4">
                  <h4 className="text-[16px] font-semibold">
                    {value?.schoolName}
                  </h4>
                  <div className="flex gap-1 whitespace-nowrap flex-wrap items-center text-[13px] font-[500] my-1">
                    <span>{value?.degreeType}</span>
                    <span>.</span>
                    <span>{value?.degreeName}</span>
                  </div>
                  <div className="flex gap-1 items-center text-[13px] font-[500] my-1">
                    <span>{value?.score}</span>
                    <span>.</span>
                    <span>{value?.scoreType}</span>
                  </div>
                  <div className="text-[13px] font-[500] my-1">
                    {value?.location}
                  </div>
                  <div className="text-[13px] font-[500] my-1">
                    {value?.description}
                  </div>
                </div>
                <div
                  onClick={() => setOpen(true)}
                  className="cursor-pointer absolute right-0 top-1"
                >
                  <ModeEditOutlinedIcon />
                </div>
              </div>
            ))}
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-4 md:pr-10">
            <h1 className="text-2xl font-semibold my-5" id="work-history">
              Work History
            </h1>
            {work?.map((value) => (
              <div key={value.id}>
                <div className="bg-[#FAFAFA] rounded-xl p-2 px-4 text-[15px] font-[500]">
                  <div className="flex items-center gap-1">
                    <span>{dateFormatter(value?.startDate)}</span>
                    <span>-</span>
                    <span>
                      {value?.present
                        ? value?.endDate
                        : dateFormatter(value?.endDate)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 px-4">
                  <h4 className="text-[16px] font-semibold">
                    {value?.companyName}
                  </h4>
                  <div className="text-[13px] font-[500] my-1">
                    {value?.jobTitle}
                  </div>
                  <div className="text-[13px] font-[500] my-1">
                    {value?.description}
                  </div>
                </div>
                <div
                  onClick={() => setOpen(true)}
                  className="cursor-pointer absolute right-0 top-1"
                >
                  <ModeEditOutlinedIcon />
                </div>
              </div>
            ))}
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-10">
            <h1 className="text-2xl font-semibold mt-5 mb-3" id="skills">
              Skills
            </h1>
            <div className="flex gap-2 flex-wrap">
              {skills?.map((value) => (
                <span
                  key={value.id}
                  className="text-[12px] bg-[#F4D06F] rounded-full font-[500] py-[3px] px-2 whitespace-nowrap"
                >
                  {value?.skill}
                </span>
              ))}
            </div>
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer absolute right-0 top-1"
            >
              <ModeEditOutlinedIcon />
            </div>
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-10">
            <h1 className="text-2xl font-semibold mt-5 mb-3" id="languages">
              Languages
            </h1>
            <div className="flex justify-between gap-4 flex-wrap">
              {languages?.map((value) => (
                <div
                  key={value.id}
                  className="flex flex-col gap-2 w-full md:w-[49%]"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[14px]">
                      {value?.language_details?.name}
                    </span>
                    <span className="text-[14px]">{value?.proficiency}</span>
                  </div>
                  <div className="h-[20px] bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#7CFCBE] ${
                        value?.proficiency === "beginner"
                          ? "w-[33%]"
                          : value?.proficiency === "intermediate"
                          ? "w-[66%]"
                          : value?.proficiency === "fluent/native"
                          ? "w-[100%]"
                          : "w-[10%]"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer absolute right-0 top-1"
            >
              <ModeEditOutlinedIcon />
            </div>
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-4 md:pr-10">
            <h1 className="text-2xl font-semibold my-5" id="projects">
              Projects
            </h1>
            {projects?.map((value) => (
              <div key={value.id}>
                <div className="bg-[#FAFAFA] rounded-xl p-2 px-4 text-[15px] font-[500]">
                  <div className="flex items-center gap-1">
                    <span>{dateFormatter(value?.start_date)}</span>
                    <span>-</span>
                    <span>
                      {value?.is_running
                        ? value?.end_date
                        : dateFormatter(value?.end_date)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 px-4">
                  <h4 className="text-[16px] font-semibold">{value?.label}</h4>
                  <div className="text-[13px] font-[500] my-1">
                    {value?.description}
                  </div>
                </div>
                <div
                  onClick={() => setOpen(true)}
                  className="cursor-pointer absolute right-0 top-1"
                >
                  <ModeEditOutlinedIcon />
                </div>
              </div>
            ))}
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-4 md:pr-10">
            <h1 className="text-2xl font-semibold mt-5 mb-3" id="certificates">
              Certificates
            </h1>
            {certificates?.map((value) => (
              <div key={value.id}>
                <div className="bg-[#FAFAFA] rounded-xl p-2 px-4 text-[15px] font-[500]">
                  <div className="flex items-center gap-1">
                    {dateFormatter(value?.date_awarded)}
                  </div>
                </div>
                <div className="mt-3 px-4">
                  <h4 className="text-[16px] font-semibold">{value?.title}</h4>
                  <div className="flex gap-1 items-center text-[13px] font-[500] my-1">
                    <span>{value?.organization}</span>
                  </div>
                  <div className="text-[13px] font-[500] my-1">
                    {value?.description}
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer absolute right-0 top-1"
            >
              <ModeEditOutlinedIcon />
            </div>
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-4 md:pr-10">
            <h1 className="text-2xl font-semibold mt-5 mb-3" id="publications">
              Publications
            </h1>
            {publications?.map((value) => (
              <div key={value.id}>
                <div className="bg-[#FAFAFA] rounded-xl p-2 px-4 text-[15px] font-[500]">
                  <div className="flex items-center gap-1">
                    {dateFormatter(value?.publication_date)}
                  </div>
                </div>
                <div className="mt-3 px-4">
                  <h4 className="text-[16px] font-semibold">{value?.title}</h4>
                  <h4 className="text-[13px] font-[500] my-1">
                    {value?.journal}
                  </h4>
                  <a
                    href={value?.url}
                    className="text-[13px] font-[500] my-1 text-[#4141c0] hover:text-black"
                  >
                    {value?.url}
                  </a>
                  <div className="text-[13px] font-[500] my-1">
                    {value?.abstract}
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer absolute right-0 top-1"
            >
              <ModeEditOutlinedIcon />
            </div>
          </div>
          <hr className="border-t-2 mt-5" />
          <div className="relative pr-10">
            <h1
              className="text-2xl font-semibold mt-5 mb-3"
              id="hobbies-&-interests"
            >
              Hobbies & Interests
            </h1>
            <div className="flex gap-2 flex-wrap">
              {hobbies?.map((value) => (
                <span
                  key={value.id}
                  className="text-[12px] bg-[#FAFAFA] rounded-full font-[500] py-[3px] px-2 whitespace-nowrap"
                >
                  {value?.title}
                </span>
              ))}
            </div>
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer absolute right-0 top-1"
            >
              <ModeEditOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
