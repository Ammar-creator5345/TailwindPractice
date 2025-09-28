import AddIcon from "@mui/icons-material/Add";
import SuccessIcon from "../../svgs/successSvg";

const Reminder = ({ reminders }) => {
  const dateFormatter = (date) => new Date(date).toLocaleDateString("en-GB");
  const timeFormatter = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  return (
    <div className="bg-[#fafafa] p-4 rounded-2xl">
      <div>
        <button className="flex items-center gap-2 whitespace-nowrap mt-4">
          <div className="bg-gradient-to-r from-[#3BFF9E] to-[#3BFFC6] rounded-[15px] py-[5px] px-[6px] shadowColor2">
            <AddIcon />
          </div>
          <span className="text-sm font-[500]">Set a Reminder</span>
        </button>
      </div>
      <div className="mt-4">
        {reminders?.map((value) => (
          <div
            key={value.id}
            className="p-3 border border-[#E2E8F0] shadowColor2 rounded-lg bg-white mt-3 flex gap-3"
          >
            <SuccessIcon />
            <div>
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-[500] text-[#292929]">
                  {value?.type?.name}
                </h5>
                <span className="text-[12px] text-[#666666]">
                  {dateFormatter(value?.created_at)}
                </span>
                <span className="text-[12px] text-[#666666]">
                  {timeFormatter(value?.created_at)}
                </span>
              </div>
              <span className="text-sm text-[#666666]">
                {value?.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminder;
