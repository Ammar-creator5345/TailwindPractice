import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import { projectsValidation } from "../components/validationSchema";
import { MdDeleteForever } from "react-icons/md";
import SaveButton from "./rawComponents/saveButton";
import { TextField } from "@mui/material";
import FieldItem from "./rawComponents/fieldItem";
import { useEffect, useState } from "react";
import {
  deleteProject,
  getProjects,
  postProject,
  putProject,
} from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";

const Projects = ({ setAccordions, comingProjects }) => {
  const [projects, setProjects] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const formattedProjects = comingProjects?.map((value) => ({
      id: value?.id || "",
      projectName: value?.label || "",
      startDate: value?.start_date || "",
      endDate: value?.end_date || "",
      description: value?.description || "",
    }));
    setProjects(formattedProjects);
  }, [comingProjects]);
  const initialValues = {
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
  };
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
  const deleteAccordion = () => {
    setAccordions((prev) => prev.filter((acc) => acc !== "projects"));
  };
  const updateProjects = async (values) => {
    setIsSaving(true);
    const allRequests = [];
    const previosProjects = await getProjects();
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
      allRequests.push(deleteProject(id));
    });
    values?.projects.map((project) => {
      const dataForSubmit = {
        label: project.projectName,
        description: project.description,
        start_date: project.startDate,
        end_date: project.endDate,
      };
      if (project.id) {
        allRequests.push(putProject(dataForSubmit, project.id));
      } else {
        allRequests.push(postProject(dataForSubmit));
      }
    });
    Promise.all(allRequests)
      .then((res) => {
        setIsSaving(false);
        setShowAlert(true);
      })
      .catch((err) => {
        alert(err);
        setIsSaving(false);
      });
  };

  return (
    <CustomAccordion
      title="Projects"
      deleteFeature={true}
      handleDeleteAccordion={deleteAccordion}
    >
      {showAlert && (
        <ShowAlert section="projects" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={projectsValidation}
        enableReinitialize
        onSubmit={(values) => updateProjects(values)}
      >
        {({ values, setFieldTouched, setFieldValue, errors, touched }) => (
          <Form>
            <FieldArray name="projects">
              {({ push, remove }) => (
                <>
                  {values?.projects.map((value, index) => (
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span>{index + 1}.</span>
                        <MdDeleteForever
                          onClick={() => remove(index)}
                          size={25}
                          color="gray"
                        />
                      </div>
                      <FieldItem
                        type="text"
                        placeholder="Project Name"
                        name={`projects[${index}].projectName`}
                      />{" "}
                      <div className="w-full flex gap-2 items-center flex-1 sm:gap-3 md:gap-4">
                        <TextField
                          type="date"
                          placeholder="Start Date"
                          label=""
                          slotProps={{ shrink: false }}
                          sx={{ width: "48%", ...textField_style }}
                          value={values.projects[index].startDate}
                          onBlur={() =>
                            setFieldTouched(
                              `projects[${index}].startDate`,
                              true
                            )
                          }
                          onChange={(e) =>
                            setFieldValue(
                              `projects[${index}].startDate`,
                              e.target.value
                            )
                          }
                          helperText={
                            touched.projects?.[index]?.startDate &&
                            errors.projects?.[index]?.startDate
                          }
                        />
                        <TextField
                          type="date"
                          placeholder="End Date"
                          label=""
                          slotProps={{ shrink: false }}
                          sx={{ width: "48%", ...textField_style }}
                          value={values.projects[index].endDate}
                          onBlur={() =>
                            setFieldTouched(`projects[${index}].endDate`, true)
                          }
                          onChange={(e) =>
                            setFieldValue(
                              `projects[${index}].endDate`,
                              e.target.value
                            )
                          }
                          helperText={
                            touched.projects?.[index]?.endDate &&
                            errors.projects?.[index]?.endDate
                          }
                        />
                      </div>
                      <div className="relative">
                        <Field
                          name={`projects[${index}].description`}
                          as="textarea"
                          className="textarea-style"
                          placeholder="Start Typing -  ZAKI AI will take it from here"
                        />
                        <ErrorMessage
                          name={`projects[${index}].description`}
                          component="div"
                          className="text-[12px] text-red-400"
                        />
                        <img
                          src="https://app.ziphire.hr/assets/img/zaki_ai_image.jpeg"
                          alt="some pic"
                          className="w-[30px] h-[30px] rounded-[50%] cursor-pointer absolute bottom-6 right-3"
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: "",
                          projectName: "",
                          startDate: "",
                          endDate: "",
                          description: "",
                        })
                      }
                      className="flex items-center gap-2 my-4"
                    >
                      <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                        +
                      </span>
                      <span>Add One More Project</span>
                    </button>
                  </div>
                  <SaveButton isSaving={isSaving}/>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </CustomAccordion>
  );
};

export default Projects;
