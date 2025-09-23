import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WarningIcon from "../myProfile/warningIcon";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { postCoverLetter } from "../apis/mainApi";

const TailordLetterModal = ({ open, setOpen, jobId }) => {
  const style = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    bgcolor: "white",
    boxShadow: 24,
    p: "10px 0 20px 0",
    borderRadius: "16px",
    outline: "none",
  };
  const [animate, setAnimate] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const createCoverLetter = async () => {
    try {
      setAnimate(true);
      const res = await postCoverLetter({ job_id: jobId });
      setCoverLetter(res.data.cover_letter);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <div className="px-5">
          <h1 className="text-2xl font-semibold">
            Your Tailored Cover Letter for This Job
          </h1>
          <p className="text-[13px] text-[#414040] mt-2">
            Based on your profile and this job description, here's a draft you
            can use. Feel free to edit before applying!
          </p>
          <div className="border rounded-2xl px-4 py-3 mt-3 text-[#302f2f] relative min-h-[80px] bg-[#fafafa] font-[500]">
            <p>
              {coverLetter
                ? coverLetter
                : "Loading your tailored cover letter..."}
            </p>
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Tooltip title="Regenerate" placement="top">
                <button
                  onClick={createCoverLetter}
                  className={`${animate ? "some" : ""}`}
                >
                  <LoopRoundedIcon sx={{ fontSize: "22px" }} />
                </button>
              </Tooltip>
              <Tooltip title="Copy to clipboard" placement="top">
                <button>
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
