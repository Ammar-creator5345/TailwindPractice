import Drawer from "@mui/material/Drawer";
import { IoIosArrowBack } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createElement, useEffect, useState } from "react";
import useCountries from "../rawData/countries";
import { MenuItem } from "@mui/material";
import { MdDeleteForever, MdPadding } from "react-icons/md";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import axios from "axios";
import ProfilePhoto from "./profilePhoto";
import Certificates from "./certificates";
import Internships from "./interships";
import Projects from "./projects";
import Courses from "./courses";
import Hobbies from "./hobbies";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CustomAccordion } from "./customAccordion";
import PreviewPage from "./previewPage";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import { validationSchema } from "./validationSchema";

export default function ResumeSideDrawer({ open, setOpen, uploadedResume }) {
  const { countries } = useCountries();
  const token = localStorage.getItem("token");
  const [myAccordion, setMyAccordion] = useState([]);
  const [resumeQuality, setResumeQuality] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [aboutMe, setAboutMe] = useState({});
  const [profileImage, setProfileImage] = useState({});
  const [education, setEducation] = useState([]);
  const [workHistory, setWorkHistory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [internships, setInternShips] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [openResumeExit, setOpenResumeExit] = useState(false);
  const handleOpenResumeExitModal = () => setOpenResumeExit(true);
  const handleCloseResumeExitModal = () => setOpenResumeExit(false);
  const [resumeQualityLoading, setResumeQualityLoading] = useState(false);

  const styleForResumeExitModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

  const headers = {
    accept: "application/json; version=1.0",
    "x-api-key": "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
    authorization: `Token ${token}`,
  };

  useEffect(() => {
    console.log(uploadedResume);
    setResumeQualityLoading(true);
    if (!open && !uploadedResume?.id) return;
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resume-quality/${uploadedResume?.id}`,
        { headers }
      )
      .then((res) => {
        setResumeQuality(res.data);
        setResumeQualityLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/personal_info`,
        { headers }
      )
      .then((res) => {
        const data = res.data.data;
        const country = countries?.find((c) => {
          return c.id === data.country;
        });
        // console.log(res.data.data);
        setPersonalInfo({ ...data, country: data ? country : "" });
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/about_me`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setAboutMe(res.data.data);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/profile_image`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setProfileImage(res.data.data);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/education`,
        { headers }
      )
      .then((res) => {
        // console.log(res.data.data);
        const FormattedEducation = res.data.data.map((edu) => ({
          schoolName: edu.school ? edu.school : "",
          degreeName: edu.field_of_study ? edu.field_of_study : "",
          degreeType: edu.degree_type ? edu.degree_type : "",
          score: edu.score ? edu.score : "",
          scoreType: edu.score_type ? edu.score_type : "",
          startYear: edu.started_year ? edu.started_year : "",
          completionYear: edu.completed_year ? edu.completed_year : "",
          educationLocation: edu.location ? edu.location : "",
          description: edu.description ? edu.description : "",
        }));
        setEducation(FormattedEducation);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/work_history`,
        { headers }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedWorkHistory = res.data.data.map((work) => ({
          jobTitle: work.role ? work.role : "",
          companyName: work.company_name ? work.company_name : "",
          startDate: work.start_date ? work.start_date : "",
          endDate: work.end_date ? work.end_date : "",
          workLocation: work.location ? work.location : "",
          description: work.description ? work.description : "",
          present: work.is_running ? work.is_running : false,
        }));
        setWorkHistory(formattedWorkHistory);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/skills`,
        { headers }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedSkills = res.data.data.map((skill) => ({
          skill: skill?.label ? skill.label : "",
        }));
        setSkills(formattedSkills);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/language`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedLanguages = res.data.data.map((lan) => ({
          language: lan?.language_details?.name
            ? lan?.language_details?.name
            : "",
          proficiency: lan?.proficiency ? lan?.proficiency : "",
        }));
        setLanguages(formattedLanguages);
      });
    axios
      .get(
        `
    https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/past_projects`,
        { headers }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedProjects = res.data.data.map((project) => ({
          projectName: project?.label ? project.label : "",
          startDate: project?.start_date ? project.start_date : "",
          endDate: project?.end_date ? project.end_date : "",
          description: project?.description ? project.description : "",
        }));
        setProjects(formattedProjects);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/courses`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedCourses = res.data.data.map((course) => ({
          courseName: course?.title ? course.title : "",
          dateAwarded: course?.date_awarded ? course.date_awarded : "",
          organizationName: course?.organization ? course.organization : "",
          description: course?.description ? course.description : "",
        }));
        setCourses(formattedCourses);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/certificates`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedCertificates = res.data.data.map((certificate) => ({
          certificateTitle: certificate?.title ? certificate.title : "",
          dateAwarded: certificate?.date_awarded
            ? certificate.date_awarded
            : "",
          organizationName: certificate?.organization
            ? certificate.organization
            : "",
          description: certificate?.description ? certificate.description : "",
        }));
        setCertificates(formattedCertificates);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/internships`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedInternships = res.data.data.map((internship) => ({
          companyName: internship?.label ? internship.label : "",
          startDate: internship?.start_date ? internship.start_date : "",
          endDate: internship?.end_date ? internship.end_date : "",
          description: internship?.description ? internship.description : "",
        }));
        setInternShips(formattedInternships);
      });
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/hobbies`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        const formattedHobbies = res.data.data.map((hobby) => ({
          hobby: hobby?.title ? hobby.title : "",
        }));
        setHobbies(formattedHobbies);
      });
  }, [open, uploadedResume?.id]);

  const handleDownloadPdf = () => {
    axios
      .get(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/download_pdf`,
        {
          responseType: "blob",
          headers,
        }
      )
      .then((res) => {
        const fileUrl = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.log("could not fetch api", err);
      });
  };
  const InputButtonForSubmit = ({ onClick }) => (
    <>
      <hr className="my-4" />
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={onClick}
          className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
        >
          Save
        </button>
      </div>
    </>
  );
  const FieldItem = ({ placeholder, type, name }) => (
    <div className="flex flex-col w-full">
      <Field
        className="input-style"
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-[12px] text-[#e97979]"
      />
    </div>
  );
  const textField_style = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
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
    "& .MuiFormHelperText-root": {
      color: "#e97979",
      margin: "10px 0 0 0",
    },
  };
  const ZakiAiPortion = ({ title }) => {
    // console.log("Rendering ZakiAiPortion for:", title);
    return (
      <div className="relative">
        <Field
          name={title}
          as="textarea"
          className="textarea-style"
          placeholder="Start Typing -  ZAKI AI will take it from here"
        />
        <ErrorMessage
          name={title}
          component="div"
          className="text-[12px] text-red-400"
        />
        <img
          src="https://app.ziphire.hr/assets/img/zaki_ai_image.jpeg"
          alt="some pic"
          className="w-[30px] h-[30px] rounded-[50%] cursor-pointer absolute bottom-6 right-3"
        />
      </div>
    );
  };

  const accordionContent = {
    Profile_Photo: (
      <ProfilePhoto InputButtonForSubmit={<InputButtonForSubmit />} />
    ),
    Certificates: (
      <Certificates
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
      />
    ),
    Projects: (
      <Projects
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
      />
    ),
    Internships: (
      <Internships
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
      />
    ),
    Courses: (
      <Courses
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
      />
    ),
    Hobbies: <Hobbies FieldItem={FieldItem} />,
  };
  const AddButton = ({ title, text }) => (
    <button
      type="button"
      onClick={() => addAccordion(title)}
      className="flex items-center gap-1 my-2"
    >
      <span className="bg-green-400 px-3 pb-[5px] rounded-[18px] text-3xl">
        +
      </span>
      <span>{text}</span>
    </button>
  );
  const addAccordion = (accordion) => {
    if (myAccordion.includes(accordion)) {
      return;
    } else {
      setMyAccordion([...myAccordion, accordion]);
    }
  };

  const _skills = [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Leadership",
    "Time Management",
    "Critical Thinking",
    "Adaptability",
    "Creativity",
    "Project Management",
    "Negotiation",
    "Customer Service",
    "Data Analysis",
    "Public Speaking",
    "Writing",
    "Conflict Resolution",
    "Strategic Planning",
    "Decision Making",
    "Collaboration",
    "Research",
    "Emotional Intelligence",
  ];

  const ResumeMenuItem = ({ title, items }) => {
    return (
      <div className="border my-3 rounded-lg overflow-hidden">
        <div className="text-md font-semibold bg-[#fafafa] p-[6px]">
          {title}
        </div>
        <div className="flex text-sm divide-x justify-between p-4">
          {items?.map((item, i) => (
            <div key={i} className="flex items-center px-3 gap-2">
              <div className="w-[50px] h-[50px]">
                {resumeQualityLoading ? (
                  <CircularProgress color="success" />
                ) : (
                  item.progressCircle
                )}
              </div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const styleForDrawer = {
    textSize: "26px",
    textColor: "#000000",
    trailColor: "transparent",
  };

  const initialValues = {
    jobTitle: personalInfo?.dev_title ? personalInfo?.dev_title : "",
    firstName: personalInfo?.first_name ? personalInfo?.first_name : "",
    lastName: personalInfo?.last_name ? personalInfo?.last_name : "",
    country: personalInfo?.country ? personalInfo?.country : "",
    location: "",
    email: personalInfo?.email ? personalInfo?.email : "",
    mobileNumber: personalInfo?.mobile ? personalInfo?.mobile : "",
    linkedinLink: personalInfo?.linkedin_url ? personalInfo?.linkedin_url : "",
    githubLink: personalInfo?.github_url ? personalInfo?.github_url : "",
    profilePhoto: profileImage?.profile_img ? profileImage?.profile_img : null,
    description: aboutMe?.about_me_note ? aboutMe?.about_me_note : "",
    education: education.length
      ? education
      : [
          {
            schoolName: "",
            degreeName: "",
            degreeType: "",
            score: "",
            scoreType: "",
            startYear: "",
            completionYear: "",
            educationLocation: "",
            description: "",
          },
        ],
    work: workHistory.length
      ? workHistory
      : [
          {
            jobTitle: "",
            companyName: "",
            startDate: "",
            endDate: "",
            workLocation: "",
            description: "",
            present: false,
          },
        ],
    skills: skills.length ? skills : [],
    languages: languages.length ? languages : [],
    hobbies: hobbies.length
      ? hobbies
      : [
          {
            hobby: "",
          },
        ],
    internships: internships.length
      ? internships
      : [
          {
            companyName: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
    courses: courses.length
      ? courses
      : [
          {
            courseName: "",
            dateAwarded: "",
            organizationName: "",
            description: "",
          },
        ],
    projects: projects.length
      ? projects
      : [
          {
            projectName: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
    certificates: certificates.length
      ? certificates
      : [
          {
            certificateTitle: "",
            dateAwarded: "",
            organizationName: "",
            description: "",
          },
        ],
  };
  const updatePersonalInfo = (values, errors) => {
    if (errors) return;
    axios
      .post(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/personal_info`,
        {
          city: values?.city,
          country: values?.country?.id,
          dev_title: values?.jobTitle,
          email: values?.email,
          first_name: values?.firstName,
          github_url: values?.githubLink,
          last_name: values?.lastName,
          linkedin_url: values?.linkedinLink,
          mobile: values?.mobileNumber,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        alert("successfull posted");
      });
  };

  return (
    <>
      <Modal
        open={openResumeExit}
        onClose={handleCloseResumeExitModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleForResumeExitModal}>
          <h1 className="text-2xl font-semibold text-center">
            Required information is missing. Are you sure you want to exit?
          </h1>
          <div className="flex justify-center my-2">
            <span className="text-[12px] text-[#5c5252] text-center">
              Some required fields are not filled. If you exit now, your
              progress might be lost.
            </span>
          </div>
          <div className="flex justify-center gap-4 box-border mt-6">
            <button
              onClick={() => {
                setOpen(false);
                handleCloseResumeExitModal();
              }}
              type="button"
              className="bg-green-300 rounded-2xl py-3 px-4 font-semibold"
            >
              Yes,Exit
            </button>
            <button
              onClick={() => handleCloseResumeExitModal()}
              type="button"
              className="rounded-2xl py-2 px-3 hover:border hover:border-black font-semibold"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => handleOpenResumeExitModal()}
        slotProps={{
          backdrop: {
            sx: { background: "rgba(0,0,0,0.1)" },
          },
          paper: {
            sx: { width: "88%" },
          },
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({
            values,
            setFieldValue,
            setFieldTouched,
            touched,
            errors,
            setErrors,
          }) => {
            return (
              <Form>
                <div className="flex gap-5">
                  <div className="px-5 py-10 w-[57%] shadowColor">
                    <button
                      type="button"
                      onClick={handleOpenResumeExitModal}
                      className="flex items-center gap-2"
                    >
                      <span className="bg-green-300 p-2 rounded-xl">
                        <IoIosArrowBack size={25} />
                      </span>
                      <span className="text-md font-semibold">
                        Back to My Resumes
                      </span>
                    </button>
                    <h1 className="text-2xl font-semibold pt-4">
                      Your Resume Analysis
                    </h1>
                    <ResumeMenuItem
                      title="Resume Score"
                      items={[
                        {
                          text: !resumeQualityLoading
                            ? resumeQuality?.resume_score?.description
                            : "A higher score increases your chances of getting noticed—review and refine your resume for an even better fit!",
                          progressCircle: (
                            <CircularProgressbar
                              styles={buildStyles(styleForDrawer)}
                              value={resumeQuality?.resume_score?.overall_score}
                              text={`${resumeQuality?.resume_score?.overall_score}%`}
                            />
                          ),
                        },
                      ]}
                    />
                    <ResumeMenuItem
                      title="Resume Quality Breakdown"
                      items={[
                        {
                          text: "Structure",
                          progressCircle: (
                            <CircularProgressbar
                              styles={buildStyles(styleForDrawer)}
                              value={
                                resumeQuality?.resume_quality_breakdown
                                  ?.structure
                              }
                              text={`${resumeQuality?.resume_quality_breakdown?.structure}%`}
                            />
                          ),
                        },
                        {
                          text: "Readability",
                          progressCircle: (
                            <CircularProgressbar
                              styles={buildStyles(styleForDrawer)}
                              value={
                                resumeQuality?.resume_quality_breakdown
                                  ?.readability
                              }
                              text={`${resumeQuality?.resume_quality_breakdown?.readability}%`}
                            />
                          ),
                        },
                        {
                          text: "Content",
                          progressCircle: (
                            <CircularProgressbar
                              styles={buildStyles(styleForDrawer)}
                              value={
                                resumeQuality?.resume_quality_breakdown?.content
                              }
                              text={`${resumeQuality?.resume_quality_breakdown?.content}%`}
                            />
                          ),
                        },
                        {
                          text: "Keyword",
                          progressCircle: (
                            <CircularProgressbar
                              styles={buildStyles(styleForDrawer)}
                              value={
                                resumeQuality?.resume_quality_breakdown?.keyword
                              }
                              text={`${resumeQuality?.resume_quality_breakdown?.keyword}%`}
                            />
                          ),
                        },
                      ]}
                    />
                    <div className="border my-3 rounded-lg overflow-hidden">
                      <div className="text-md font-semibold bg-[#fafafa] p-[6px]">
                        <span>Areas for Improvement</span>
                      </div>

                      {resumeQualityLoading ? (
                        <Skeleton variant="rectangular" height={80} />
                      ) : (
                        <div className="px-4">
                          <div className="py-6 flex overflow-x-auto whitespace-nowrap gap-2 hide-scrollbar">
                            {resumeQuality?.areas_for_improvement?.map(
                              (item) => (
                                <span className="border font-semibold text-[15px] rounded-xl p-2">
                                  {item}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold">
                        Resume Sections
                      </h1>
                      <span className="text-[14px]">
                        We've pre-filled your resume using your profile details.
                        Review, edit, and customize each section to create a
                        resume that truly represents you!
                      </span>
                    </div>
                    <hr className="my-7" />
                    {/* -------------------- Personal Info Portion ----------------------------- */}
                    <CustomAccordion title="Personal Info">
                      <div>
                        <FieldItem
                          name="jobTitle"
                          type="text"
                          placeholder="job Title"
                        />
                        <div className="w-full flex gap-4">
                          <FieldItem
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                          <FieldItem
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                        <div className="w-full flex gap-4 items-center">
                          <fieldset>
                            <Autocomplete
                              id="country-select-demo"
                              onBlur={() => setFieldTouched("country", true)}
                              sx={{ width: 310 }}
                              options={countries}
                              autoHighlight
                              value={values.country || null}
                              onChange={(e, newValue) => {
                                setFieldValue("country", newValue);
                              }}
                              getOptionLabel={(option) =>
                                `${option.label} +${option.phone}`
                              }
                              renderOption={(props, option) => (
                                <Box
                                  component="li"
                                  sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
                                  {...props}
                                >
                                  {option.label} ({option.code}) +{option.phone}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  helperText={touched.country && errors.country}
                                  {...params}
                                  label="Country Code"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "new-password",
                                  }}
                                  sx={{ ...textField_style }}
                                />
                              )}
                            />
                          </fieldset>
                          <FieldItem
                            name="location"
                            type="text"
                            placeholder="Location"
                          />
                        </div>
                        <div className="w-full flex gap-4">
                          <FieldItem
                            name="email"
                            type="text"
                            placeholder="Email  "
                          />
                          <FieldItem
                            name="mobileNumber"
                            type="text"
                            placeholder="Mobile Number"
                          />
                        </div>
                        <FieldItem
                          name="linkedinLink"
                          type="text"
                          placeholder="LinkedIn URL"
                        />
                        <FieldItem
                          name="githubLink"
                          type="text"
                          placeholder="GitHub URL"
                        />
                        <InputButtonForSubmit
                          onClick={() => updatePersonalInfo(values, errors)}
                        />
                      </div>
                    </CustomAccordion>
                    {/* -------------------- About Me Portion ----------------------------- */}
                    <CustomAccordion title="About Me">
                      <div>
                        <ZakiAiPortion title="description" />
                        <InputButtonForSubmit
                          onClick={() => console.log("sd")}
                        />
                      </div>
                    </CustomAccordion>
                    {/* -------------------- Education Portion ----------------------------- */}
                    <CustomAccordion title="Education">
                      <FieldArray name="education">
                        {({ push, remove }) => (
                          <>
                            {values.education?.map((value, index) => (
                              <div key={index}>
                                <div className="flex items-center gap-1">
                                  <span>{index + 1}.</span>
                                  <MdDeleteForever
                                    onClick={() => remove(index)}
                                    size={20}
                                    color="grey"
                                  />
                                </div>
                                <div className="w-full flex gap-4">
                                  <FieldItem
                                    name={`education[${index}].schoolName`}
                                    type="text"
                                    placeholder="School Name"
                                  />
                                  <FieldItem
                                    name={`education[${index}].degreeName`}
                                    type="text"
                                    placeholder="Degree Name"
                                  />
                                </div>
                                <div className="w-full flex gap-4 items-center">
                                  <TextField
                                    select
                                    name={`education[${index}].degreeType`}
                                    label="Degree Type*"
                                    value={values.education[index].degreeType}
                                    onBlur={() =>
                                      setFieldTouched(
                                        `values.education[${index}].degreeType`,
                                        true
                                      )
                                    }
                                    onChange={(e) =>
                                      setFieldValue(
                                        `education[${index}].degreeType`,
                                        e.target.value
                                      )
                                    }
                                    error={
                                      touched.education?.[index]?.degreeType &&
                                      Boolean(
                                        errors.education?.[index]?.degreeType
                                      )
                                    }
                                    helperText={
                                      touched.education?.[index]?.degreeType &&
                                      errors.education?.[index]?.degreeType
                                    }
                                    sx={{
                                      width: "1000px",
                                      ...textField_style,
                                    }}
                                  >
                                    {[
                                      "Bachelor",
                                      "Master",
                                      "PhD",
                                      "Diploma",
                                    ].map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                  <FieldItem
                                    name={`education[${index}].score`}
                                    type="text"
                                    placeholder="Score"
                                  />
                                  <TextField
                                    select
                                    name={`education[${index}].scoreType`}
                                    label="Score Type*"
                                    value={values.education[index].scoreType}
                                    onBlur={() =>
                                      setFieldTouched(
                                        `education[${index}].scoreType`,
                                        true
                                      )
                                    }
                                    onChange={(e) =>
                                      setFieldValue(
                                        `education[${index}].scoreType`,
                                        e.target.value
                                      )
                                    }
                                    error={
                                      touched.education?.[index]?.scoreType &&
                                      Boolean(
                                        errors.education?.[index]?.scoreType
                                      )
                                    }
                                    helperText={
                                      touched.education?.[index]?.scoreType &&
                                      errors.education?.[index]?.scoreType
                                    }
                                    sx={{
                                      width: "750px",
                                      ...textField_style,
                                    }}
                                  >
                                    {[
                                      "CGPA(out of 4)",
                                      "CGPA(out of 5)",
                                      "CGPA(out of 6)",
                                      "Percentage",
                                    ].map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </div>
                                <div className="w-full flex gap-4 items-center mb-6">
                                  <FieldItem
                                    name={`education[${index}].startYear`}
                                    type="text"
                                    placeholder="From(YYYY)"
                                  />
                                  <FieldItem
                                    name={`education[${index}].completionYear`}
                                    type="text"
                                    placeholder="To(YYYY)"
                                  />
                                  <FieldItem
                                    name={`education[${index}].educationLocation`}
                                    type="text"
                                    placeholder="Location"
                                  />
                                </div>
                                <ZakiAiPortion
                                  title={`education[${index}].description`}
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  schoolName: "",
                                  degreeName: "",
                                  degreeType: "",
                                  score: "",
                                  scoreType: "",
                                  startYear: "",
                                  completionYear: "",
                                  educationLocation: "",
                                })
                              }
                              className="flex items-center gap-2 my-4"
                            >
                              <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                                +
                              </span>
                              <span>Add One More Education</span>
                            </button>
                            <InputButtonForSubmit />
                          </>
                        )}
                      </FieldArray>
                    </CustomAccordion>
                    {/* ------------------------------ Work Portion ------------------------------------ */}
                    <CustomAccordion title="Work History">
                      <FieldArray name="work">
                        {({ push, remove }) => (
                          <>
                            {values?.work.map((value, index) => (
                              <div key={index}>
                                <div className="flex items-center gap-1">
                                  <span>{index + 1}.</span>
                                  <MdDeleteForever
                                    onClick={() => remove(index)}
                                    size={20}
                                    color="grey"
                                  />
                                </div>
                                <div className="w-full flex gap-4 items-center">
                                  <FieldItem
                                    type="text"
                                    name={`work[${index}].jobTitle`}
                                    placeholder="Job Title"
                                  />
                                  <FieldItem
                                    type="text"
                                    name={`work[${index}].companyName`}
                                    placeholder="Company Name"
                                  />
                                </div>
                                <div className="w-full flex gap-4 items-center flex-1">
                                  <TextField
                                    type="date"
                                    placeholder="Start Date"
                                    label=""
                                    slotProps={{ shrink: false }}
                                    sx={textField_style}
                                    value={values.work[index].startDate}
                                    onBlur={() =>
                                      setFieldTouched(
                                        `work[${index}].startDate`,
                                        true
                                      )
                                    }
                                    onChange={(e) =>
                                      setFieldValue(
                                        `work[${index}].startDate`,
                                        e.target.value
                                      )
                                    }
                                    error={
                                      touched.work?.[index]?.startDate &&
                                      Boolean(errors.work?.[index]?.startDate)
                                    }
                                    helperText={
                                      touched.work?.[index]?.startDate &&
                                      errors.work?.[index]?.startDate
                                    }
                                  />
                                  <TextField
                                    type="date"
                                    placeholder="End Date"
                                    disabled={values.work[index].present}
                                    label=""
                                    slotProps={{ shrink: false }}
                                    sx={textField_style}
                                    value={values.work[index].endDate}
                                    onBlur={() =>
                                      setFieldTouched(
                                        `work[${index}].endDate`,
                                        true
                                      )
                                    }
                                    onChange={(e) =>
                                      setFieldValue(
                                        `work[${index}].endDate`,
                                        e.target.value
                                      )
                                    }
                                    error={
                                      touched.work?.[index]?.endDate &&
                                      Boolean(errors.work?.[index]?.endDate)
                                    }
                                    helperText={
                                      touched.work?.[index]?.endDate &&
                                      errors.work?.[index]?.endDate
                                    }
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={values.work[index].present}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `work[${index}].present`,
                                            e.target.checked
                                          )
                                        }
                                      />
                                    }
                                    label="Present"
                                  />
                                </div>
                                <div className="w-full flex gap-4 items-center">
                                  <FieldItem
                                    type="text"
                                    name={`work[${index}].workLocation`}
                                    placeholder="Location"
                                  />
                                </div>

                                <ZakiAiPortion
                                  title={`work[${index}].description`}
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  jobTitle: "",
                                  companyName: "",
                                  startDate: "",
                                  endDate: "",
                                  workLocation: "",
                                  description: "",
                                  present: false,
                                })
                              }
                              className="flex items-center gap-2 my-4"
                            >
                              <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                                +
                              </span>
                              <span>Add One More Employment</span>
                            </button>
                            <InputButtonForSubmit />
                          </>
                        )}
                      </FieldArray>
                    </CustomAccordion>
                    {/* ------------------------------Skill Portion------------------------------------------ */}
                    <CustomAccordion title="skills">
                      <FieldArray name="skills">
                        {({ push, remove }) => (
                          <>
                            <div className="flex items-center gap-1 gap-y-4 flex-wrap">
                              {values?.skills.map((value, index) => (
                                <div
                                  key={index}
                                  className="w-[48%] flex items-center"
                                >
                                  <TextField
                                    select
                                    name={`skills[${index}].skill`}
                                    label="skill*"
                                    slotProps={{
                                      select: {
                                        MenuProps: {
                                          PaperProps: {
                                            sx: {
                                              maxHeight: 200,
                                            },
                                          },
                                        },
                                      },
                                    }}
                                    value={values.skills[index].skill}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `skills[${index}].skill`,
                                        e.target.value
                                      )
                                    }
                                    sx={{
                                      width: "90%",
                                      ...textField_style,
                                    }}
                                  >
                                    {_skills.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                  <MdDeleteForever
                                    onClick={() => remove(index)}
                                    size={20}
                                    color="grey"
                                  />
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  skill: "",
                                })
                              }
                              className="flex items-center gap-2 my-4"
                            >
                              <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                                +
                              </span>
                              <span>Add One More Skill</span>
                            </button>
                            <InputButtonForSubmit />
                            <h1>Recommended Skills</h1>
                            <div className="flex gap-2 items-center">
                              {[
                                "Leadership",
                                "Teamwork",
                                "Negotiation",
                                "Writing",
                                "Research",
                              ]
                                .filter(
                                  (skill) =>
                                    !values.skills.some(
                                      (s) => s.skill === skill
                                    )
                                )
                                .map((skill, index) => (
                                  <button
                                    type="button"
                                    key={index}
                                    className="py-1 px-3 text-sm rounded-2xl bg-green-200"
                                    onClick={() => push({ skill: skill })}
                                  >
                                    {skill}
                                  </button>
                                ))}
                            </div>
                          </>
                        )}
                      </FieldArray>
                    </CustomAccordion>
                    {/* -----------------------------Languages Portion------------------------------------- */}
                    <CustomAccordion title="Languages">
                      <FieldArray name="languages">
                        {({ push, remove }) => (
                          <>
                            {values?.languages.map((value, index) => (
                              <div>
                                <div className="flex items-center gap-1">
                                  <span>{index + 1}.</span>
                                  <MdDeleteForever
                                    onClick={() => remove(index)}
                                    size={20}
                                    color="grey"
                                  />
                                </div>
                                <div className="flex items-center gap-3 my-2">
                                  <TextField
                                    select
                                    name={`languages[${index}].language`}
                                    label="Language*"
                                    slotProps={{
                                      select: {
                                        MenuProps: {
                                          PaperProps: {
                                            sx: {
                                              maxHeight: 200,
                                            },
                                          },
                                        },
                                      },
                                    }}
                                    value={values.languages[index].language}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `languages[${index}].language`,
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => {
                                      setFieldTouched(
                                        `languages[${index}].language`,
                                        true
                                      );
                                    }}
                                    error={
                                      touched.languages?.[index]?.language &&
                                      Boolean(
                                        errors.languages?.[index]?.language
                                      )
                                    }
                                    helperText={
                                      touched.languages?.[index]?.language &&
                                      errors.languages?.[index]?.language
                                    }
                                    sx={{
                                      width: "50%",
                                      ...textField_style,
                                    }}
                                  >
                                    {_skills.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                  <TextField
                                    select
                                    name={`languages[${index}].proficiency`}
                                    label="Proficiency*"
                                    slotProps={{
                                      select: {
                                        MenuProps: {
                                          PaperProps: {
                                            sx: {
                                              maxHeight: 200,
                                            },
                                          },
                                        },
                                      },
                                    }}
                                    value={values.languages[index].proficiency}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `languages[${index}].proficiency`,
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => {
                                      setFieldTouched(
                                        `languages[${index}].proficiency`,
                                        true
                                      );
                                    }}
                                    error={
                                      touched.languages?.[index]?.proficiency &&
                                      Boolean(
                                        errors.languages?.[index]?.proficiency
                                      )
                                    }
                                    helperText={
                                      touched.languages?.[index]?.proficiency &&
                                      errors.languages?.[index]?.proficiency
                                    }
                                    sx={{
                                      width: "50%",
                                      ...textField_style,
                                    }}
                                  >
                                    {_skills.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  language: "",
                                  proficiency: "",
                                })
                              }
                              className="flex items-center gap-2 my-4"
                            >
                              <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                                +
                              </span>
                              <span>Add One More Language</span>
                            </button>
                          </>
                        )}
                      </FieldArray>
                      <InputButtonForSubmit
                        onClick={() => console.log("clicked")}
                      />
                    </CustomAccordion>
                    {myAccordion.map((accor) => (
                      <CustomAccordion
                        key={accor}
                        title={accor}
                        deleteFeature={true}
                        handleDeleteAccordion={() =>
                          setMyAccordion(myAccordion.filter((s) => s !== accor))
                        }
                      >
                        {accordionContent[accor]}
                      </CustomAccordion>
                    ))}
                    <hr className="mt-10 mb-5" />
                    {myAccordion.length < 5 && (
                      <h1 className="text-2xl font-semibold text-gray-900 mb-5">
                        Add Section
                      </h1>
                    )}
                    <div className="flex gap-x-3 flex-wrap">
                      {!myAccordion.includes("Profile_Photo") && (
                        <AddButton
                          title="Profile_Photo"
                          text="Add Profile Photo"
                        />
                      )}
                      {!myAccordion.includes("Projects") && (
                        <AddButton title="Projects" text="Projects" />
                      )}
                      {!myAccordion.includes("Certificates") && (
                        <AddButton title="Certificates" text="Certifications" />
                      )}
                      {!myAccordion.includes("Internships") && (
                        <AddButton title="Internships" text="Internships" />
                      )}
                      {!myAccordion.includes("Courses") && (
                        <AddButton title="Courses" text="Courses" />
                      )}
                      {!myAccordion.includes("Hobbies") && (
                        <AddButton title="Hobbies" text="Hobbies" />
                      )}
                    </div>
                  </div>
                  <div className="w-[43%] flex flex-col">
                    <div className="flex justify-end mt-10 mb-4 mx-1">
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-2 font-semibold transition-transform bg-[#7CFCAD] px-3 py-2 rounded-2xl hover:scale-[1.02]"
                      >
                        <span>Download PDF</span>
                        <span>|</span>
                        <MdKeyboardArrowDown size={30} />
                      </button>
                    </div>
                    <PreviewPage />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Drawer>
    </>
  );
}
