import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "application/json; version=1.0",
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
});

// Inject fresh token before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// Handle API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Profile
export const getProfile = () => api.get("/profile");
export const getProfileImage = () => api.get("/profile_image");
export const postProfileImage = (data) =>
  api.post("/profile_image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteProfileImage = () =>
  api.delete("/profile_image", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Projects
export const getProjects = () => api.get("/past_projects");
export const postProject = (data) => api.post("/past_projects", data);
export const putProject = (data, id) => api.put(`/past_projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/past_projects/${id}`);

// Education
export const getEducations = () => api.get("/education");
export const postEducation = (data) => api.post("/education", data);
export const putEducation = (data, id) => api.put(`/education/${id}`, data);
export const deleteEducation = (id) => api.delete(`/education/${id}`);

// Certificates
export const getCertificates = () => api.get("/certificate");
export const postCertificate = (data) => api.post("/certificate", data);
export const putCertificate = (data, id) => api.put(`/certificate/${id}`, data);
export const deleteCertificate = (id) => api.delete(`/certificate/${id}`);

// Work History
export const getWorks = () => api.get("/work_history");
export const postWork = (data) => api.post("/work_history", data);
export const putWork = (data, id) => api.put(`/work_history/${id}`, data);
export const deleteWork = (id) => api.delete(`/work_history/${id}`);

// Languages
export const getLanguages = () => api.get("/language");
export const postLanguage = (data) => api.post("/language", data);
export const putLanguage = (data, id) => api.put(`/language/${id}`, data);
export const deleteLanguage = (id) => api.delete(`/language/${id}`);

// Hobbies
export const getHobbies = () => api.get("/hobbies");
export const postHobby = (data) => api.post("/hobbies", data);
export const putHobby = (data, id) => api.put(`/hobbies/${id}`, data);
export const deleteHobby = (id) => api.delete(`/hobbies/${id}`);

// About Me
export const getAboutMe = () => api.get("/about_me");
export const postAboutMe = (data) => api.post("/about_me", data);

// Publications
export const getPublications = () => api.get("/publications");
export const postPublication = (data) => api.post("/publications", data);
export const putPublication = (data, id) =>
  api.put(`/publications/${id}`, data);
export const deletePublication = (id) => api.delete(`/publications/${id}`);

// Skills
export const getSkills = () => api.get("/skills");
export const postSkill = (data) => api.post("/skills", data);

// Job Types
export const getJobTypes = () => api.get("/job_types");
export const postJobTypes = (data) => api.post("/job_types", data);

// Work Modes
export const getWorkModes = () => api.get("/work_modes");
export const postWorkModes = (data) => api.post("/work_modes", data);

// Personal Info
export const getPersonalInfos = () => api.get("/personal_info");
export const postPersonalInfo = (data) => api.post("/personal_info", data);

// External APIs
export const getAllLanguages = () =>
  api.get("https://api.ziphire.hr/v2/languages");
export const getAllCountries = () =>
  api.get("https://api.ziphire.hr/v2/countries?ordering=label");
export const getAllSkills = () =>
  api.get("https://api.ziphire.hr/v2/technologies?ordering=label");
export const getAllCities = (code) =>
  api.get(`https://api.countrystatecity.in/v1/countries/${code}/cities`, {
    headers: {
      "x-cscapi-key":
        "alVqanZCbWJsaGxxUFZVRjhZalZiRmRFSHVORUJZZTh0V3Q2TVhnNA==",
    },
  });

export const getStats = () => api.get("/applications/application-stats");

// Recommendations
export const getRecommendedSkills = (ids) =>
  api.get(`/get-recommended-skills?exclude_skills=${ids}&developer_id=true`);

export const getCompletionPercentage = () => api.get("/profile-completion");

export const getResumes = async () => {
  try {
    const res = await api.get("/resumes");
    return res;
  } catch (err) {
    throw err;
  }
};

export const postResume = async (data) => {
  try {
    const res = await api.post("/resumes", data, {
      headers: { "content-type": "multipart/form-data" },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const postTailordResume = async (data) => {
  try {
    const res = await api.post("/generate-tailored-resume/", data);
    return res;
  } catch (err) {
    throw err;
  }
};
export const postCoverLetter = async (data) => {
  try {
    const response = await api.post(
      "https://api.ziphire.hr/v2/openai/generate/cover-letter/",
      data
    );
    return response;
  } catch (err) {
    throw err;
  }
};
