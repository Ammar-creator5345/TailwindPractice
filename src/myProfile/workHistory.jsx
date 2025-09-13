import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import FieldItem from "./rawComponents/fieldItem";
import SaveButton from "./rawComponents/saveButton";
import { MdDeleteForever } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { workValidation } from "../components/validationSchema";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import { deleteWork, getWorks, postWork, putWork } from "../apis/mainApi";
import { useState } from "react";
import ShowAlert from "../components/showSuccessFullMsg";

const WorkHistory = ({ work }) => {
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

  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const initialValues = {
    work: work.length
      ? work
      : [
          {
            id: "",
            jobTitle: "",
            companyName: "",
            startDate: "",
            endDate: "",
            workLocation: "",
            description: "",
            present: false,
          },
        ],
  };
  const updateWorkHistory = async (values) => {
    setIsSaving(true);
    const allRequests = [];
    const previousWorksRequest = await getWorks();
    const previousWorkIds = previousWorksRequest.data.data.map((w) => w.id);
    const currentWorkIds = values.work.map((w) => w.id).filter(Boolean);
    const idsForDeletion = previousWorkIds.filter(
      (id) => !currentWorkIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(deleteWork(id));
    });
    const ForSubmittingWork = values?.work.map((work) => {
      const workData = {
        company_name: work.companyName,
        role: work.jobTitle,
        start_date: work.startDate || null,
        end_date: work.present ? null : work.endDate || null,
        is_running: work.present,
        description: work.description,
        location: work.workLocation,
      };
      if (work.id) {
        allRequests.push(putWork(workData, work.id));
      } else {
        allRequests.push(postWork(workData));
      }
    });
    Promise.all(allRequests)
      .then(() => {
        setIsSaving(false);
        setShowAlert(true);
      })
      .catch((err) => {
        setIsSaving(false);
      });
  };

  return (
    <CustomAccordion title="Work History">
      {showAlert && (
        <ShowAlert section="works" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={workValidation}
        enableReinitialize
        onSubmit={(values) => updateWorkHistory(values)}
      >
        {({ values, setFieldTouched, setFieldValue, touched, errors }) => (
          <Form>
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
                      <div className="w-full flex flex-col justify-start items-start gap-1 flex-1 sm:gap-2 md:gap-4 sm:items-center sm:flex-row">
                        <TextField
                          type="date"
                          placeholder="Start Date"
                          label=""
                          slotProps={{ shrink: false }}
                          sx={{
                            width: {
                              xs: "80%",
                              sm: "fit-content",
                            },
                            ...textField_style,
                          }}
                          value={values.work[index].startDate}
                          onBlur={() =>
                            setFieldTouched(`work[${index}].startDate`, true)
                          }
                          onChange={(e) =>
                            setFieldValue(
                              `work[${index}].startDate`,
                              e.target.value
                            )
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
                          sx={{
                            width: {
                              xs: "80%",
                              sm: "fit-content",
                            },
                            ...textField_style,
                          }}
                          value={values.work[index].endDate}
                          onBlur={() =>
                            setFieldTouched(`work[${index}].endDate`, true)
                          }
                          onChange={(e) =>
                            setFieldValue(
                              `work[${index}].endDate`,
                              e.target.value
                            )
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
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setFieldValue(
                                  `work[${index}].present`,
                                  isChecked
                                );
                                if (isChecked) {
                                  setFieldValue(`work[${index}].endDate`, "");
                                }
                              }}
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
                      <div className="relative">
                        <Field
                          name={`work[${index}].description`}
                          as="textarea"
                          className="textarea-style"
                          placeholder="Start Typing -  ZAKI AI will take it from here"
                        />
                        <ErrorMessage
                          name={`work[${index}].description`}
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
                    <span>Add more Employment</span>
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

export default WorkHistory;
