import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useState, useEffect, useRef } from "react";
import Reminders from "./reminders";
import JobAlert from "./jobAlert";
import Assessments from "./assessments";
import { notificationJobAlerts } from "../apis/trackJobs";

const NotificationCenter = () => {
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);
  const buttonRef = useRef();
  const notificationButtons = ["Job Alerts", "Reminders", "Assessments"];
  const [buttonIndex, setButtonIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jobAlert, setJobAlert] = useState({});
  const showTabs = {
    0: (
      <JobAlert
        setJobAlert={setJobAlert}
        jobAlert={jobAlert}
        loading={loading}
      />
    ),
    1: <Reminders />,
    2: <Assessments />,
  };

  const scroll = (direction) => {
    if (buttonRef.current) {
      buttonRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const checkScroll = () => {
      if (buttonRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = buttonRef.current;
        setLeftButton(scrollLeft > 0);
        setRightButton(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };
    checkScroll();
    buttonRef.current.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      if (!buttonRef.current) return;
      buttonRef.current.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await notificationJobAlerts();
        console.log(res.data);
        setJobAlert(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [buttonIndex]);
  return (
    <div>
      <div className="m-8">
        <h1 className="text-[27px] font-bold">Notification Center</h1>
        <div>
          <div className="flex items-center mt-4">
            {leftButton && (
              <button
                className="bg-[#fafafa] p-2"
                onClick={() => scroll("left")}
              >
                <div className="bg-white shadowColor2 rounded-xl p-1 px-2">
                  <NavigateBeforeIcon sx={{ fontSize: "15px" }} />
                </div>
              </button>
            )}
            <div
              ref={buttonRef}
              className="flex gap-3 p-1 items-center overflow-x-auto overflow-y-visible no-scrollbar"
            >
              {notificationButtons.map((value, index) => (
                <button
                  key={index}
                  onClick={() => setButtonIndex(index)}
                  type="button"
                  className={`btn-style border-2 ${
                    buttonIndex === index
                      ? "border-black bg-[#1fffa5]"
                      : "bg-white border-transparent"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            {rightButton && (
              <button
                className="bg-[#fafafa] p-2"
                onClick={() => scroll("right")}
              >
                <div className="bg-white shadowColor2 rounded-xl p-1 px-2">
                  <NavigateNextIcon sx={{ fontSize: "15px" }} />
                </div>
              </button>
            )}
          </div>
          <div className="w-full h-full">{showTabs[buttonIndex]}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
