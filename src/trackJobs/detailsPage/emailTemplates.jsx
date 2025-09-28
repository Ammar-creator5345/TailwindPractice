import AddIcon from "@mui/icons-material/Add";
import { postEmailTemplates } from "../../apis/trackJobs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";

const EmailTemplates = ({ id }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 630,
    maxHeight: "85vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "16px",
    border: "none",
    p: "22px",
    overflowX: "hidden",
  };
  const buttons1 = [
    "Follow Up Application",
    "Request More Role Info",
    "Negotiation of Job Offer Terms",
    "Acceptance of Job offer",
    "Declining a Job offer",
  ];
  const buttons2 = [
    "Inquire About Job Networking",
    "Introduction to Recruiters or Hiring Managers",
    "Cold Email for Job Opportunity",
    "Request for Recommendation or Reference",
  ];

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [animate, setAnimate] = useState(false);
  const postEmailsTemplate = async (button) => {
    try {
      setLoading(true);
      const payLoadTab = {
        "Follow Up Application": "follow_up_application",
        "Request More Role Info": "request_more_role_info",
        "Negotiation of Job Offer Terms": "negotiation_job_offer_terms",
        "Acceptance of Job offer": "acceptance_job_offer",
        "Declining a Job offer": "declining_job_offer",
        "Inquire About Job Networking": "inquire_job_networking",
        "Introduction to Recruiters or Hiring Managers":
          "introduction_recruiters_hiring_managers",
        "Cold Email for Job Opportunity": "cold_email_job_opportunity",
        "Request for Recommendation or Reference":
          "request_recommendation_reference",
      };
      setOpen(true);
      const payLoad = {
        application: id,
        email_template_type: payLoadTab[button] || button,
        text: "generate professional email",
      };
      const res = await postEmailTemplates(payLoad);
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleCopyText = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(data?.text);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleRepeatPostEmail = () => {
    setAnimate(true);
    postEmailsTemplate(data?.email_template_type);
    setData({});
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setData({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="overflow-y-auto">
            <h1 className="text-[22px] font-[500] m-0">{data?.title}</h1>
            <span className="text-[12px] text-[#666666]">
              Easily craft a professional email for your job-related inquiry.
              Review and customize before sending.
            </span>
            <div className="bg-[#FAFAFA] p-4 min-h-[200px] rounded-2xl border border-[#E2E8F0] mt-3 flex justify-center items-center relative">
              <p className="whitespace-pre-line text-sm text-[#292929]">
                {data?.text}
              </p>
              {loading && (
                <div className="flex flex-col gap-2 items-center">
                  <CircularProgress />
                  <span className="text-sm font-[500] text-[#666666]">
                    Generating email template...
                  </span>
                </div>
              )}
              {!loading && (
                <div className="flex gap-4 pt-3 absolute bottom-4 right-4">
                  <Tooltip title="Regenerate" placement="top">
                    <button onClick={() => handleRepeatPostEmail()}>
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
                    <button onClick={handleCopyText}>
                      <ContentCopyIcon sx={{ fontSize: "20px" }} />
                    </button>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="mt-3 flex justify-center items-center gap-3">
              <button className="text-sm font-semibold flex justify-center items-center rounded-2xl px-4 py-3 bg-gradient-to-l from-[#3BFFC6] to-[#3BFF9E] transition-all duration-200 hover:py-[14px] hover:px-5">
                Send Email
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setData({});
                }}
                className="text-sm font-[500] border-2 border-transparent transition-all flex justify-center items-center rounded-2xl px-3 py-2 hover:border-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="bg-[#fafafa] rounded-2xl px-3 pb-4">
        <div className="flex gap-6">
          <div className="">
            {buttons1.map((button, index) => (
              <button
                key={index}
                onClick={() => postEmailsTemplate(button)}
                className="flex items-center gap-2 whitespace-nowrap mt-4"
              >
                <div className="bg-gradient-to-r from-[#3BFF9E] to-[#3BFFC6] rounded-[15px] py-[5px] px-[6px] shadowColor2">
                  <AddIcon />
                </div>
                <span className="text-sm font-[500]">{button}</span>
              </button>
            ))}
          </div>
          <div className="">
            {buttons2.map((button, index) => (
              <button
                key={index}
                onClick={() => postEmailsTemplate(button)}
                className="flex items-center gap-2 whitespace-nowrap mt-4"
              >
                <div className="bg-gradient-to-r from-[#3BFF9E] to-[#3BFFC6] rounded-[15px] py-[5px] px-[6px] shadowColor2">
                  <AddIcon />
                </div>
                <span className="text-sm font-[500]">{button}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplates;
