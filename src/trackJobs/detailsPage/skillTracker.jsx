import WarningIcon from "../../myProfile/warningIcon";

const SkillTracker = ({ skills }) => {
  return (
    <div className="bg-[#fafafa] rounded-2xl p-3 py-4 min-h-[200px] flex items-center justify-center">
      {!(
        skills.missing_skills.length === 0 &&
        skills.total_job_skills.length === 0
      ) ? (
        <div>
          <div>
            <h1 className="text-[14px] font-semibold">All Skills</h1>
            <div className="flex items-center gap-2 flex-wrap mt-3">
              {skills?.total_job_skills.map((skill) => (
                <span className="bg-[#C3FFE7] font-[500] text-[12px] rounded-xl py-1 px-2 whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-[14px] font-semibold">Missing Skills</h1>
            <div className="flex items-center gap-2 flex-wrap mt-3">
              {skills?.missing_skills.map((skill) => (
                <span className="bg-[#E2E8F0] font-[500] text-[12px] rounded-xl py-1 px-2 whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 w-fit">
          <WarningIcon />
          <span className="text-sm font-[500] text-[#3f3e3e]">
            No Skills found for this job at the moment.
          </span>
        </div>
      )}
    </div>
  );
};

export default SkillTracker;
