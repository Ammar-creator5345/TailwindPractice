import * as Yup from "yup";

export const validationSchema = Yup.object({
  jobTitle: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.object().nullable().required("Country is required"),
  location: Yup.string().required("City is required"),
  email: Yup.string()
    .email("must be valid Email")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]*$/, "must be digits only")
    .required("Mobile number is required"),
  description: Yup.string().required("Description is required"),
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
              .min(Yup.ref("startDate"), "end Date cannot be before Start date")
              .max(new Date(), "end Date cannot be in future"),
        }),
    })
  ),
  languages: Yup.array().of(
    Yup.object().shape({
      language: Yup.string().required("Language is required"),
      proficiency: Yup.string().required("Proficiency is required"),
    })
  ),
  hobbies: Yup.array().of(
    Yup.object().shape({
      hobby: Yup.string().required("Title is required"),
    })
  ),
  internships: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Project name is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.date()
        .min("1900-03-03", "start Date must be valid")
        .max(new Date(), "start Date cannot be in future")
        .required("start Date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "end Date cannot be before start date")
        .max(new Date(), "end Date cannot be in future")
        .required("end date is required"),
    })
  ),
  courses: Yup.array().of(
    Yup.object().shape({
      courseName: Yup.string().required("Course name is required"),
      dateAwarded: Yup.date().required("date awarded is required"),
      organizationName: Yup.string().required("Organization name is required"),
    })
  ),
  projects: Yup.array().of(
    Yup.object().shape({
      projectName: Yup.string().required("Project name is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.date()
        .min("1900-03-03", "start Date must be valid")
        .max(new Date(), "start Date cannot be in future")
        .required("start Date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "end Date cannot be before start date")
        .max(new Date(), "end Date cannot be in future")
        .required("end date is required"),
    })
  ),
  certificates: Yup.array().of(
    Yup.object().shape({
      certificateTitle: Yup.string().required("Certificate title is required"),
      dateAwarded: Yup.date().required("date awarded is required"),
      organizationName: Yup.string().required("Organization name is required"),
    })
  ),
});

export const personalInfoValidation = Yup.object({
  jobTitle: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.object().nullable().required("Country is required"),
  location: Yup.string().required("City is required"),
  email: Yup.string()
    .email("must be valid Email")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]*$/, "must be digits only")
    .required("Mobile number is required"),
  linkedinLink: Yup.string(),
  githubLink: Yup.string(),
});

export const aboutMeValidation = Yup.object({
  description: Yup.string().required("Description is required"),
});

export const educationValidation = Yup.object({
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
});

export const workValidation = Yup.object({
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
              .min(Yup.ref("startDate"), "end Date cannot be before Start date")
              .max(new Date(), "end Date cannot be in future"),
        }),
    })
  ),
});

export const skillsValidation = Yup.object({
  skills: Yup.array().of(
    Yup.object().shape({
      skill: Yup.string().required("Skill is required"),
    })
  ),
});

export const languagesValidation = Yup.object({
  languages: Yup.array().of(
    Yup.object().shape({
      language: Yup.string().required("Language is required"),
      proficiency: Yup.string().required("Proficiency is required"),
    })
  ),
});

export const hobbiesValidation = Yup.object({
  hobbies: Yup.array().of(
    Yup.object().shape({
      hobby: Yup.string().required("Title is required"),
    })
  ),
});

export const projectsValidation = Yup.object({
  projects: Yup.array().of(
    Yup.object().shape({
      projectName: Yup.string().required("Project name is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.date()
        .min("1900-03-03", "start Date must be valid")
        .max(new Date(), "start Date cannot be in future")
        .required("start Date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "end Date cannot be before start date")
        .max(new Date(), "end Date cannot be in future")
        .required("end date is required"),
    })
  ),
});
export const certificatesValidation = Yup.object({
  certificates: Yup.array().of(
    Yup.object().shape({
      certificateTitle: Yup.string().required("Certificate title is required"),
      dateAwarded: Yup.date().required("date awarded is required"),
      organizationName: Yup.string().required("Organization name is required"),
    })
  ),
});

export const internshipsValidation = Yup.object({
  internships: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Compnay name is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.date()
        .min("1900-03-03", "start Date must be valid")
        .max(new Date(), "start Date cannot be in future")
        .required("start Date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "end Date cannot be before start date")
        .max(new Date(), "end Date cannot be in future")
        .required("end date is required"),
    })
  ),
});
export const coursesValidation = Yup.object({
  certificates: Yup.array().of(
    Yup.object().shape({
      courseName: Yup.string().required("Course name is required"),
      dateAwarded: Yup.date().required("date awarded is required"),
      organizationName: Yup.string().required("Organization name is required"),
    })
  ),
});