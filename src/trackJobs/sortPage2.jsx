import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import WarningIcon from "../myProfile/warningIcon";
import { useNavigate } from "react-router-dom";

const SortPage2 = ({ data }) => {
  const navigate = useNavigate();

  const wordFormatter = (word) => {
    return word
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const dateAppliedFormatter = (date) => {
    return Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <div className="trackJobsTable">
        <div className="overflow-x-auto tbScrollbar">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="min-w-[390px] xl:min-w-fit">Job Title</th>
                <th className="min-w-[200px] xl:min-w-fit">Location</th>
                <th className="min-w-[150px] xl:min-w-fit">Work Type</th>
                <th className="min-w-[150px] xl:min-w-fit">Status</th>
                <th className="min-w-[150px] xl:min-w-fit">Job Match</th>
                <th className="min-w-[200px] xl:min-w-fit">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((job) => (
                <tr
                  className="cursor-pointer"
                  onClick={() => navigate(`/track-my-jobs/${job?.id}`)}
                  key={job.id}
                >
                  <td className="min-w-[220px]">
                    <p className="text-[15px] font-[500]">
                      {job?.job_detail?.job_title}
                    </p>
                    <p className="text-[13px] text-[#4b4a4a]">
                      {job?.job_detail?.company_name}
                    </p>
                  </td>
                  <td className="min-w-[150px]">
                    <p className="text-[15px]">
                      {job?.job_detail?.city +
                        " " +
                        job?.job_detail?.country_name}
                    </p>
                  </td>
                  <td className="min-w-[150px]">
                    <div>
                      <p className="text-[15px] font-[500]">
                        {job?.job_detail?.selected_job_type}
                      </p>
                      <p className="text-[13px]">
                        {job?.job_detail?.selected_work_mode}
                      </p>
                    </div>
                  </td>
                  <td className="min-w-[150px]">
                    <span
                      className={`rounded-2xl px-2 py-[3px] text-sm ${
                        job?.status === "in_process"
                          ? "bg-[#B8ACF3]"
                          : job?.status === "interview_scheduled"
                          ? "bg-[#F0DE97]"
                          : job?.status === "offer_received"
                          ? "bg-[#F2BF4D]"
                          : "bg-[#EFA950]"
                      }`}
                    >
                      {wordFormatter(job?.status)}
                    </span>
                  </td>
                  <td className="min-w-[150px]">
                    <div className="w-11 h-11">
                      <CircularProgressbar
                        styles={buildStyles({
                          textSize: "28px",
                          textColor: "black",
                          trailColor: "transparent",
                          pathColor: "#A38AF1",
                        })}
                        value={job?.base_score}
                        text={`${job?.base_score}%`}
                      />
                    </div>
                  </td>
                  <td className="min-w-[180px]">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-[500]">{`${dateAppliedFormatter(
                        job?.applied_date
                      )} days ago`}</span>
                      <span className="text-[13px] text-[#414040]">{`Employer active ${dateAppliedFormatter(
                        job?.last_activity_date
                      )} days ago`}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!data.length && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <WarningIcon />
          <p className="text-sm text-[#615f5f] font-[500]">
            Nothing to show here.
          </p>
        </div>
      )}
    </div>
  );
};

export default SortPage2;
