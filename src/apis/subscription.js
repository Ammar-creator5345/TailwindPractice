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
