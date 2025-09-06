import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
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
import {
  validationSchema,
  workValidation,
  personalInfoValidation,
  educationValidation,
  aboutMeValidation,
  skillsValidation,
  languagesValidation,
  hobbiesValidation,
  projectsValidation,
  certificatesValidation,
  internshipsValidation,
  coursesValidation,
} from "./validationSchema";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import useRecommendedSkills from "../rawData/recommendedSkills";

export default function ResumeSideDrawer({ open, setOpen, uploadedResume }) {
  const {
    countries,
    skills: allSkills,
    setSkills: setAllSkills,
    languages: allLanguages,
    setLanguages: setAllLanguages,
  } = useCountries(uploadedResume);
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
  const [isSaving, setIsSaving] = useState(false);
  const [savedOpenDrawer, setSavedOpenDrawer] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    heading: "",
    message: "",
  });
  const {
    skills: recommendedSkills,
    loading,
    setExcludedIds,
    excludedIds,
  } = useRecommendedSkills(uploadedResume);
  const toggleSavedOpenDrawer = (newOpen) => () => {
    setSavedOpenDrawer(newOpen);
  };
  const showAlertDrawer = (section) => {
    const message = {
      personalInfo: "personal info updated",
      aboutMe: "About Me updated",
      education: "Education is Updated",
      work: "Work History is Updated",
      skills: "Skills is Updated",
      languages: "Languages is Updated",
      hobbies: "Hobbies is Updated",
      projects: "Projects is Updated",
      certificates: "Certificates is Updated",
      internships: "Internships is Updated",
      hobbies: "Hobbies is Updated",
      courses: "Courses is Updated",
      profilePhoto: "Profile Photo is Updated",
    };
    setAlertMessage({ heading: "Success", message: message[section] });
    setSavedOpenDrawer(true);
    setTimeout(() => {
      setSavedOpenDrawer(false);
    }, 5000);
  };
  const styleForResumeExitModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "80%",
      sm: "70%",
      md: "50%",
    },
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
    console.log(recommendedSkills);
    console.log(allSkills);
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
          id: edu?.id ? edu.id : null,
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
          id: work.id ? work.id : null,
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
          id: skill?.id ? skill.id : "",
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
        const languageSystem = {
          "fluent/native": "Fluent/Native",
          intermediate: "Intermediate",
          beginner: "Beginner",
        };
        const formattedLanguages = res.data.data.map((lan) => ({
          id: lan?.id || null,
          languageId: lan?.language_details?.id || "",
          language: lan?.language_details?.name || "",
          proficiency: languageSystem[lan?.proficiency] || "",
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
          id: project?.id ? project.id : "",
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
          id: course?.id ? course.id : "",
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
          id: certificate?.id ? certificate.id : "",
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
          id: internship?.id ? internship.id : "",
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
          id: hobby?.id ? hobby.id : "",
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
  const InputButtonForSubmit = ({
    onClick,
    section,
    values,
    setErrors,
    setFieldTouched,
    dirty,
  }) => (
    <>
      <hr className="my-4" />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            onClick(section, values, setErrors, setFieldTouched, dirty)
          }
          className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
        >
          {!isSaving ? "Save" : "Saving..."}
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

  const ResumeMenuItem = ({ title, items }) => {
    return (
      <div className="border my-3 rounded-lg overflow-hidden">
        <div className="text-md font-semibold bg-[#fafafa] p-[6px]">
          {title}
        </div>
        <div className="flex overflow-x-auto text-sm divide-x justify-between p-4">
          {items?.map((item, i) => (
            <div key={i} className="flex items-center px-3 gap-2">
              <div className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px]">
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
    profilePhotoApi: null,
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
            id: "",
            hobby: "",
          },
        ],
    internships: internships.length
      ? internships
      : [
          {
            id: "",
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
            id: "",
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
            id: "",
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
  const updatePersonalInfo = (values) => {
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
          location: values.location,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        // alert("successfull posted");
      });
  };
  const updateAboutMe = (values) => {
    axios
      .post(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/about_me`,
        {
          about_me_note: values.description,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        // alert("successfull posted");
      });
  };
  const updateEducation = async (values) => {
    const allRequests = [];
    const previousEducation = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/education`,
      { headers }
    );
    const previousEducationIds = previousEducation.data.data.map(
      (edu) => edu.id
    );
    const currentEducationIds = values.education
      .map((edu) => edu.id)
      .filter(Boolean);
    const eduIdsForDeletions = previousEducationIds.filter(
      (id) => !currentEducationIds.includes(id)
    );
    eduIdsForDeletions.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/education/${id}`,
          { headers }
        )
      );
    });
    const cgpaSystemMap = {
      "CGPA out of 4": "cgpa_4",
      "CGPA out of 5": "cgpa_5",
      "CGPA out of 10": "cgpa_10",
      Percentage: "percentage",
    };
    const degreeSystem = {
      "Doctorate(or equivalent)": 1,
      "Masters(or equivalent)": 2,
      "MBA(or equivalent)": 3,
      "Bachelors(or equivalent)": 4,
    };
    const ForSubmittingEdu = values?.education?.map((edu) => {
      const eduData = {
        completed_year: edu.completionYear,
        degree: degreeSystem[edu.degreeType] || null,
        field_of_study: edu.degreeName,
        description: edu.description,
        location: edu.educationLocation,
        resume: uploadedResume.id,
        school: edu.schoolName,
        score: edu.score,
        score_type: cgpaSystemMap[edu.scoreType] || null,
        started_year: edu.startYear,
        completed_year: edu.completionYear,
      };
      if (edu.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/education/${edu.id}`,
            eduData,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/education`,
            eduData,
            { headers }
          )
        );
      }
    });
    const responses = await Promise.all(allRequests);
    console.log(responses);
  };
  const updateWorkHistory = async (values) => {
    const allRequests = [];
    const previousWorksRequest = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/work_history`,
      { headers }
    );
    const previousWorkIds = previousWorksRequest.data.data.map((w) => w.id);
    const currentWorkIds = values.work.map((w) => w.id).filter(Boolean);
    const idsForDeletion = previousWorkIds.filter(
      (id) => !currentWorkIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/work_history/${id}`,
          { headers }
        )
      );
    });
    const ForSubmittingWork = values?.work.map((work) => {
      const workData = {
        company_name: work.companyName,
        role: work.jobTitle,
        start_date: work.startDate || null,
        end_date: work.endDate,
        is_running: work.present,
        description: work.description,
        location: work.workLocation,
      };
      if (work.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/work_history/${work.id}`,
            workData,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/work_history`,
            workData,
            { headers }
          )
        );
      }
    });
    const responses = await Promise.all(allRequests);
    console.log(responses);
  };
  const updateSkills = async (values) => {
    await axios
      .post(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/skills`,
        { skills: values?.skills.map((s) => s.id) },
        { headers }
      )
      .then((res) => {
        console.log(res);
      });
  };
  const updateLanguages = async (values) => {
    const allRequests = [];
    const getPreviosLanguages = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/language`,
      { headers }
    );
    const PreviosLanguagesIds = getPreviosLanguages.data.data.map(
      (lan) => lan.id
    );
    const currentLanguagesIds = values.languages
      .map((lan) => lan.id)
      .filter(Boolean);
    const idsForDeletion = PreviosLanguagesIds.filter(
      (id) => !currentLanguagesIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/language/${id}`,
          { headers }
        )
      );
    });
    values?.languages.map((language) => {
      const uploadedData = {
        id: language.id,
        language: language.languageId,
        proficiency: language.proficiency.toLowerCase(),
      };
      if (language.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/language/${language.id}`,
            uploadedData,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/language`,
            uploadedData,
            { headers }
          )
        );
      }
    });
    const response = await Promise.all(allRequests);
    console.log(response);
  };
  const updateProfilePhoto = async (values) => {
    console.log("clicked profile photo button save");
    const formData = new FormData();
    formData.append("profile_img", values.profilePhotoApi);
    axios
      .post(
        `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/profile_image`,
        formData,
        { headers }
      )
      .then((res) => {
        console.log(res);
      });
  };
  const updateProjects = async (values) => {
    console.log("project sectuion is clicked");
    const allRequests = [];
    const previosProjects = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/past_projects`,
      { headers }
    );
    const previosProjectsIds = previosProjects?.data?.data.map(
      (project) => project.id
    );
    const currentProjectsIds = values.projects
      .map((project) => project.id)
      .filter(Boolean);
    const idsForDeletion = previosProjectsIds.filter(
      (id) => !currentProjectsIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/past_projects/${id}`,
          { headers }
        )
      );
    });
    values?.projects.map((project) => {
      const dataForSubmit = {
        label: project.projectName,
        description: project.description,
        start_date: project.startDate,
        end_date: project.endDate,
      };
      if (project.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/past_projects/${project.id}`,
            dataForSubmit,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/past_projects`,
            dataForSubmit,
            { headers }
          )
        );
      }
    });
    const responses = await Promise.all(allRequests);
    console.log(responses);
  };
  const updateCertificates = async (values) => {
    console.log("clicked update certifictae");

    const allRequests = [];
    const previosCertificates = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/certificates`,
      { headers }
    );
    const previosCertificatesIds = previosCertificates?.data?.data.map(
      (certificate) => certificate.id
    );
    const currentCertificatesIds = values.certificates
      .map((certificate) => certificate.id)
      .filter(Boolean);
    const idsForDeletion = previosCertificatesIds.filter(
      (id) => !currentCertificatesIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/certificates/${id}`,
          { headers }
        )
      );
    });
    values?.certificates.map((certificate) => {
      const dataForSubmit = {
        title: certificate.certificateTitle,
        description: certificate.description,
        date_awarded: certificate.dateAwarded,
        organization: certificate.organizationName,
      };
      if (certificate.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/certificates/${certificate.id}`,
            dataForSubmit,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/certificates`,
            dataForSubmit,
            { headers }
          )
        );
      }
    });
    const responses = await Promise.all(allRequests);
    console.log(responses);
  };
  const updateInternships = async (values) => {
    console.log("internShip sectuion is clicked");
    const allRequests = [];
    const previosInternShips = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/internships`,
      { headers }
    );
    const previosInternShipsIds = previosInternShips?.data?.data.map(
      (internship) => internship.id
    );
    const currentInternShipsIds = values.internships
      .map((internship) => internship.id)
      .filter(Boolean);
    const idsForDeletion = previosInternShipsIds.filter(
      (id) => !currentInternShipsIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/internships/${id}`,
          { headers }
        )
      );
    });
    values?.internships.map((internship) => {
      const dataForSubmit = {
        label: internship.companyName,
        description: internship.description,
        start_date: internship.startDate,
        end_date: internship.endDate,
      };
      if (internship.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/internships/${internship.id}`,
            dataForSubmit,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/internships`,
            dataForSubmit,
            { headers }
          )
        );
      }
    });
    const responses = await Promise.all(allRequests);
    console.log(responses);
  };
  const updateCourses = async (values) => {
    console.log("clicked update course");

    const allRequests = [];
    const previosCourses = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/courses`,
      { headers }
    );
    const previosCoursesIds = previosCourses?.data?.data.map(
      (course) => course.id
    );
    const currentCoursesIds = values.courses
      .map((course) => course.id)
      .filter(Boolean);
    const idsForDeletion = previosCoursesIds.filter(
      (id) => !currentCoursesIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/courses/${id}`,
          { headers }
        )
      );
    });
    values?.courses.map((course) => {
      const dataForSubmit = {
        id: course.id,
        title: course.courseName,
        description: course.description,
        date_awarded: course.dateAwarded,
        organization: course.organizationName,
      };
      if (course.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume.id}/courses/${course.id}`,
            dataForSubmit,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/courses`,
            dataForSubmit,
            { headers }
          )
        );
      }
    });
    const responses = await Promise.all(allRequests);
    console.log(responses);
  };

  const updateHobbies = async (values) => {
    console.log("clicked hobbies section");
    const allRequests = [];
    const previousHobbies = await axios.get(
      `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/hobbies`,
      { headers }
    );
    const previousHobbiesIds = previousHobbies.data.data.map(
      (hobby) => hobby.id
    );
    const currentHobbiesIds = values.hobbies
      .map((hobby) => hobby.id)
      .filter(Boolean);
    const idsForDeletion = previousHobbiesIds.filter(
      (id) => !currentHobbiesIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(
        axios.delete(
          `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/hobbies/${id}`,
          { headers }
        )
      );
    });
    values?.hobbies.map((hobby) => {
      const dataForSubmit = {
        title: hobby.hobby,
      };
      if (hobby.id) {
        allRequests.push(
          axios.put(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/hobbies/${hobby.id}`,
            dataForSubmit,
            { headers }
          )
        );
      } else {
        allRequests.push(
          axios.post(
            `https://api.ziphire.hr/v2/developer/resumes/${uploadedResume?.id}/hobbies`,
            dataForSubmit,
            { headers }
          )
        );
      }
    });
    const res = await Promise.all(allRequests);
    console.log(res);
  };
  const validateSection = async (
    section,
    values,
    setErrors,
    setFieldTouched
  ) => {
    let sectionSchema;
    let sectionValues;

    switch (section) {
      case "personalInfo":
        sectionSchema = personalInfoValidation;
        sectionValues = {
          jobTitle: values.jobTitle,
          firstName: values.firstName,
          lastName: values.lastName,
          country: values.country,
          location: values.location,
          email: values.email,
          mobileNumber: values.mobileNumber,
          linkedinLink: values.linkedinLink,
          githubLink: values.githubLink,
        };
        break;
      case "aboutMe":
        sectionSchema = aboutMeValidation;
        sectionValues = { description: values.description };
        break;
      case "education":
        sectionSchema = educationValidation;
        sectionValues = { education: values.education };
        break;
      case "work":
        sectionSchema = workValidation;
        sectionValues = { work: values.work };
        break;
      case "skills":
        sectionSchema = skillsValidation;
        sectionValues = { skills: values.skills };
        break;
      case "languages":
        sectionSchema = languagesValidation;
        sectionValues = { languages: values.languages };
        break;
      case "hobbies":
        sectionSchema = hobbiesValidation;
        sectionValues = { hobbies: values.hobbies };
        break;
      case "projects":
        sectionSchema = projectsValidation;
        sectionValues = { projects: values.projects };
        break;
      case "certificates":
        sectionSchema = certificatesValidation;
        sectionValues = { certificates: values.certificates };
        break;
      case "internships":
        sectionSchema = internshipsValidation;
        sectionValues = { internships: values.internships };
        break;
      case "courses":
        sectionSchema = coursesValidation;
        sectionValues = { courses: values.courses };
        break;
      case "profilePhoto":
        return true;
      default:
        return false;
    }

    try {
      await sectionSchema.validate(sectionValues, { abortEarly: false });
      return true;
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((e) => {
          setFieldTouched(e.path, true);
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };
  const handleSectionSave = async (
    section,
    values,
    setErrors,
    setFieldTouched,
    dirty
  ) => {
    if (!dirty) return;
    console.log("handleSectionSave called for", section, "dirty:", dirty);
    setIsSaving(true);
    try {
      const isValid = await validateSection(
        section,
        values,
        setErrors,
        setFieldTouched
      );

      if (!isValid) {
        return;
      }

      switch (section) {
        case "personalInfo":
          await updatePersonalInfo(values);
          break;
        case "aboutMe":
          await updateAboutMe(values);
          break;
        case "education":
          await updateEducation(values);
          break;
        case "work":
          await updateWorkHistory(values);
          break;
        case "skills":
          await updateSkills(values);
          break;
        case "languages":
          await updateLanguages(values);
          break;
        case "profilePhoto":
          await updateProfilePhoto(values);
          break;
        case "hobbies":
          await updateHobbies(values);
          break;
        case "certificates":
          await updateCertificates(values);
          break;
        case "courses":
          await updateCourses(values);
          break;
        case "internships":
          await updateInternships(values);
          break;
        case "projects":
          await updateProjects(values);
          break;
      }
      showAlertDrawer(section);
    } catch (err) {
      console.error(err);
      showAlertDrawer("could not saved");
      setAlertMessage({ heading: "Error", message: "could not save Data" });
    } finally {
      setIsSaving(false);
    }
  };
  const accordionContent = {
    Profile_Photo: (
      <ProfilePhoto handleSectionSave={handleSectionSave} isSaving={isSaving} />
    ),
    Certificates: (
      <Certificates
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
        handleSectionSave={handleSectionSave}
        isSaving={isSaving}
      />
    ),
    Projects: (
      <Projects
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
        handleSectionSave={handleSectionSave}
        isSaving={isSaving}
      />
    ),
    Internships: (
      <Internships
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
        handleSectionSave={handleSectionSave}
        isSaving={isSaving}
      />
    ),
    Courses: (
      <Courses
        ZakiAiPortion={ZakiAiPortion}
        FieldItem={FieldItem}
        textField_style={textField_style}
        handleSectionSave={handleSectionSave}
        isSaving={isSaving}
      />
    ),
    Hobbies: (
      <Hobbies
        FieldItem={FieldItem}
        handleSectionSave={handleSectionSave}
        isSaving={isSaving}
      />
    ),
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
          <h1 className="text-xl font-[500] text-center md:text-2xl md:font-semibold">
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
        open={savedOpenDrawer}
        onClose={toggleSavedOpenDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: "300px",
                sm: "350px",
                md: "400px",
              },
              height: "fit-content",
              maxHeight: "120px",
              top: 20,
              right: 10,
              borderRadius: "10px",
            },
          },
        }}
      >
        <div className="flex h-[110px] w-full gap-4 relative">
          <div className="w-[10px] h-full bg-green-500"></div>
          <div className="flex gap-2 mt-5">
            <div className="mt-2">
              <CheckCircleOutlineIcon
                sx={{
                  background: "green",
                  color: "white",
                  borderRadius: "50px",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{alertMessage.heading}</h1>
              <h3 className="text-[16px] ">{alertMessage.message}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleSavedOpenDrawer(false)}
            className="fixed top-8 right-10"
          >
            <CloseIcon />
          </button>
        </div>
      </Drawer>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => handleOpenResumeExitModal()}
        slotProps={{
          backdrop: {
            sx: { background: "rgba(0,0,0,0.1)" },
          },
          paper: {
            sx: {
              width: {
                xs: "100%",
                sm: "88%",
              },
            },
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
            dirty,
          }) => {
            return (
              <Form>
                <div className="flex px-[5px] flex-col gap-0 md:gap-5 md:flex-row md:p-0">
                  <div className="px-5 py-10 w-[100%] shadowColor md:w-[57%]">
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
                    <div className="border my-3 rounded-lg overflow-hidden">
                      <div className="font-semibold bg-[#fafafa] p-[6px]">
                        Resume Score
                      </div>
                      <div className="flex items-center px-3 py-2 gap-2">
                        <div className="min-w-[35px] min-h-[35px] w-[35px] h-[35px] sm:min-w-[40px] sm:min-h-[40px] sm:w-[40px] sm:h-[40px] md:min-w-[50px] md:min-h-[50px] md:w-[50px] md:h-[50px]">
                          {resumeQualityLoading ? (
                            <CircularProgress color="success" />
                          ) : (
                            <CircularProgressbar
                              styles={buildStyles(styleForDrawer)}
                              value={resumeQuality?.resume_score?.overall_score}
                              text={`${resumeQuality?.resume_score?.overall_score}%`}
                            />
                          )}
                        </div>
                        <div className="text-[14px] md:text-[15px]">
                          {!resumeQualityLoading
                            ? resumeQuality?.resume_score?.description
                            : "A higher score increases your chances of getting noticed—review and refine your resume for an even better fit!"}
                        </div>
                      </div>
                    </div>
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
                      <div className="font-semibold bg-[#fafafa] p-[6px]">
                        <span>Areas for Improvement</span>
                      </div>

                      {resumeQualityLoading ? (
                        <Skeleton variant="rectangular" height={80} />
                      ) : (
                        <div className="px-4">
                          <div className="py-6 flex overflow-x-auto whitespace-nowrap gap-2 hide-scrollbar">
                            {resumeQuality?.areas_for_improvement?.map(
                              (item) => (
                                <span className="border font-semibold text-[13px] rounded-xl p-2 md:text-[15px]">
                                  {item}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="text-[23px] font-semibold md:text-2xl">
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
                        <div className="w-full flex gap-2 md:gap-4">
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
                        <div className="w-full flex gap-2 items-center md:gap-4">
                          <fieldset className="w-full">
                            <Autocomplete
                              id="country-select-demo"
                              onBlur={() => setFieldTouched("country", true)}
                              options={countries}
                              sx={{ width: "100%" }}
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
                        <div className="w-full flex gap-2 md:gap-4">
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
                          onClick={handleSectionSave}
                          section="personalInfo"
                          values={values}
                          setFieldTouched={setFieldTouched}
                          setErrors={setErrors}
                          dirty={dirty}
                        />
                      </div>
                    </CustomAccordion>
                    {/* -------------------- About Me Portion ----------------------------- */}
                    <CustomAccordion title="About Me">
                      <div>
                        <ZakiAiPortion title="description" />
                        <InputButtonForSubmit
                          onClick={handleSectionSave}
                          section="aboutMe"
                          values={values}
                          setFieldTouched={setFieldTouched}
                          setErrors={setErrors}
                          dirty={dirty}
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
                                <div className="w-full flex gap-2 md:gap-4">
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
                                <div className="w-full flex gap-1 items-center sm:gap-2 md:gap-4">
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
                                      "Doctorate(or equivalent)",
                                      "Masters(or equivalent)",
                                      "MBA(or equivalent)",
                                      "Bachelors(or equivalent)",
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
                                <div className="w-full flex gap-2 items-center mb-6 md:gap-4">
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
                            <InputButtonForSubmit
                              onClick={handleSectionSave}
                              section="education"
                              values={values}
                              setFieldTouched={setFieldTouched}
                              setErrors={setErrors}
                              dirty={dirty}
                            />
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
                                <div className="w-full flex gap-2 items-center md:gap-4">
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
                                <div className="w-full flex gap-1 items-center flex-1 sm:gap-2 md:gap-4">
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
                            <InputButtonForSubmit
                              onClick={handleSectionSave}
                              section="work"
                              values={values}
                              setFieldTouched={setFieldTouched}
                              setErrors={setErrors}
                              dirty={dirty}
                            />
                          </>
                        )}
                      </FieldArray>
                    </CustomAccordion>
                    {/* ------------------------------Skill Portion------------------------------------------ */}
                    <CustomAccordion title="skills">
                      <FieldArray name="skills">
                        {({ push, remove }) => (
                          <>
                            <div className="flex items-center gap-y-4 flex-wrap">
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
                                    onChange={(e) => {
                                      const selectedOption = allSkills.find(
                                        (opt) => opt.label === e.target.value
                                      );
                                      setFieldValue(
                                        `skills[${index}].skill`,
                                        selectedOption.label
                                      );
                                      setFieldValue(
                                        `skills[${index}].id`,
                                        selectedOption.id
                                      );
                                    }}
                                    sx={{
                                      width: "90%",
                                      ...textField_style,
                                    }}
                                  >
                                    {allSkills.map((option) => (
                                      <MenuItem
                                        key={option.id}
                                        value={option.label}
                                      >
                                        {option.label}
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
                                  id: "",
                                })
                              }
                              className="flex items-center gap-2 my-4"
                            >
                              <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                                +
                              </span>
                              <span>Add One More Skill</span>
                            </button>
                            <InputButtonForSubmit
                              onClick={handleSectionSave}
                              section="skills"
                              values={values}
                              setFieldTouched={setFieldTouched}
                              setErrors={setErrors}
                              dirty={dirty}
                            />
                            <h1 className="mb-3">Recommended Skills</h1>
                            <div className="flex gap-2 items-center flex-wrap w-full justify-start">
                              {loading ? <CircularProgress size={25} /> : ""}
                              {recommendedSkills?.map((skill, index) => (
                                <button
                                  type="button"
                                  key={index}
                                  className="py-1 px-3 text-[12px] whitespace-nowrap rounded-2xl bg-green-200"
                                  onClick={() => {
                                    push({ id: skill.id, skill: skill.label });
                                    setExcludedIds((prev) => [
                                      ...prev,
                                      skill.id,
                                    ]);
                                  }}
                                >
                                  {skill.label}
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
                                <div className="flex items-center gap-2 my-2 md:gap-4">
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
                                    onChange={(e) => {
                                      const selectedField = allLanguages.find(
                                        (lan) => {
                                          return lan.name === e.target.value;
                                        }
                                      );
                                      setFieldValue(
                                        `languages[${index}].language`,
                                        selectedField.name
                                      );
                                      setFieldValue(
                                        `languages[${index}].languageId`,
                                        selectedField.id
                                      );
                                    }}
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
                                    {allLanguages.map((option) => (
                                      <MenuItem
                                        key={option.id}
                                        value={option.name}
                                      >
                                        {option.name}
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
                                    {[
                                      "Fluent/Native",
                                      "Intermediate",
                                      "Beginner",
                                    ].map((option, index) => (
                                      <MenuItem key={index} value={option}>
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
                                  id: "",
                                  language: "",
                                  languageId: "",
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
                        onClick={handleSectionSave}
                        section="languages"
                        values={values}
                        setFieldTouched={setFieldTouched}
                        dirty={dirty}
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
                    {myAccordion.length < 6 && (
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
                  <div className="w-[100%] flex flex-col md:w-[43%]">
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
