import { api } from "./mainApi";

export const getSubscriptionInvoices = async () => {
  try {
    const res = api.get("https://api.ziphire.hr/v2/subscription/invoices/");
    return res;
  } catch (err) {
    throw err;
  }
};

export const getCurrentSubscription = async () => {
  try {
    const res = api.get(
      "https://api.ziphire.hr/v2/subscription/get-current-subscription//"
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const createSubscription = async (data) => {
  try {
    const res = api.post(
      "https://api.ziphire.hr/v2/subscription/create/",
      data
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const getPreferences = async () => {
  try {
    const res = api.get("/preferences/");
    return res;
  } catch (err) {
    throw err;
  }
};

export const putPreferences = async (payload) => {
  try {
    const res = api.put("/preferences/", payload);
    return res;
  } catch (err) {
    throw err;
  }
};
