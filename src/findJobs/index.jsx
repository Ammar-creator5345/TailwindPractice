import { useEffect, useRef, useState } from "react";
import SearchIcon from "../svgs/searchIcon";
import MapIcon from "../svgs/mapIcon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FilterIcon from "../svgs/filterIcon";
import { useSearchParams } from "react-router-dom";
import SubmenuArrowIcon from "../svgs/arrowIcon";
import { Checkbox, ListItemText, Menu, MenuItem } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getRecentJobs,
  getRecommendedJobs,
  getSavedJobs,
  getTopMatchedJobs,
} from "../apis/findJobs";
import JobsItems from "./jobsItem";

const FindJobs = () => {
  const jobsButtons = ["Recommended", "Top Matched", "Most Recent", "Saved"];
  const buttonRef = useRef(null);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [workPreferenceAnchor, setWorkPreferenceAnchor] = useState(null);
  const [workModeAnchor, setWorkModeAnchor] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [onSave, setOnSave] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    title: "",
    workModes: [],
    workPreferences: [],
  });

  const open = Boolean(anchorEl);
  const workPreferenceOpen = Boolean(workPreferenceAnchor);
  const workModeOpen = Boolean(workModeAnchor);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");
  const tab = {
    recommended: 0,
    "top-matches": 1,
    "most-recent": 2,
    saved: 3,
  };
  const [buttonIndex, setButtonIndex] = useState(() => {
    if (tab[currentTab] !== undefined) {
      return tab[currentTab];
    } else {
      return 0;
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setWorkPreferenceAnchor(null);
    setWorkModeAnchor(null);
    setPage(1);
    setFilters({ workModes: workModes, workPreferences });
  };

  const handleWorkPreferenceClick = (event) => {
    event.stopPropagation();
    setWorkPreferenceAnchor(event.currentTarget);
  };

  const handleWorkModeClick = (event) => {
    event.stopPropagation();
    setWorkModeAnchor(event.currentTarget);
  };

  const [selectedWorkMode, setSelectedWorkMode] = useState({
    Remote: null,
    "On-site": null,
    Hybrid: null,
  });

  const [selectedWorkPreference, setSelectedWorkPreference] = useState({
    "Full-time": null,
    "Part-time": null,
    Freelance: null,
    Contract: null,
  });

  const activeFilters = [
    ...Object.keys(selectedWorkPreference).filter(
      (key) => selectedWorkPreference[key]
    ),
    ...Object.keys(selectedWorkMode).filter((key) => selectedWorkMode[key]),
  ];

  const toggleWorkMode = (key, value) => {
    setSelectedWorkMode((prev) => {
      const isRemoving = !!prev[key];
      let newValue = { ...prev, [key]: prev[key] ? null : value };
      if (isRemoving) {
        const workModes = Object.keys(newValue)
          .filter((f) => newValue[f])
          .join(",");
        setFilters({ workModes: workModes });
      }
      return newValue;
    });
  };

  const toggleWorkPreference = (key, value) => {
    setSelectedWorkPreference((prev) => {
      const isRemoving = !!prev[key];
      let newValue = { ...prev, [key]: prev[key] ? null : value };
      if (isRemoving) {
        let workPreferences = Object.keys(newValue)
          .filter((f) => newValue[f])
          .join(",");
        setFilters({ workPreferences: workPreferences });
      }
      return newValue;
    });
  };

  useEffect(() => {
    const checkScroll = () => {
      if (!buttonRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = buttonRef.current;
      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft + clientWidth < scrollWidth - 1);
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

  useEffect(() => {
    let isActive = true;
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let data;
        if (buttonIndex === 0)
          data = await getRecommendedJobs(
            page,
            4,
            filters.title,
            filters.location,
            filters.workModes,
            filters.workPreferences
          );
        if (buttonIndex === 1)
          data = await getTopMatchedJobs(
            page,
            4,
            filters.title,
            filters.location,
            filters.workModes,
            filters.workPreferences
          );
        if (buttonIndex === 2)
          data = await getRecentJobs(
            page,
            4,
            filters.title,
            filters.location,
            filters.workModes,
            filters.workPreferences
          );
        if (buttonIndex === 3)
          data = await getSavedJobs(
            page,
            4,
            filters.title,
            filters.location,
            filters.workModes,
            filters.workPreferences
          );
        if (!isActive) return;

        if (buttonIndex === 3) {
          setOnSave(true);
          setJobs(data);
          setTotalJobs(data.length);
        } else {
          setOnSave(false);
          setJobs(data.data.results);
          setTotalJobs(data.data.count);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    return () => {
      isActive = false;
    };
  }, [buttonIndex, page, filters]);

  useEffect(() => {
    setPage(1);
    setTitle("");
    setLocation("");
    setSelectedWorkMode({ Remote: null, "On-site": null, Hybrid: null });
    setSelectedWorkPreference({
      "Full-time": null,
      "Part-time": null,
      Freelance: null,
      Contract: null,
    });

    setFilters({
      title: "",
      location: "",
      workModes: [],
      workPreferences: [],
    });

    const objectKeys = Object.keys(tab);
    const activeTab = objectKeys[buttonIndex];
    setSearchParams({ tab: activeTab });
  }, [buttonIndex]);

  const scroll = (direction) => {
    if (buttonRef.current) {
      buttonRef.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };
  const handleSearch = () => {
    setPage(1);
    setFilters({ location: location, title: title });
  };

  let workPreferences = Object.keys(selectedWorkPreference)
    .filter((f) => selectedWorkPreference[f])
    .join(",");
  let workModes = Object.keys(selectedWorkMode)
    .filter((f) => selectedWorkMode[f])
    .join(",");

  return (
    <>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            borderRadius: "20px",
            marginTop: "5px",
          },
          "& .MuiList-root": {
            paddingTop: 0,
            paddingBottom: 0,
          },
          "& .MuiMenuItem-root": {
            padding: "13px 15px",
            fontSize: "15px",
            fontWeight: 500,
          },
        }}
      >
        {/* Work Preference Menu Item with Submenu */}
        <MenuItem
          onClick={handleWorkPreferenceClick}
          sx={{ borderBottom: "1px solid #eaeaea" }}
        >
          <div className="flex w-full items-center gap-2 justify-between">
            <span>Work Preference</span>
            <SubmenuArrowIcon />
          </div>
        </MenuItem>

        {/* Work Mode Menu Item with Submenu */}
        <MenuItem onClick={handleWorkModeClick}>
          <div className="flex w-full items-center gap-2 justify-between">
            <span>Work Mode</span>
            <SubmenuArrowIcon />
          </div>
        </MenuItem>
      </Menu>
      <Menu
        id="work-preference-submenu"
        anchorEl={workPreferenceAnchor}
        open={workPreferenceOpen}
        onClose={() => setWorkPreferenceAnchor(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiMenu-paper": {
            borderRadius: "20px",
            marginLeft: "5px",
          },
          "& .MuiList-root": {
            paddingTop: "0px",
            paddingBottom: "0px",
          },
          "& .MuiMenuItem-root": {
            padding: "6px 15px",
            fontSize: "15px",
            fontWeight: 500,
            borderBottom: "1px solid #eaeaea",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            toggleWorkPreference("Full-time", "fullTime");
          }}
        >
          <Checkbox
            size="small"
            checked={!!selectedWorkPreference["Full-time"]}
          />
          <ListItemText primary="Full-Time" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            toggleWorkPreference("Part-time", "partTime");
          }}
        >
          <Checkbox
            size="small"
            checked={!!selectedWorkPreference["Part-time"]}
          />
          <ListItemText primary="Part-Time" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            toggleWorkPreference("Freelance", "freelance");
          }}
        >
          <Checkbox size="small" checked={!!selectedWorkPreference.Freelance} />
          <ListItemText primary="Freelance" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            toggleWorkPreference("Contract", "contract");
          }}
        >
          <Checkbox size="small" checked={!!selectedWorkPreference.Contract} />
          <ListItemText primary="Contract" />
        </MenuItem>
      </Menu>
      <Menu
        id="work-mode-submenu"
        anchorEl={workModeAnchor}
        open={workModeOpen}
        onClose={() => setWorkModeAnchor(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiMenu-paper": {
            borderRadius: "20px",
            marginLeft: "5px",
          },
          "& .MuiList-root": {
            paddingTop: "0px",
            paddingBottom: "0px",
          },
          "& .MuiMenuItem-root": {
            padding: "6px 15px",
            fontSize: "15px",
            fontWeight: 500,
            borderBottom: "1px solid #eaeaea",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            toggleWorkMode("Remote", "remote");
          }}
        >
          <Checkbox size="small" checked={!!selectedWorkMode.Remote} />
          <ListItemText primary="Remote" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            toggleWorkMode("On-site", "onsite");
          }}
        >
          <Checkbox size="small" checked={!!selectedWorkMode["On-site"]} />
          <ListItemText primary="Onsite" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            toggleWorkMode("Hybrid", "hybrid");
          }}
        >
          <Checkbox size="small" checked={!!selectedWorkMode.Hybrid} />
          <ListItemText primary="Hybrid" />
        </MenuItem>
      </Menu>
      <div className="p-10 bg-[#FAFAFA]">
        <h1 className="text-3xl font-bold">Find Jobs</h1>
        <div>
          <div className="relative mt-4">
            {leftButton && (
              <button
                onClick={() => scroll("left")}
                type="button"
                className="p-2 px-3 rounded-2xl bg-white absolute top-[5px] left-0"
              >
                <ArrowBackIosNewIcon fontSize="30px" />
              </button>
            )}
            <div
              ref={buttonRef}
              className="flex gap-3 py-2 items-center overflow-x-auto overflow-y-visible no-scrollbar"
            >
              {jobsButtons.map((value, index) => (
                <button
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
                onClick={() => scroll("right")}
                type="button"
                className="p-2 px-3 rounded-2xl bg-white absolute top-[5px] right-0"
              >
                <ArrowForwardIosIcon fontSize="30px" />
              </button>
            )}
          </div>
          <div className="mt-6 p-2 rounded-3xl flex bg-white items-center gap-3 shadowColor2">
            <div className="w-1/2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Search by keyword, skill or interest"
                className="input-style2"
              />
            </div>
            <div className="w-1/2 flex gap-1 border-l pl-2 border-l-[#DDDDDD] justify-between">
              <div className="w-[95%] flex items-center">
                <MapIcon />
                <input
                  type="text"
                  className="input-style2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search by location"
                />
              </div>
              <div
                onClick={() => handleSearch()}
                className="bg-black p-2 px-3 rounded-[18px] flex justify-center items-center cursor-pointer transition-transform hover:scale-[1.04] hover:shadowColor2"
              >
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <div
              onClick={handleClick}
              className="bg-white p-2 rounded-2xl w-fit shadowColor2 cursor-pointer"
            >
              <FilterIcon />
            </div>
            {title && (
              <div className="bg-[#E2E8F0] px-2 py-[3px] w-fit rounded-lg flex items-center">
                <span className="text-[12px]">{title}</span>
                <div
                  onClick={() => setTitle("")}
                  className="cursor-pointer flex items-center"
                >
                  <ClearIcon sx={{ fontSize: "19px" }} />
                </div>
              </div>
            )}
            {location && (
              <div className="bg-[#E2E8F0] px-2 py-[3px] w-fit rounded-lg flex items-center">
                <span className="text-[12px]">{location}</span>
                <div
                  onClick={() => setLocation("")}
                  className="cursor-pointer flex items-center"
                >
                  <ClearIcon sx={{ fontSize: "19px" }} />
                </div>
              </div>
            )}
            {activeFilters.map((filter, index) => (
              <div
                key={index}
                className="bg-[#E2E8F0] px-2 py-[3px] w-fit rounded-lg flex items-center"
              >
                <span className="text-[12px]">{filter}</span>
                <div
                  onClick={() => {
                    if (selectedWorkPreference[filter] !== undefined) {
                      toggleWorkPreference(filter, filter);
                    } else if (selectedWorkMode[filter] !== undefined) {
                      toggleWorkMode(filter, filter);
                    }
                  }}
                  className="cursor-pointer flex items-center"
                >
                  <ClearIcon sx={{ fontSize: "19px" }} />
                </div>
              </div>
            ))}
          </div>
          <JobsItems
            loading={loading}
            setLoading={setLoading}
            setJobs={setJobs}
            jobs={jobs}
            totalJobs={totalJobs}
            page={page}
            setPage={setPage}
            onSave={onSave}
            buttonIndex={buttonIndex}
          />
        </div>
      </div>
    </>
  );
};

export default FindJobs;
