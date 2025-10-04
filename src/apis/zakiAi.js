import { api } from "./mainApi";

export const getSessionId = async () => {
  try {
    const res = await api.get(
      "https://api.ziphire.hr/v2/openai/zaki-chat-sessions/"
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const getChatList = async (id) => {
  try {
    const res = await api.get(
      `https://api.ziphire.hr/v2/openai/zaki-chat-list/?session_id=${id}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const postChat = async (data) => {
  try {
    const res = await api.post(
      `https://api.ziphire.hr/v2/openai/zaki-chat-create/`,
      data,
      {
        headers: {
          Accept: "text/event-stream",
        },
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
};
