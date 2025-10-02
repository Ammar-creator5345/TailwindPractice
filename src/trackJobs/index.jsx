import { useEffect, useRef, useState } from "react";
import SortIcon1 from "../svgs/sortIcon1";
import SortIcon2 from "../svgs/sortIcon2";
import { useSearchParams } from "react-router-dom";
import { getTrackJobs } from "../apis/trackJobs";
import SortPage1 from "./sortPage1";
import SortPage2 from "./sortPage2";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TrackJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const buttons = [
    "All Jobs",
    "In Process",
    "Interview Scheduled",
    "Offer Received",
    "Rejected",
  ];
  const currentTab = searchParams.get("tab");
  const paramTabs = {
    "All-Jobs": 0,
    "In-Process": 1,
    "Interview-Scheduled": 2,
    "Offer-Received": 3,
    Rejected: 4,
  };
  const [buttonIndex, setButtonIndex] = useState(() => {
    if (paramTabs[currentTab] !== undefined) {
      return paramTabs[currentTab];
    } else {
      return 0;
    }
  });
  const [sortButton, setSortButton] = useState(2);
  const sortPage = {
    1: <SortPage1 data={data} />,
    2: <SortPage2 data={data} />,
  };

  useEffect(() => {
    const tabNames = [
      "All-Jobs",
      "In-Process",
      "Interview-Scheduled",
      "Offer-Received",
      "Rejected",
    ];
    setSearchParams({ tab: tabNames[buttonIndex] });
    const fetchTrackJobs = async () => {
      try {
        setLoading(true);
        const apiCallTab = {
          0: {},
          1: { inProcess: true },
          2: { schedule: true },
          3: { offer: true },
          4: { rejected: true },
        };
        const res = await getTrackJobs(apiCallTab[buttonIndex]);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackJobs();
  }, [buttonIndex]);

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
        const { scrollLeft, scrollWidth, clientWidth } = buttonRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };
    checkScroll();
    buttonRef.current.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, []);

  return (
    <div className="p-2 bg-[#fafafa] md:p-8">
      <h1 className="text-3xl font-bold">Track My Jobs</h1>
      <div>
        {/* ------------------header--------------------- */}
        <div className="flex items-center mt-4">
          {showLeftButton && (
            <button className="bg-[#fafafa] p-2" onClick={() => scroll("left")}>
              <div className="bg-white shadowColor2 rounded-xl p-1 px-2">
                <ArrowBackIosNewIcon sx={{ fontSize: "15px" }} />
              </div>
            </button>
          )}
          <div
            ref={buttonRef}
            className="flex p-1 items-center overflow-x-auto no-scrollbar gap-3"
          >
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => setButtonIndex(index)}
                type="button"
                className={`font-[500] whitespace-nowrap transition-all duration-300 shadowColor2 px-3 py-2 rounded-2xl border-2  ${
                  index === buttonIndex
                    ? "bg-[#7CFCA6] border-black"
                    : "border-transparent bg-white"
                }`}
              >
                {button}
              </button>
            ))}
          </div>
          {showRightButton && (
            <button className="bg-[#fafafa] p-2" onClick={() => scroll("right")}>
              <div className="bg-white shadowColor2 rounded-xl p-1 px-2">
                <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
              </div>
            </button>
          )}
        </div>

        {/* -----------------------sort buttons------------------------- */}
        <div className="flex items-center gap-3 mt-9">
          <button
            onClick={() => setSortButton(1)}
            type="button"
            className="bg-white rounded-2xl shadowColor2 p-2"
          >
            <SortIcon1 bgColor={sortButton === 1 ? " #A38AF1" : ""} />
          </button>
          <button
            onClick={() => setSortButton(2)}
            type="button"
            className="bg-white rounded-2xl shadowColor2 p-2"
          >
            <SortIcon2 bgColor={sortButton === 2 ? " #A38AF1" : ""} />
          </button>
        </div>
        {/* --------------Content---------------------- */}
        {loading ? (
          <div className="flex items-center justify-center mt-8">
            <CircularProgress color="success" />
          </div>
        ) : (
          <div className="mt-4">{sortPage[sortButton]}</div>
        )}
      </div>
    </div>
  );
};

export default TrackJobs;
