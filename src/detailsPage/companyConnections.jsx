import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WarningIcon from "../myProfile/warningIcon";

const CompanyConnectionModal = ({ open, setOpen }) => {
  const style = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "white",
    boxShadow: 24,
    p: "10px 0 20px 0",
    borderRadius: "16px",
    outline: "none",
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <div className="px-5">
          <h1 className="text-2xl font-semibold">Find Company Connections</h1>
          <p className="text-[13px] text-[#414040] mt-2">
            Reach out to relevant professionals who may help with your
            application.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <WarningIcon />
            <span className="text-[14px] text-[#414040]">
              No company connections found for this job at the moment.
            </span>
          </div>
          <div className="flex justify-center items-center mt-2">
            <button
              className="rounded-2xl py-3 px-4 bg-[#7CFCA5] transition-all hover:py-[13px] hover:px-5"
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CompanyConnectionModal;
