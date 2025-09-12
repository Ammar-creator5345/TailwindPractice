import { FieldArray, Form, Formik } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import { languagesValidation } from "../components/validationSchema";
import { MdDeleteForever } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import SaveButton from "./rawComponents/saveButton";
import { useEffect, useState } from "react";
import {
  deleteLanguage,
  getLanguages,
  postLanguage,
  putLanguage,
} from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";

const Languages = ({ allLanguages, comingLanguages }) => {
  const [languages, setLanguages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (comingLanguages?.length) {
      const languageSystem = {
        "fluent/native": "Fluent/Native",
        intermediate: "Intermediate",
        beginner: "Beginner",
      };
      const formattedLanguages = comingLanguages.map((value) => ({
        id: value?.id || "",
        language: value?.language_details?.name || "",
        languageId: value?.language_details?.id || "",
        proficiency: languageSystem[value?.proficiency] || "",
      }));
      setLanguages(formattedLanguages);
    }
  }, [comingLanguages]);

  const initialValues = {
    languages: languages.length ? languages : [],
  };

  const textField_style = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#e2e8f0" },
      "&.Mui-focused fieldset": { borderColor: "#e2e8f0" },
    },
    "& .MuiFormHelperText-root": {
      color: "#e97979",
      margin: "10px 0 0 0",
    },
  };
  const updateLanguages = async (values) => {
    setIsSaving(true);
    const allRequests = [];
    const getPreviosLanguages = await getLanguages();
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
      allRequests.push(deleteLanguage(id));
    });
    values?.languages.map((language) => {
      const uploadedData = {
        id: language.id,
        language: language.languageId,
        proficiency: language.proficiency.toLowerCase(),
      };
      if (language.id) {
        allRequests.push(putLanguage(uploadedData, language.id));
      } else {
        allRequests.push(postLanguage(uploadedData));
      }
    });
    Promise.all(allRequests)
      .then((res) => {
        setIsSaving(false);
        setShowAlert(true);
      })
      .catch((err) => {
        alert(err.response.data.error);
        setIsSaving(false);
      });
  };
  return (
    <CustomAccordion title="Languages">
      {showAlert && (
        <ShowAlert section="languages" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={languagesValidation}
        enableReinitialize
        onSubmit={(values) => updateLanguages(values)}
      >
        {({ values, setFieldTouched, setFieldValue, errors, touched }) => (
          <Form>
            <FieldArray name="languages">
              {({ push, remove }) => (
                <>
                  {values?.languages.map((value, index) => (
                    <div key={index}>
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
                          value={values.languages[index].language}
                          onChange={(e) => {
                            const selectedField = allLanguages.find(
                              (lan) => lan.name === e.target.value
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
                          onBlur={() =>
                            setFieldTouched(
                              `languages[${index}].language`,
                              true
                            )
                          }
                          helperText={
                            touched.languages?.[index]?.language &&
                            errors.languages?.[index]?.language
                          }
                          sx={{ width: "50%", ...textField_style }}
                        >
                          {allLanguages.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          select
                          name={`languages[${index}].proficiency`}
                          label="Proficiency*"
                          value={values.languages[index].proficiency}
                          onChange={(e) =>
                            setFieldValue(
                              `languages[${index}].proficiency`,
                              e.target.value
                            )
                          }
                          onBlur={() =>
                            setFieldTouched(
                              `languages[${index}].proficiency`,
                              true
                            )
                          }
                          helperText={
                            touched.languages?.[index]?.proficiency &&
                            errors.languages?.[index]?.proficiency
                          }
                          sx={{ width: "50%", ...textField_style }}
                        >
                          {["Fluent/Native", "Intermediate", "Beginner"].map(
                            (option, idx) => (
                              <MenuItem key={idx} value={option}>
                                {option}
                              </MenuItem>
                            )
                          )}
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

                  <SaveButton isSaving={isSaving} />
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </CustomAccordion>
  );
};

export default Languages;
