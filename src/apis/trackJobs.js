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
