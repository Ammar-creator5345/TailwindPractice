import { useEffect, useState } from "react";
import axios from "axios";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ResumeSideDrawer from "../components/ResumeSideDrawer";
import { Navigate } from "react-router-dom";

const Resumes = () => {
  const [resumes, setResumes] = useState();
  const tokens = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [editedResumeName, setEditedResumeName] = useState("");
  const [editedResumeTitle, setEditedResumeTitle] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddResume, setOpenAddResume] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const handleOpenAddResume = () => setOpenAddResume(true);
  const handleCloseAddResume = () => setOpenAddResume(false);
  const handleDeleteOpenModal = () => setOpenDeleteModal(true);
  const handleDeleteCloseModal = () => setOpenDeleteModal(false);
  const handleDeleteResume = () => {
    axios
      .delete(
        `https://api.ziphire.hr/v2/developer/resumes/${selectedResume.id}`,
        {
          headers: {
            "x-api-key":
              "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
            accept: "application/json; version=1.0",
            authorization: `Token ${tokens}`,
          },
        }
      )
      .then(() => {
        handleDeleteCloseModal();
        resumeRequest().then((res) => {
          setResumes(res.data.data);
        });
      });
  };

  useEffect(() => {
    resumeRequest().then((res) => {
      // console.log(res.data.data);
      setResumes(res.data.data);
    });
  }, []);

  const resumeRequest = () => {
    return axios.get("https://api.ziphire.hr/v2/developer/resumes", {
      headers: {
        accept: "application/json; version=1.0",
        authorization: `Token ${tokens}`,
      },
    });
  };
  const handleOpenModal = () => {
    setEditedResumeName(selectedResume.resume_name);
    setEditedResumeTitle(selectedResume.target_job_title);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleEditResume = () => {
    axios
      .put(
        `https://api.ziphire.hr/v2/developer/resumes/${selectedResume.id}`,
        {
          resume_name: editedResumeName,
          target_job_title: editedResumeTitle,
        },
        {
          headers: {
            authorization: `Token ${tokens}`,
            accept: "application/json; version=1.0",
            "x-api-key":
              "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
          },
        }
      )
      .then(() => {
        handleCloseModal();
        resumeRequest().then((res) => {
          setResumes(res.data.data);
        });
      });
  };

  const handleClick = (event, resume) => {
    setAnchorEl(event.currentTarget);
    setSelectedResume(resume);
  };
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "90%",
      sm: "70%",
      md: "50%",
    },
    background: "#ffffff",
    border: "1px solid #997a73",
    borderRadius: "20px",
    boxShadow: "1px 1px 5px #997a7a",
    p: 4,
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const modified = (arg) => {
    return new Date(arg).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handlePrimaryResume = () => {
    axios
      .put(
        `https://api.ziphire.hr/v2/developer/resumes/${selectedResume.id}`,
        {
          is_primary: !selectedResume.is_primary,
        },
        {
          headers: {
            accept: "application/json; version=1.0",
            "x-api-key":
              "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
            authorization: `Token ${tokens}`,
          },
        }
      )
      .then(() => {
        resumeRequest().then((res) => {
          setResumes(res.data.data);
        });
      });
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [newResumeName, setNewResumeName] = useState("");
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [uploadResume, setUploadResume] = useState(true);
  const [buildResume, setBuildResume] = useState(null);
  const [importLinkedin, setImportLinkedin] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectedFile = () => {
    const file = document.getElementById("file")?.files[0];
    if (file) {
      setSelectedFile({
        name: file?.name,
        size: (file?.size / 1024).toFixed(2),
      });
    }
  };

  const handleUploadResume = () => {
    const file = document.getElementById("file")?.files[0];
    if (!file) return;
    const formattedFile = new FormData();
    formattedFile.append("file", file);
    formattedFile.append("resume_type", "upload_resume");
    setSubmitting(true);
    axios
      .post("https://api.ziphire.hr/v2/developer/resumes", formattedFile, {
        headers: {
          accept: "application/json; version=1.0",
          "x-api-key": "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundaryGBEBpQsrbziycFWj",
          authorization: `Token ${tokens}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setUploadedResume(res.data.data);
        setOpenDrawer(true);
        handleCloseAddResume();
        setSubmitting(false);
        resumeRequest().then((res) => setResumes(res.data.data));
        setOpenDrawer(true);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleAddNewResume = () => {
    setSubmitting(true);
    axios
      .post(
        "https://api.ziphire.hr/v2/developer/resumes",
        {
          resume_type: "build_resume",
          name: newResumeName,
          target_job_title: newResumeTitle,
        },
        {
          headers: {
            authorization: `Token ${tokens}`,
            "x-api-key":
              "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
            accept: "application/json; version=1.0",
          },
        }
      )
      .then((res) => {
        setSubmitting(false);
        setOpenDrawer(true);
        console.log(res.data.data);
        setUploadedResume(res.data.data);
        handleCloseAddResume();
        setNewResumeName("");
        setNewResumeTitle("");
        resumeRequest().then((res) => {
          setResumes(res.data.data);
        });
      });
  };
  return (
    <div>
      <ResumeSideDrawer
        uploadedResume={uploadedResume}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
      <h1 className="text-3xl font-bold my-6 mx-10">My Resumes</h1>
      <button
        onClick={handleOpenAddResume}
        className="flex items-center gap-2 mx-10"
      >
        <div className="bg-yellow-200 rounded-2xl p-3  ">
          <AiOutlinePlus />
        </div>
        <span className="font-semibold">Add Resume</span>
      </button>
      {resumes?.map((resume) => (
        <div
          className="m-5 p-4 rounded-md shadow-[0_1px_4px_#0000001a] border cursor-pointer sm:m-10"
          key={resume.id}
          onClick={() => {
            setUploadedResume(resume);
            setOpenDrawer(true);
          }}
        >
          <div className="flex justify-between items-center flex-col min-[470px]:flex-row">
            <div>
              <h1 className="text-xl font-bold md:text-2xl text-center min-[470px]:text-start">
                {resume.resume_name}
                {resume?.is_primary ? (
                  <span className="text-[12px] font-[500] bg-green-200 rounded-full px-2 py-1 ml-2 sm:text-sm sm:font-semibold">
                    Primary
                  </span>
                ) : null}
              </h1>
              <div className="flex items-center gap-1 my-2 md:my-3">
                <span className="font-semibold text-[15px] text-stone-600 md:text-[18px]">
                  Target Job:{" "}
                </span>
                <span className="text-[16px] md:text-[18px]">
                  {resume.target_job_title}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-col-reverse min-[590px]:flex-row max-[470px]:flex-row">
              <div onClick={(e) => e.stopPropagation()}>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e) => {
                    handleClick(e, resume);
                  }}
                  sx={{
                    border: "1px solid #e1d4d4 ",
                    borderRadius: "10px",
                    padding: {
                      xs: "7px",
                      sm: "10px",
                      md: "10px",
                    },
                    background: "#f7f0f0",
                  }}
                >
                  <div>
                    <TfiLayoutMenuSeparated size={20} color="black" />
                  </div>
                </Button>
                <div>
                  {/* this is edit button modal */}
                  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    slotProps={{
                      backdrop: {
                        sx: { background: "rgba(0,0,0,0.1)" },
                      },
                    }}
                  >
                    <Box sx={styleModal}>
                      <h1 className="text-xl font-bold sm:text-2xl">
                        Edit Resume Info
                      </h1>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Resume Name
                        </h3>
                        <input
                          type="text"
                          value={editedResumeName}
                          onChange={(e) => setEditedResumeName(e.target.value)}
                          className="border w-full bg-pink-50 rounded-xl p-2 focus:border-[#e3c7c7] outline-none"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 my-3">
                          Target Job Title
                        </h3>
                        <input
                          type="text"
                          value={editedResumeTitle}
                          onChange={(e) => setEditedResumeTitle(e.target.value)}
                          className="border w-full bg-pink-50 rounded-xl p-2 focus:border-[#e3c7c7] outline-none"
                        />
                      </div>
                      <div className="flex justify-center mt-6 gap-2">
                        <button
                          disabled={submitting}
                          onClick={handleEditResume}
                          className="border bg-green-300 p-3 rounded-lg font-[500] hover:bg-green-400 hover:border-green-700"
                        >
                          {submitting ? "updatting" : "Update"}
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="border p-3 rounded-lg font-[500] hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </Box>
                  </Modal>
                  {/* this is delete button modal */}
                  <Modal
                    open={openDeleteModal}
                    onClose={handleDeleteCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    slotProps={{
                      backdrop: {
                        sx: { background: "rgba(0,0,0,0.1)" },
                      },
                    }}
                  >
                    <Box sx={styleModal}>
                      <h3 className="text-[18px] font-semibold text-center sm:text-[23px]">
                        Are you sure you want to delete this resume?
                      </h3>
                      <div className="flex justify-center gap-4 mt-4">
                        <button
                          onClick={handleDeleteResume}
                          className="border bg-green-300 p-2 rounded-xl text-sm font-[500] hover:bg-green-400 hover:border-green-700 sm:p-3 sm:text-[18px] sm:rounded-2xl"
                        >
                          Yes,Proceed
                        </button>
                        <button
                          onClick={handleDeleteCloseModal}
                          className="border p-2 text-sm rounded-lg font-[500] hover:bg-gray-50 sm:p-2 sm:text-[18px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </Box>
                  </Modal>
                  {/* this is Add resume Modal */}
                  <Modal
                    open={openAddResume}
                    onClose={() => {
                      handleCloseAddResume();
                      setBuildResume(null);
                      setImportLinkedin(null);
                      setUploadResume(true);
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    slotProps={{
                      backdrop: {
                        sx: { background: "rgba(0,0,0,0.1)" },
                      },
                    }}
                  >
                    <Box sx={styleModal}>
                      <h3 className="text-2xl font-semibold">Add new Resume</h3>
                      <span className="text-sm">
                        Choose how you’d like to create your resume.
                      </span>
                      <div className="my-3">
                        <RadioGroup row defaultValue="Upload resume">
                          <FormControlLabel
                            value="Upload resume"
                            onClick={() => {
                              setUploadResume(true);
                              setBuildResume(null);
                              setImportLinkedin(null);
                            }}
                            control={
                              <Radio
                                sx={{
                                  color: "#2b2423",
                                  "&.Mui-checked": {
                                    color: "#2b2423",
                                  },
                                }}
                              />
                            }
                            label="Upload resume"
                          />
                          <FormControlLabel
                            value="Build your resume"
                            onClick={() => {
                              setBuildResume(true);
                              setImportLinkedin(null);
                              setUploadResume(null);
                            }}
                            control={
                              <Radio
                                sx={{
                                  color: "#2b2423",
                                  "&.Mui-checked": {
                                    color: "#2b2423",
                                  },
                                }}
                              />
                            }
                            label="Build your resume"
                          />{" "}
                          <FormControlLabel
                            value="Import From LinkedIn"
                            onClick={() => {
                              setImportLinkedin(true);
                              setBuildResume(null);
                              setUploadResume(null);
                            }}
                            control={
                              <Radio
                                sx={{
                                  color: "#2b2423",
                                  "&.Mui-checked": {
                                    color: "#2b2423",
                                  },
                                }}
                              />
                            }
                            label="Import From LinkedIn"
                          />
                        </RadioGroup>
                      </div>

                      {/* upload resume container */}

                      {uploadResume && (
                        <div>
                          <div
                            onClick={() =>
                              document.getElementById("file").click()
                            }
                            className="rounded-xl cursor-pointer  bg-[url('data:image/svg+xml,%3csvg%20width%3d%22100%25%22%20height%3d%22100%25%22%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%22100%25%22%20height%3d%22100%25%22%20fill%3d%27none%27%20rx%3d%2212%22%20ry%3d%2212%22%20stroke%3d%27%23333%27%20stroke-width%3d%273%27%20stroke-dasharray%3d%2710%2c%2014%27%20stroke-dashoffset%3d%2741%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')]"
                          >
                            <div className="mb-3 flex flex-col justify-center items-center p-4 gap-4">
                              <input
                                type="file"
                                id="file"
                                className="hidden"
                                onChange={handleSelectedFile}
                              />
                              {!selectedFile ? (
                                <>
                                  <span className="font-semibold">
                                    Upload or Drag & Drop Resume (PDF, DOCX)
                                  </span>
                                  <p>You can edit it later.</p>
                                </>
                              ) : (
                                <div>
                                  <div className="text-black text-md text-center mb-2 font-semibold">
                                    File Selected
                                  </div>
                                  <div className="text-sm text-gray-700 flex flex-col justify-center items-center">
                                    <span>{selectedFile?.name}</span>
                                    <span> - {selectedFile?.size} kbs</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={handleUploadResume}
                              disabled={submitting}
                              className="border bg-green-300 p-3 rounded-2xl font-[500] hover:bg-green-400 hover:border-green-700
                              disabled:opacity-[0.9] disabled:cursor-not-allowed disabled:hover:bg-green-300 disabled:border-none"
                            >
                              {submitting ? "submitting" : "Yes, Proceed"}
                            </button>
                            <button
                              onClick={handleCloseAddResume}
                              className="border p-3 rounded-lg font-[500] hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      {/* build your resume container */}

                      {buildResume && (
                        <div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-3">
                              Resume Name
                            </h3>
                            <input
                              type="text"
                              required
                              placeholder="Enter resume name"
                              value={newResumeName}
                              onChange={(e) => setNewResumeName(e.target.value)}
                              className="border w-full bg-pink-50 rounded-xl p-2 focus:border-[#e3c7c7] outline-none"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 my-3">
                              Target Job Title
                            </h3>
                            <input
                              type="text"
                              required
                              placeholder="e.g., Software Engineer"
                              value={newResumeTitle}
                              onChange={(e) =>
                                setNewResumeTitle(e.target.value)
                              }
                              className="border w-full bg-pink-50 rounded-xl p-2 focus:border-[#e3c7c7] outline-none"
                            />
                          </div>
                          <div className="flex justify-center mt-6 gap-2">
                            <button
                              onClick={handleAddNewResume}
                              className="border bg-green-300 p-3 rounded-lg font-[500] hover:bg-green-400 hover:border-green-700"
                            >
                              Update
                            </button>
                            <button
                              onClick={handleCloseAddResume}
                              className="border p-3 rounded-lg font-[500] hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* import from linkedin Container */}

                      {importLinkedin && (
                        <div className="mt-4">
                          <div>
                            <h3 className="font-semibold text-gray-800 my-3">
                              LinkedIn URL
                            </h3>
                            <input
                              type="text"
                              required
                              placeholder="Enter your LinkedIn profile URL"
                              // value={newResumeTitle}
                              // onChange={(e) =>
                              //   setNewResumeTitle(e.target.value)
                              // }
                              className="border w-full bg-pink-50 rounded-xl p-2 focus:border-[#e3c7c7] outline-none"
                            />
                          </div>
                          <div className="flex justify-center mt-6 gap-2">
                            <button
                              // onClick={handleResumeLinkDin}
                              className="border bg-green-300 p-3 rounded-lg font-[500] hover:bg-green-400 hover:border-green-700"
                            >
                              Continue
                            </button>
                            <button
                              onClick={handleCloseAddResume}
                              className="border p-3 rounded-lg font-[500] hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </Box>
                  </Modal>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                  PaperProps={{
                    sx: {
                      boxShadow: "0px 1px 10px #0000001a",
                      borderRadius: "15px",
                    },
                  }}
                >
                  {selectedResume?.is_primary ? (
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleOpenModal();
                      }}
                    >
                      <span className="text-sm">Edit Resume Info</span>
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem
                        sx={{ borderBottom: "1px solid #efe5e5" }}
                        onClick={() => {
                          handleClose();
                          handleOpenModal();
                        }}
                      >
                        <span className="text-sm">Edit Resume Info</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ borderBottom: "1px solid #efe5e5" }}
                        onClick={() => {
                          handleClose();
                          handleDeleteOpenModal();
                        }}
                      >
                        <span className="text-sm text-red-600">
                          Delete Resume
                        </span>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handlePrimaryResume();
                          handleClose();
                        }}
                      >
                        <span className="text-sm">Mark as primary</span>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </div>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="whitespace-nowrap border border-[#a4c579] p-2 text-xs rounded-lg bg-[#c6e999] font-[500] hover:bg-[#aad86f] md:text-sm"
              >
                Find Jobs
              </button>
            </div>
          </div>
          <div className="flex gap-1 mt-1 flex-wrap justify-center min-[420px]:justify-start">
            <div className="flex items-center gap-1">
              <span className="text-[12px] md:text-sm whitespace-nowrap">
                Created
              </span>
              <span className="text-[12px] md:text-sm whitespace-nowrap">
                {modified(resume.created_at)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[12px] md:text-sm  whitespace-nowrap">
                Modified
              </span>
              <span className="text-[12px] md:text-sm whitespace-nowrap">
                {modified(resume.updated_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resumes;
