import { api } from "./mainApi";

// https://api.ziphire.hr/v2/developer/jobs/recommended/?page=1&page_size=4

// https://api.ziphire.hr/v2/developer/jobs/top-matches/?page=1&page_size=4

// https://api.ziphire.hr/v2/developer/jobs/most-recent/?page=1&page_size=4

// https://api.ziphire.hr/v2/developer/saved-jobs/?page=1&page_size=4

export const getRecommendedJobs = async (
  page,
  page_size = 4,
  title = "",
  location = "",
  workMode,
  workPreference
) => {
  try {
    const res = await api.get(`/jobs/recommended/`, {
      params: {
        ...(workMode && { work_modes: workMode }),
        ...(location && { location }),
        ...(title && { search: title }),
        ...(workPreference && { work_preferences: workPreference }),
        page,
        page_size,
      },
    });
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const getTopMatchedJobs = async (
  page,
  page_size = 4,
  title = "",
  location = "",
  workMode,
  workPreference
) => {
  try {
    const res = await api.get(`/jobs/top-matches/`, {
      params: {
        ...(workMode && { work_modes: workMode }),
        ...(location && { location }),
        ...(title && { search: title }),
        ...(workPreference && { work_preferences: workPreference }),
        page,
        page_size,
      },
    });
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const getRecentJobs = async (
  page,
  page_size = 4,
  title = "",
  location = "",
  workMode,
  workPreference
) => {
  try {
    const res = await api.get(`/jobs/most-recent/`, {
      params: {
        ...(workMode && { work_modes: workMode }),
        ...(location && { location }),
        ...(title && { search: title }),
        ...(workPreference && { work_preferences: workPreference }),
        page,
        page_size,
      },
    });
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const getSavedJobs = async (
  page,
  page_size = 4,
  title = "",
  location = "",
  workMode,
  workPreference
) => {
  try {
    const res = await api.get(`/saved-jobs/`, {
      params: {
        ...(workMode && { work_modes: workMode }),
        ...(location && { location }),
        ...(title && { search: title }),
        ...(workPreference && { work_preferences: workPreference }),
        page,
        page_size,
      },
    });
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const postSavedJob = async (data) => {
  try {
    const res = await api.post(`/saved-jobs/`, data);
    return res;
  } catch (err) {
    alert(err);
  }
};
export const postUnSavedJob = async (data) => {
  try {
    const res = await api.post(`/saved-jobs/unsave/`, data);
    return res;
  } catch (err) {
    alert(err);
  }
};

export const getDetailsOfJob = async (id) => {
  try {
    const res = await api.get(`https://api.ziphire.hr/v2/client/jobs?id=${id}`);
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const postAppliedJob = async (data) => {
  try {
    const res = await api.post("/applications/", data);
    return res;
  } catch (err) {
    throw err;
  }
};



export const unlockJob = async (data) => {
  try {
    const res = await api.post("/user-job-unlock/", data);
    return res;
  } catch (err) {
    throw err;
  }
};
