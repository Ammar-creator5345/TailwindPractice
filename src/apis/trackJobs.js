import { api } from "./mainApi";

export const getTrackJobs = async ({
  inProcess = "",
  schedule = "",
  offer = "",
  rejected = "",
}) => {
  try {
    const res = await api.get("/applications/", {
      params: {
        ...(inProcess && { status: "in_process" }),
        ...(schedule && { status: "interview_scheduled" }),
        ...(offer && { status: "offer_received" }),
        ...(rejected && { status: "rejected" }),
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const getJobDetailsById = async (id) => {
  try {
    const res = await api.get(`/applications/${id}/`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getJobConnectionsById = async (id) => {
  try {
    const res = await api.get(
      `https://api.ziphire.hr/v2/client/job/${id}/connections/`
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const getSkillTrackerById = async (id) => {
  try {
    const res = await api.get(`/job-skill-tracker/?job_id=${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getCoverLetterById = async (id) => {
  try {
    const res = await api.get(`/job-cover-letter/${id}/`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getRecentResume = async (id) => {
  try {
    const res = await api.get(`/recent-downloaded-resume/`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getReminders = async (id) => {
  try {
    const res = await api.get(`/application-reminders/by-application/${id}/`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const postReminder = async (data) => {
  try {
    const res = await api.post(`/application-reminders/`, data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteReminder = async (id) => {
  try {
    const res = await api.delete(`/application-reminders/${id}/`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getReminderTypes = async () => {
  try {
    const res = await api.get(`/application-reminder-types/`);
    return res;
  } catch (err) {
    throw err;
  }
};
export const postReminderType = async (data) => {
  try {
    const res = await api.post(`/application-reminder-types/`, data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const downloadPdf = async (id) => {
  try {
    const res = await api.get(`resumes/${id}/download_pdf?template=1`, {
      responseType: "blob",
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const postEmailTemplates = async (data) => {
  try {
    const res = await api.post(`/application-email-templates/`, data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const postStatusJob = async (id, data) => {
  try {
    const res = await api.post(`/applications/${id}/update_status/`, data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const notificationJobAlerts = async () => {
  try {
    const res = await api.get(
      "https://api.ziphire.hr/v2/notifications/candidate-notificatino-job-alerts/"
    );
    return res;
  } catch (err) {
    throw err;
  }
};
