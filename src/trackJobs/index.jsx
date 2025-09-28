import { useEffect, useState } from "react";
import SortIcon1 from "../svgs/sortIcon1";
import SortIcon2 from "../svgs/sortIcon2";
import { useSearchParams } from "react-router-dom";
import { getTrackJobs } from "../apis/trackJobs";
import SortPage1 from "./sortPage1";
import SortPage2 from "./sortPage2";
import CircularProgress from "@mui/material/CircularProgress";

const TrackJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="p-8 bg-[#fafafa]">
      <h1 className="text-3xl font-bold">Track My Jobs</h1>
      <div>
        {/* ------------------header--------------------- */}
        <div className="mt-4 flex items-center gap-3">
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
