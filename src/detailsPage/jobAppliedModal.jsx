import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getDetailsOfJob, postAppliedJob } from "../apis/findJobs";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const JobAppliedModal = ({ open, setOpen, jobId, setData }) => {
  const style = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    bgcolor: "white",
    boxShadow: 24,
    p: "20px",
    borderRadius: "16px",
    outline: "none",
  };

  const [loading, setLoading] = useState(false);

  const handleAppliedJob = async () => {
    setLoading(true);
    try {
      await postAppliedJob({ job: jobId });
      const res2 = await getDetailsOfJob(jobId);
      setData(res2.data);
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 right-0 left-0 bottom-0  flex items-center justify-center bg-black bg-opacity-40 z-[2000]">
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        </div>
      )}

      <Modal open={open} onClose={() => !loading && setOpen(false)}>
        <Box sx={style}>
          <div className="px-5 flex justify-center items-center">
            <div className="mt-2">
              <h1 className="text-[22px] font-semibold">
                Did You Apply for This Job?
              </h1>
              <p className="text-[15px] mt-1">
                Help Us Keep Your Job Tracking Accurate.
              </p>
              <div className="flex items-center gap-3 mt-4 justify-center">
                <button
                  onClick={handleAppliedJob}
                  className="bg-[#6ff5b0] px-4 py-3 rounded-2xl font-[500] transition-all duration-200 hover:px-5 hover:py-[13px]"
                >
                  Yes, I applied
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-[13px] py-[9px] transition-all border-2 border-transparent rounded-2xl font-[500] hover:border-black"
                >
                  No, I didn't apply
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default JobAppliedModal;
