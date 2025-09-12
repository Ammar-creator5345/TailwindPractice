import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import ProfilePhoto from "./profilePhoto";
import PersonalInfo from "./personalInfo";
import AboutMe from "./aboutMe";
import Education from "./education";
import WorkHistory from "./workHistory";
import Skills from "./skills";
import Languages from "./languages";
import Hobbies from "./hobbies&Interests";
import Projects from "./projects";
import Certificates from "./certifications";
import Publications from "./publications";

const SideDrawer = ({
  open,
  setOpen,
  profileDataApi,
  profileData,
  education,
  work,
  skills,
  recommendedSkills,
  allSkills,
  setExcludedIds,
  loading,
  allLanguages,
  languages,
  hobbies,
  projects,
  publications,
  certificates,
  ProfileCompletion,
  resumeQualityLoading,
  refetchApis,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [accordions, setAccordions] = useState([]);
  useEffect(() => {
    setAccordions((prevAccordions) => {
      const newAccordions = [...prevAccordions];
      if (hobbies.length && !newAccordions.includes("hobbies")) {
        newAccordions.push("hobbies");
      }

      if (projects.length && !newAccordions.includes("projects")) {
        newAccordions.push("projects");
      }
      if (certificates.length && !newAccordions.includes("certificates")) {
        newAccordions.push("certificates");
      }
      if (publications.length && !newAccordions.includes("publications")) {
        newAccordions.push("publications");
      }
      return newAccordions;
    });
  }, [hobbies, projects, certificates, publications]);

  const myAccordions = {
    hobbies: <Hobbies comingHobbies={hobbies} setAccordions={setAccordions} />,
    projects: (
      <Projects comingProjects={projects} setAccordions={setAccordions} />
    ),
    certificates: (
      <Certificates
        comingCertificates={certificates}
        setAccordions={setAccordions}
      />
    ),
    publications: (
      <Publications
        comingPublications={publications}
        setAccordions={setAccordions}
      />
    ),
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
  const addAccordion = (title) => {
    if (!accordions.includes(title)) {
      setAccordions([...accordions, title]);
    } else {
      return;
    }
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
  const styleForDrawer = {
    textSize: "26px",
    textColor: "#000000",
    trailColor: "transparent",
    pathColor: "#A38AF1",
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
                setOpenModal(false);
              }}
              type="button"
              className="bg-green-300 rounded-2xl py-3 px-4 font-semibold"
            >
              Yes,Exit
            </button>
            <button
              onClick={() => setOpenModal(false)}
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
        onClose={() => {
          setOpenModal(true);
          refetchApis();
        }}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: "100%",
                sm: "90%",
                md: "65%",
                lg: "45%",
              },
            },
          },
        }}
      >
        <div className="mt-10 mx-5 mr-7">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="bg-[#FAFAFA] rounded-2xl py-2 px-3 flex justify-center items-center"
          >
            <CloseIcon />
          </button>
          <h1 className="text-2xl font-semibold mt-4">
            Complete Your Profile to Stand Out!
          </h1>
          <p className="text-[#727070] text-[13px] leading-[17px]">
            A complete profile increases your chances of getting noticed by
            employers. Fill in the missing details to reach 100%!
          </p>
          <div className="border my-3 rounded-lg overflow-hidden">
            <div className="font-semibold bg-[#fafafa] p-[6px] px-3">
              Your Profile Completion Score
            </div>
            <div className="flex items-center p-4 gap-2">
              <div className="min-w-[35px] min-h-[35px] w-[35px] h-[35px] sm:min-w-[40px] sm:min-h-[40px] sm:w-[40px] sm:h-[40px] md:min-w-[50px] md:min-h-[50px] md:w-[50px] md:h-[50px]">
                {resumeQualityLoading ? (
                  <CircularProgress
                    sx={{ margin: "10px 0 0 10px" }}
                    size={25}
                    color="success"
                  />
                ) : (
                  <CircularProgressbar
                    styles={buildStyles(styleForDrawer)}
                    value={ProfileCompletion?.profile_completion_percentage}
                    text={`${ProfileCompletion?.profile_completion_percentage}%`}
                  />
                )}
              </div>
              <div className="text-[13px] md:text-[15px]">
                Great job! Your profile is now{" "}
                {`${ProfileCompletion?.profile_completion_percentage}%`}{" "}
                complete. A fully completed profile improves your chances of
                getting noticed by employers!
              </div>
            </div>
          </div>
          <hr className="mt-6" />
          <h1 className="text-2xl font-semibold mt-4">Sections to Complete</h1>
          <div className="mt-4">
            <ProfilePhoto profileData={profileData} />
            <PersonalInfo profileDataApi={profileDataApi} />
            <AboutMe profileData={profileData} />
            <Education education={education} />
            <WorkHistory work={work} />
            <Skills
              skills={skills}
              allSkills={allSkills}
              recommendedSkills={recommendedSkills}
              loading={loading}
              setExcludedIds={setExcludedIds}
            />

            <Languages
              allLanguages={allLanguages}
              comingLanguages={languages}
            />
            {accordions.map((acc) => myAccordions[acc])}
          </div>
          <hr className="mt-8 mb-4" />
          {accordions.length < 4 && (
            <h1 className="text-2xl font-bold ml-4 my-3">Add Section</h1>
          )}
          <div className="flex flex-wrap gap-4 px-4 pr-10">
            {!accordions.includes("hobbies") && (
              <AddButton title="hobbies" text="hobbies" />
            )}
            {!accordions.includes("projects") && (
              <AddButton title="projects" text="projects" />
            )}
            {!accordions.includes("certificates") && (
              <AddButton title="certificates" text="certificates" />
            )}
            {!accordions.includes("publications") && (
              <AddButton title="publications" text="publications" />
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SideDrawer;
