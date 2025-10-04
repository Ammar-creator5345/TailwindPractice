import { useEffect, useRef, useState } from "react";
import { getChatList, getSessionId, postChat } from "../apis/zakiAi";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SendIcon from "../svgs/sendIcon";
import ReactMarkdown from "react-markdown";
import PlayIcon from "../svgs/playIcon";

const ZakiAi = ({ open, setOpen }) => {
  const [sessionId, setSessionId] = useState(null);
  const [chatList, setChatList] = useState([]);
  //   const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef();
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getSessionId();
        console.log("session id", res.data);
        setSessionId(res.data.session_id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSessions();
  }, []);
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        if (!sessionId) return;
        const res = await getChatList(sessionId);
        console.log(res.data);
        setChatList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChatList();
  }, [sessionId]);
  const handlePostChat = () => {
    if (prompt.trim() === "") return;
    setChatList((prev) => {
      return [...prev, { content: "", prompt: prompt }];
    });
    setPrompt("");

    const post_chat = async () => {
      try {
        const userPrompt = prompt;
        setLoading(true);
        const data = {
          prompt: userPrompt,
          session_id: sessionId,
        };
        const res = await postChat(data);
        console.log(res.data);
        let result = res.data;
        if (typeof result === "string" && result.startsWith("data:")) {
          result = result.replace(/^data:\s*/g, "");
        }
        setChatList((prev) => {
          const copyVersion = [...prev];
          copyVersion[copyVersion.length - 1].content = result;
          return copyVersion;
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    post_chat();
  };
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [chatList, loading]);
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);
  return (
    <>
      <Drawer
        open={open}
        variant="persistent"
        onClose={() => setOpen(false)}
        onEnter={() => {
          setTimeout(() => {
            if (chatRef.current) {
              chatRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }
          }, 300);
        }}
        anchor="right"
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: "100%",
              },
              borderRadius: "30px 0px 0px 30px",
              height: "100vh",
              "@media (min-width:770px)": {
                width: "445px",
              },
            },
          },
        }}
      >
        <div className="p-3 px-5 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 py-5 px-2 pb-7">
              <img
                src="	https://app.ziphire.hr/assets/img/zaki_ai_image.jpeg"
                alt="some"
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-semibold mb-2">
                Zaki - your Ai Copilot
              </h1>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="bg-[#FAFAFA] p-2 px-[10px] rounded-2xl"
            >
              <PlayIcon />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-260px)] px-4">
            <div>
              {chatList?.map((chat) => (
                <div key={chat.id} className="mt-2 flex flex-col gap-2">
                  <div className="flex items-center justify-end">
                    <p className="chat-bubble-right">{chat?.prompt}</p>
                  </div>
                  <div className="flex items-center justify-start">
                    {chat?.content && (
                      <p className="chat-bubble-left">
                        <ReactMarkdown>{chat?.content}</ReactMarkdown>
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {loading && <p className="loader mt-3"></p>}
              <div ref={chatRef}></div>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center whitespace-nowrap gap-2 overflow-x-scroll no-scrollbar">
              <p
                onClick={(e) => setPrompt(e.currentTarget.innerText)}
                className="bg-[#F4D06F] text-[12px] py-1 px-2 rounded-xl cursor-pointer"
              >
                What skills should I learn for my career?
              </p>
              <p
                onClick={(e) => setPrompt(e.currentTarget.innerText)}
                className="bg-[#F4D06F] text-[12px] py-1 px-2 rounded-xl cursor-pointer"
              >
                How can I improve my resume?
              </p>
            </div>
            <div className="mt-3 relative overflow-y-auto">
              <textarea
                value={prompt}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handlePostChat();
                  }
                }}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full h-[90px] resize-none rounded-xl border p-3 py-2 bg-[#FAFAFA] outline-none"
              />
              <button
                onClick={handlePostChat}
                className="bg-black p-2 rounded-lg absolute right-2 bottom-4"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ZakiAi;
