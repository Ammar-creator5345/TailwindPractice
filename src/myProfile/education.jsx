import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import FieldItem from "./rawComponents/fieldItem";
import * as Yup from "yup";
import SaveButton from "./rawComponents/saveButton";
import { MdDeleteForever } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import ShowAlert from "../components/showSuccessFullMsg";
import {
  deleteEducation,
  getEducations,
  postEducation,
  putEducation,
} from "../apis/mainApi";
import { useState } from "react";

const Education = ({ education }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const initialValues = {
    education: education.length
      ? education
      : [
          {
            id: "",
            schoolName: "",
            degreeName: "",
            degreeType: "",
            score: "",
            scoreType: "",
            startYear: "",
            completionYear: "",
            location: "",
            description: "",
          },
        ],
  };
  const validationSchema = Yup.object({
    education: Yup.array().of(
      Yup.object({
        schoolName: Yup.string().required("School name is required"),
        degreeName: Yup.string().required("Degree name is required"),
        degreeType: Yup.string().required("Degree type is required"),
        startYear: Yup.string()
          .matches(/^\d{4}$/, "Enter a valid 4-digit year (e.g., 2020).")
          .test(
            "min-year",
            "Year must be 1950 or later",
            (value) => !value || Number(value) >= 1950
          )
          .test(
            "max-year",
            "Year cannot be in future",
            (value) => !value || Number(value) < new Date().getFullYear()
          )
          .required("Start Year is required"),
        completionYear: Yup.string()
          .matches(/^\d{4}$/, "Enter a valid 4-digit year (e.g., 2020).")
          .test(
            "min-year",
            "Year must be 1950 or later",
            (value) => !value || Number(value) >= 1950
          )
          .test(
            "max-year",
            "Year cannot be in future",
            (value) => !value || Number(value) < new Date().getFullYear()
          )
          .required("Completion Year is required"),
      })
    ),
  });
  const updateEducation = async (values) => {
    setIsSaving(true);
    const allRequests = [];
    const previosEducation = await getEducations();
    const previosIds = previosEducation?.data?.data.map((edu) => edu.id);
    const currentIds = values.education.map((edu) => edu.id).filter(Boolean);
    const idsForDeletion = previosIds.filter((id) => !currentIds.includes(id));
    idsForDeletion.forEach((id) => {
      allRequests.push(deleteEducation(id));
    });
    const cgpaSystemMap = {
      "CGPA(out of 4)": "cgpa_4",
      "CGPA(out of 5)": "cgpa_5",
      "CGPA(out of 10)": "cgpa_10",
      Percentage: "percentage",
    };
    const degreeSystem = {
      "Doctorate(or equivalent)": 1,
      "Masters(or equivalent)": 2,
      "MBA(or equivalent)": 3,
      "Bachelors(or equivalent)": 4,
    };
    values?.education.map((value) => {
      const dataForSubmit = {
        id: value.id,
        school: value.schoolName,
        field_of_study: value.degreeName,
        degree: degreeSystem[value.degreeType],
        score: value.score,
        score_type: cgpaSystemMap[value.scoreType],
        started_year: value.startYear,
        completed_year: value.completionYear,
        location: value.location,
        description: value.description,
      };
      if (value.id) {
        allRequests.push(putEducation(dataForSubmit, value.id));
      } else {
        allRequests.push(postEducation(dataForSubmit));
      }
    });
    Promise.all(allRequests).then(() => {
      setShowAlert(true);
      setIsSaving(false);
    });
  };

  return (
    <CustomAccordion title="Education">
      <div>
        {showAlert && (
          <ShowAlert section="education" onClose={() => setShowAlert(false)} />
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => updateEducation(values)}
        >
          {({ values, setFieldTouched, setFieldValue, touched, errors }) => (
            <Form>
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
                                `education[${index}].degreeType`,
                                true
                              )
                            }
                            onChange={(e) =>
                              setFieldValue(
                                `education[${index}].degreeType`,
                                e.target.value
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
                              Boolean(errors.education?.[index]?.scoreType)
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
                              "CGPA(out of 10)",
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
                            name={`education[${index}].location`}
                            type="text"
                            placeholder="Location"
                          />
                        </div>
                        <div className="relative">
                          <Field
                            name={`education[${index}].description`}
                            as="textarea"
                            className="textarea-style"
                            placeholder="Start Typing -  ZAKI AI will take it from here"
                          />
                          <ErrorMessage
                            name={`education[${index}].description`}
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
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: "",
                          schoolName: "",
                          degreeName: "",
                          degreeType: "",
                          score: "",
                          scoreType: "",
                          startYear: "",
                          completionYear: "",
                          location: "",
                        })
                      }
                      className="flex items-center gap-2 my-4"
                    >
                      <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                        +
                      </span>
                      <span>Add One More Education</span>
                    </button>
                  </>
                )}
              </FieldArray>
              <SaveButton isSaving={isSaving} />
            </Form>
          )}
        </Formik>
      </div>
    </CustomAccordion>
  );
};

export default Education;
