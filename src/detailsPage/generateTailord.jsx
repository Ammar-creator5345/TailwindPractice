import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import { getResumes, postResume, postTailordResume } from "../apis/mainApi";
import CircularProgress from "@mui/material/CircularProgress";
import ResumeSideDrawer from "../components/ResumeSideDrawer";

const GenerateTailordModal = ({ open, setOpen, jobId }) => {
  const style = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "white",
    boxShadow: 24,
    p: "15px 0",
    borderRadius: "16px",
    outline: "none",
  };
  const style1 = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    bgcolor: "white",
    boxShadow: 24,
    p: "8px 0",
    borderRadius: "10px",
    outline: "none",
  };

  const [selected, setSelected] = useState("MyResume");
  const [selectedResume, setSelectedResume] = useState("");
  const [resumes, setResumes] = useState([]);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [socialLink, setSocialLink] = useState("");

  useEffect(() => {
    if (!open) return;
    const fetchResumes = async () => {
      try {
        const res = await getResumes();
        console.log(res.data.data);
        setResumes(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResumes();
  }, [open]);
  useEffect(() => {
    if (!file) return;
    const createResume = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("resume_type", "upload_resume");
        formData.append("file", file);
        const res = await postResume(formData);
        console.log(res);
        setSelectedResume(res?.data?.data?.id);
        const response = await getResumes();
        setResumes(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    createResume();
  }, [file]);
  const handleChange = (event) => {
    const file = event.target.files;
    if (file.length) {
      setFile(file[0]);
    }
  };

  const handleSubmitResume = async () => {
    const resume = resumes?.find((resume) => resume.id === selectedResume);
    if (!resume) return;
    setOpen(false);
    try {
      setUploadedResume(resume);
      setOpenModal(true);
      const dataForSubmit = { job_id: jobId, resume_id: resume.id };
      const res = await postTailordResume(dataForSubmit);
      console.log(res);
      setOpenDrawer(true);
      setOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setOpenModal(false);
    }
  };
  useEffect(() => {
    setSelectedResume("");
    setSocialLink("");
  }, [selected]);

  return (
    <>
      <ResumeSideDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        uploadedResume={uploadedResume}
      />
      <Modal open={openModal}>
        <Box sx={style1}>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-green-400 rounded-full animate-spin"></div>
            <p className="mt-3 font-[500] text-gray-700">
              Almost there... preparing your resume!
            </p>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedResume("");
        }}
      >
        <Box sx={style}>
          <div className="px-5">
            <h1 className="text-[22px] font-semibold">
              Choose a Resume to Tailor
            </h1>
            <p className="text-[13px] text-[#5a5959] font-[500] pr-4 mt-1">
              Choose from your existing resumes or import your LinkedIn profile
              URL to generate a tailored version for this job.
            </p>
          </div>

          <div className="flex items-center gap-6 mt-1 px-2">
            <label className="flex items-center cursor-pointer">
              <Radio
                checked={selected === "MyResume"}
                onChange={() => setSelected("MyResume")}
                sx={{
                  color: "#130B0F",
                  "&.Mui-checked": {
                    color: "#130B0F",
                  },
                }}
              />
              <span className="text-[15px]">My resumes</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <Radio
                checked={selected === "LinkedIn"}
                onChange={() => setSelected("LinkedIn")}
                sx={{
                  color: "#130B0F",
                  "&.Mui-checked": {
                    color: "#130B0F",
                  },
                }}
              />
              <span className="text-[15px]">Import From LinkedIn</span>
            </label>
          </div>

          <div className="mt-2 mx-5 text-[15px] font-bold">
            {selected === "MyResume" && (
              <div className="">
                <h1>Select Resume</h1>
                <div className="mt-3">
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "#5a5959",
                        fontSize: "15px",
                        "&.Mui-focused": {
                          color: "#130B0F",
                        },
                      }}
                      id="demo-simple-select-label"
                    >
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#fafafa",
                            height: "200px",
                            "& .MuiList-root": {
                              padding: "0",
                            },
                            "& .MuiMenuItem-root": {
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#333",
                              "&:hover": {
                                bgcolor: "#6ff5b0",
                                color: "black",
                              },
                            },
                          },
                        },
                      }}
                      id="demo-simple-select"
                      value={selectedResume}
                      label="Select"
                      onChange={(e) => setSelectedResume(e.target.value)}
                      sx={{
                        borderRadius: "18px",
                        backgroundColor: "#fafafa",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #E2E8F0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #E2E8F0",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #E2E8F0",
                        },
                      }}
                    >
                      {resumes?.map((resume) => (
                        <MenuItem value={resume.id}>
                          {resume.resume_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <label
                  htmlFor="file"
                  className="flex items-center gap-2 mt-3 cursor-pointer"
                >
                  <div className="bg-[#6ff5b0] px-[6px] py-[6px] rounded-2xl shadowColor2">
                    <AddIcon />
                  </div>
                  <span className="font-[500] text-[15px] text-[#272727]">
                    Upload New Resume
                  </span>
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  id="file"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                />
                {loading && (
                  <div className="w-full mt-3 rounded-lg p-2 border bg-[#fafafa] flex items-center justify-between">
                    <div className="text-[15px] flex items-center gap-3 font-[500]">
                      <span>{file.name}</span>
                      <span className="text-sm">
                        {file.type && `(${file.type})`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CircularProgress size={25} />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-4 justify-center">
                  <button
                    onClick={handleSubmitResume}
                    className="bg-[#6ff5b0] px-4 py-3 rounded-2xl font-[500] transition-all duration-200 hover:px-5 hover:py-[13px]"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setSelectedResume("");
                    }}
                    className="px-[13px] py-[9px] transition-all border-2 border-transparent rounded-2xl font-[500] hover:border-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {selected === "LinkedIn" && (
              <div className="mt-3">
                <h2 className="font-semibold mb-1">LinkedIn URL</h2>
                <input
                  type="url"
                  placeholder="Enter your LinkedIn profile URL"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  className="input-style bg-[#fafafa]"
                />
                <div className="flex items-center gap-3 mt-4 justify-center">
                  <button className="bg-[#6ff5b0] px-4 py-3 rounded-2xl font-[500] transition-all duration-200 hover:px-5 hover:py-[13px]">
                    Continue
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="px-[13px] py-[9px] transition-all border-2 border-transparent rounded-2xl font-[500] hover:border-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default GenerateTailordModal;
