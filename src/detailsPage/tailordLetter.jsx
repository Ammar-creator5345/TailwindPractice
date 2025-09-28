import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import WarningIcon from "../myProfile/warningIcon";
import { useEffect, useState } from "react";
import { postCoverLetter } from "../apis/mainApi";
import { IoMdClose } from "react-icons/io";

const TailordLetterModal = ({ open, setOpen, jobId, data }) => {
  const style = {
    position: "absolute",
    width: {
      xs: "100%",
    },
    height: {
      xs: "100%",
    },
    bgcolor: "white",
    boxShadow: 24,
    p: "10px 0 20px 0",
    borderRadius: "16px",
    outline: "none",
    "@media (min-width:770px)": {
      width: "620px",
      height: "auto",
      maxHeight: "90vh",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [animate, setAnimate] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const createCoverLetter = async () => {
    try {
      setAnimate(true);
      const res = await postCoverLetter({ job_id: jobId });
      setCoverLetter(res.data.cover_letter);
      console.log(res);
      setAnimate(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCopy = async () => {
    setIsCopied(true);
    if (!coverLetter) return;
    await navigator.clipboard.writeText(coverLetter);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  useEffect(() => {
    if (!open || !data?.is_unlocked) return;
    const fetchCoverLetter = async () => {
      try {
        setAnimate(true);
        const res = await postCoverLetter({ job_id: jobId });
        setCoverLetter(res.data.cover_letter);
        console.log(res);
        setAnimate(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCoverLetter();
  }, [open]);

  return (
    <Modal
      open={open && data?.is_unlocked}
      onClose={() => {
        setOpen(false);
        setCoverLetter("");
      }}
    >
      <Box sx={style}>
        <div className="px-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              Your Tailored Cover Letter for This Job
            </h1>
            <button className="md770:hidden" onClick={() => setOpen(false)}>
              <IoMdClose size={25} />
            </button>
          </div>
          <p className="text-[13px] text-[#414040] mt-2">
            Based on your profile and this job description, here's a draft you
            can use. Feel free to edit before applying!
          </p>
          <div
            className="whitespace-pre-line border rounded-2xl px-4 py-3 mt-3 text-[#302f2f] bg-[#fafafa] font-[400] 
             min-h-[80px] max-h-[60vh] overflow-y-auto"
          >
            {coverLetter ? (
              coverLetter
            ) : (
              <p>Loading your tailored cover letter...</p>
            )}
            <div className="flex justify-end gap-2 pt-3">
              <Tooltip title="Regenerate" placement="top">
                <button onClick={createCoverLetter}>
                  <LoopRoundedIcon
                    className={`${animate ? "some" : ""}`}
                    sx={{ fontSize: "22px" }}
                  />
                </button>
              </Tooltip>
              <Tooltip
                title={`${isCopied ? "Copied" : "Copy to clipboard"}`}
                placement="top"
              >
                <button onClick={handleCopy}>
                  <ContentCopyIcon sx={{ fontSize: "20px" }} />
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <WarningIcon />
            <span className="text-[12px] text-[#414040]">
              For the best results, complete your profile before generating.
            </span>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default TailordLetterModal;
