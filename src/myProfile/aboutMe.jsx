import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import * as Yup from "yup";
import SaveButton from "./rawComponents/saveButton";
import { postAboutMe } from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";
import { useState } from "react";

const AboutMe = ({ profileData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const initialValues = profileData
    ? {
        description: profileData?.about || "",
        workModes: profileData?.work_mode.map((job) => job.id.toString()) || [],
        jobTypes:
          profileData?.preferred_job_type.map((job) => job.id.toString()) || [],
      }
    : {
        description: "",
        workModes: [],
        jobTypes: [],
      };
  const workModesOptions = [
    { id: 3, label: "Hybrid" },
    { id: 2, label: "Remote" },
    { id: 1, label: "On-Site" },
  ];

  const jobTypesOptions = [
    { id: 4, label: "Contract" },
    { id: 3, label: "Freelance" },
    { id: 2, label: "Part-Time" },
    { id: 1, label: "Full-Time" },
  ];

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
  });
  const styleCheckbox = {
    color: "black",
    "&.Mui-checked": {
      color: "red",
    },
  };
  const updateAboutMe = (values) => {
    setIsSaving(true);
    const dataForSubmit = {
      about: values.description,
      preferred_job_type_ids: values.jobTypes,
      work_mode_ids: values.workModes,
    };
    postAboutMe(dataForSubmit)
      .then(() => {
        setIsSaving(false);
        setShowAlert(true);
      })
      .catch((err) => {
        alert(err);
        setIsSaving(false);
      });
  };
  return (
    <CustomAccordion title="About Me">
      {showAlert && (
        <ShowAlert section="aboutMe" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => updateAboutMe(values)}
      >
        {({ values }) => (
          <Form>
            <div>
              <div className="relative">
                <Field
                  name="description"
                  as="textarea"
                  className="textarea-style"
                  placeholder="Start Typing -  ZAKI AI will take it from here"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-[12px] text-red-400"
                />
                <img
                  src="https://app.ziphire.hr/assets/img/zaki_ai_image.jpeg"
                  alt="some pic"
                  className="w-[30px] h-[30px] rounded-[50%] cursor-pointer absolute bottom-6 right-3"
                />
              </div>
              <h3 className="text-[15px] font-bold mt-4">Work Mode</h3>
              <div className="flex items-center gap-2 mt-3">
                {workModesOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 justify-center px-4 py-2 rounded-xl shadowColor w-fit cursor-pointer"
                  >
                    <Field
                      type="checkbox"
                      name="workModes"
                      value={option.id.toString()}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              <h3 className="text-[15px] font-bold mt-4">Preferred Job Type</h3>
              <div className="flex items-center gap-2 mt-3 mb-7">
                {jobTypesOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 justify-center px-4 py-2 rounded-xl shadowColor w-fit cursor-pointer"
                  >
                    <Field
                      type="checkbox"
                      name="jobTypes"
                      value={option.id.toString()}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              <SaveButton isSaving={isSaving} />
            </div>
          </Form>
        )}
      </Formik>
    </CustomAccordion>
  );
};

export default AboutMe;
