import Drawer from "@mui/material/Drawer";
import { IoIosArrowBack } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useCountries from "../rawData/countries";
import { MenuItem } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import axios from "axios";

export default function ResumeSideDrawer({ open, setOpen }) {
  const { countries } = useCountries();
  const token = localStorage.getItem("token");
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
  const ResumeMenuItem = ({ title, items }) => {
    return (
      <div className="border my-3 rounded-lg overflow-hidden">
        <div className="text-md font-semibold bg-[#fafafa] p-[6px]">
          {title}
        </div>
        <div className="flex text-sm divide-x justify-between p-4">
          {items?.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-[50px] h-[50px]">{item.progressCircle}</div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
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
  const CustomAccordion = ({ children, title }) => (
    <Accordion
      sx={{
        fontWeight: "600",
        boxShadow: "none",
        marginBottom: "10px",
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
        sx={{ border: "1px solid #e2e8f0", borderRadius: "10px" }}
      >
        <CheckCircleOutlineIcon className="bg-yellow-200 rounded-full mr-1" />
        <span component="span">{title}*</span>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
  const InputButtonForSubmit = () => (
    <>
      <hr className="my-4" />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
        >
          Save
        </button>
      </div>
    </>
  );
  const ZakiAiPortion = ({ title }) => (
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

  const styleForDrawer = {
    textSize: "26px",
    textColor: "#000000",
    trailColor: "transparent",
  };

  const initialValues = {
    country: "",
    location: "",
    email: "",
    mobileNumber: "",
    linkedinLink: "",
    githubLink: "",
    education: [
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
    work: [
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
    skills: [
      // {
      //   skill: "",
      // },
    ],
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    country: Yup.string().required("Please select a valid country"),
    location: Yup.string().required("City is required"),
    email: Yup.string()
      .email("must be valid Email")
      .required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]*$/, "must be digits only")
      .required("Mobile number is required"),
    textarea: Yup.string().required("Description is required"),
    education: Yup.array().of(
      Yup.object().shape({
        schoolName: Yup.string().required("SchoolName is required"),
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
    work: Yup.array().of(
      Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        companyName: Yup.string().required("Company Name is required"),
        description: Yup.string().required("Description is required"),
        startDate: Yup.date()
          .nullable()
          .max(new Date(), "start date cannot be in future")
          .required("start Date is required"),
        endDate: Yup.date()
          .nullable()
          .when("present", {
            is: true,
            then: (result) => result.notRequired(),
            otherwise: (result) =>
              result
                .required("End Date is required")
                .min(
                  Yup.ref("startDate"),
                  "end Date cannot be before Start date"
                )
                .max(new Date(), "end Date cannot be in future"),
          }),
      })
    ),
  });
  return (
    <div>
      <Drawer
        anchor="right"
        open={true}
        onClose={() => setOpen(false)}
        slotProps={{
          backdrop: {
            sx: { background: "rgba(0,0,0,0.1)" },
          },
          paper: {
            sx: { width: "88%" },
          },
        }}
      >
        <div className="flex">
          <div className="px-5 py-10 w-[60%]">
            <button className="flex items-center gap-2">
              <span className="bg-green-300 p-2 rounded-xl">
                <IoIosArrowBack size={25} />
              </span>
              <span className="text-md font-semibold">Back to My Resumes</span>
            </button>
            <h1 className="text-2xl font-semibold pt-4">
              Your Resume Analysis
            </h1>
            <ResumeMenuItem
              title="Resume Score"
              items={[
                {
                  text: "A higher score increases your chances of getting noticed—review and refine your resume for an even better fit!",
                  progressCircle: (
                    <CircularProgressbar
                      styles={buildStyles(styleForDrawer)}
                      value={10}
                      text={`${10}%`}
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
                      value={10}
                      text={`${10}%`}
                    />
                  ),
                },
                {
                  text: "Readability",
                  progressCircle: (
                    <CircularProgressbar
                      styles={buildStyles(styleForDrawer)}
                      value={20}
                      text={`${20}%`}
                    />
                  ),
                },
                {
                  text: "Content",
                  progressCircle: (
                    <CircularProgressbar
                      styles={buildStyles(styleForDrawer)}
                      value={5}
                      text={`${5}%`}
                    />
                  ),
                },
                {
                  text: "Keyword",
                  progressCircle: (
                    <CircularProgressbar
                      styles={buildStyles(styleForDrawer)}
                      value={15}
                      text={`${15}%`}
                    />
                  ),
                },
              ]}
            />
            <div className="border my-3 rounded-lg overflow-hidden">
              <div className="text-md font-semibold bg-[#fafafa] p-[6px]">
                <span>Areas for Improvement</span>
              </div>
              <div className="px-4">
                <div className="py-6 flex overflow-x-auto whitespace-nowrap gap-2 hide-scrollbar">
                  <span className="border font-semibold text-[15px] rounded-xl p-2">
                    Add contact information to ensure employers can reach out.
                  </span>
                  <span className="border font-semibold text-[15px] rounded-xl p-2">
                    Add contact information to ensure employers can reach out.
                  </span>{" "}
                  <span className="border font-semibold text-[15px] rounded-xl p-2">
                    Add contact information to ensure employers can reach out.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Resume Sections</h1>
              <span className="text-[14px]">
                We've pre-filled your resume using your profile details. Review,
                edit, and customize each section to create a resume that truly
                represents you!
              </span>
            </div>
            <hr className="my-7" />
            {/* -------------------- Personal Info Portion ----------------------------- */}
            <CustomAccordion title="Personal Info">
              <div>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={() => console.log("clicked")}
                >
                  {({ errors, touched, setFieldTouched, setFieldValue }) => (
                    <Form>
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
                            value={countries.find(
                              (c) => c.label === initialValues.country
                            )}
                            onChange={(event, newValue) =>
                              setFieldValue(
                                "country",
                                newValue ? newValue.label : ""
                              )
                            }
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
                      <InputButtonForSubmit />
                    </Form>
                  )}
                </Formik>
              </div>
            </CustomAccordion>
            {/* -------------------- About Me Portion ----------------------------- */}
            <CustomAccordion title="About Me">
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={() => console.log("clicked")}
                >
                  {({ touched, errors }) => (
                    <Form>
                      <ZakiAiPortion title="textarea" />
                      <InputButtonForSubmit />
                    </Form>
                  )}
                </Formik>
              </div>
            </CustomAccordion>
            {/* -------------------- Education Portion ----------------------------- */}
            <CustomAccordion title="Education">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => console.log("clicked")}
              >
                {({
                  touched,
                  errors,
                  setFieldTouched,
                  setFieldValue,
                  values,
                }) => (
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
                                  {["Bachelor", "Master", "PhD", "Diploma"].map(
                                    (option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    )
                                  )}
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
                  </Form>
                )}
              </Formik>
            </CustomAccordion>
            {/* ------------------------------ Work Portion ------------------------------------ */}
            <CustomAccordion title="Work History">
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={() => console.log("clicked")}
              >
                {({
                  touched,
                  values,
                  errors,
                  setFieldTouched,
                  setFieldValue,
                }) => (
                  <Form>
                    <FieldArray name="work">
                      {({ push, remove }) => (
                        <>
                          {values.work.map((value, index) => (
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
                  </Form>
                )}
              </Formik>
            </CustomAccordion>
            {/* ------------------------------Skill Portion------------------------------------------ */}
            <CustomAccordion title="skills">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => console.log("clicked")}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <FieldArray name="skills">
                      {({ push, remove }) => (
                        <>
                          <div className="flex items-center gap-1 gap-y-4 flex-wrap">
                            {values.skills.map((value, index) => (
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
                                  !values.skills.some((s) => s.skill === skill)
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
                  </Form>
                )}
              </Formik>
            </CustomAccordion>
            <CustomAccordion title="Languages">

            </CustomAccordion>
          </div>
          <div className="w-[40%] bg-slate-200"></div>
        </div>
      </Drawer>
    </div>
  );
}
