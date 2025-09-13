import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import { skillsValidation } from "../components/validationSchema";
import SaveButton from "./rawComponents/saveButton";
import { MdDeleteForever } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { postSkill } from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";
import { useEffect, useState } from "react";

const Skills = ({
  skills,
  allSkills,
  recommendedSkills,
  loading,
  setExcludedIds,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const initialValues = {
    skills: skills.length ? skills : [],
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
  
  const updateSkills = (values) => {
    setIsSaving(true);
    const dataForSubmit = { skills: values?.skills.map((s) => s.id) };
    postSkill(dataForSubmit)
      .then(() => {
        setShowAlert(true);
        setIsSaving(false);
      })
      .catch((err) => {
        alert(err);
        setIsSaving(false);
      });
  };

  return (
    <CustomAccordion title="Skills">
      {showAlert && (
        <ShowAlert section="skills" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={skillsValidation}
        enableReinitialize
        onSubmit={(values) => updateSkills(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="skills">
              {({ push, remove }) => (
                <>
                  <div className="flex items-center gap-x-2 gap-y-4 flex-wrap">
                    {values?.skills?.map((value, index) => (
                      <div key={index} className="w-[48%] flex items-center">
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
                          value={values.skills[index]?.skill || ""}
                          onChange={(e) => {
                            const selectedOption = allSkills.find(
                              (opt) => opt.label === e.target.value
                            );
                            if (selectedOption) {
                              setFieldValue(
                                `skills[${index}].skill`,
                                selectedOption.label
                              );
                              setFieldValue(
                                `skills[${index}].id`,
                                selectedOption.id
                              );
                            }
                          }}
                          sx={{
                            width: "90%",
                            ...textField_style,
                          }}
                        >
                          {allSkills?.map((option) => (
                            <MenuItem key={option.id} value={option.label}>
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
                    <span>Add Skill</span>
                  </button>
                  <h1 className="mb-3">Recommended Skills</h1>
                  <div className="flex gap-2 items-center flex-wrap w-full justify-start">
                    {loading && <CircularProgress size={25} />}
                    {recommendedSkills?.map((skill, index) => (
                      <button
                        type="button"
                        key={index}
                        className="py-1 px-3 text-[12px] whitespace-nowrap rounded-2xl bg-green-200"
                        onClick={() => {
                          push({ id: skill.id, skill: skill.label });
                          setExcludedIds((prev) => [...prev, skill.id]);
                        }}
                      >
                        {skill.label}
                      </button>
                    ))}
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

export default Skills;
