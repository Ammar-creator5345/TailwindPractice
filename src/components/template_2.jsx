import { useState } from "react";

import Page1_temp_2 from "./page1_temp_2";
import Page2_temp_2 from "./page2_temp_2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
const Template_2 = () => {
  const [page, setPage] = useState(1);
  const showPage = {
    1: <Page1_temp_2 />,
    2: <Page2_temp_2 />,
  };
  return (
    <div className="mr-2 py-7 sticky top-0">
      {showPage[page]}
      <div className="flex items-center justify-center gap-10 sm:gap-12 md:gap-15 lg:gap-20">
        <button
          className="border p-1 m-2 rounded-full bg-[#f3f0f0] hover:bg-slate-50 "
          onClick={() => setPage(1)}
        >
          <NavigateBeforeIcon sx={{ color: "gray" }} />
        </button>
        <span className="text-[14px] text-[#463f3f] whitespace-nowrap">{`page ${page} of 2`}</span>
        <button
          className="border p-1 m-2 rounded-full bg-[#f3f0f0] hover:bg-slate-50 "
          onClick={() => setPage(2)}
        >
          <NavigateNextIcon sx={{ color: "gray" }} />{" "}
        </button>
      </div>
    </div>
  );
};

export default Template_2;
