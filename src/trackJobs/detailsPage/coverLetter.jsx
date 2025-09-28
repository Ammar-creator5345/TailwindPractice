import BookIcon from "../../svgs/bookIcon";
import EyeIcon from "../../svgs/eyeIcon";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import WarningIcon from "../../myProfile/warningIcon";

const CoverLetter = ({ coverLetters }) => {
  const DownloadCoverLetter = (letter) => {
    const url = window.URL.createObjectURL(
      new Blob([letter?.text], { type: "text/plain" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "coverLetter.txt";
    link.click();
    document.body.appendChild(link);
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#fafafa] rounded-2xl min-h-[100px] p-3 pb-4 flex justify-center items-center">
      {coverLetters.length === 0 ? (
        <div className="flex items-center justify-center gap-2 w-fit">
          <WarningIcon />
          <span className="text-sm font-[500] text-[#3f3e3e]">
            No Cover Letters found for this job at the moment.
          </span>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-sm font-semibold">Sent Cover Letter</h1>
          {coverLetters?.map((letter) => (
            <div className="flex items-center justify-between bg-white rounded-lg shadowColor2 py-2 px-3 mt-3">
              <div className="flex items-center gap-2">
                <BookIcon />
                <span className="text-sm">{letter?.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-[#fafafa] p-2 px-3 rounded-2xl">
                  <EyeIcon />
                </button>
                <button
                  onClick={() => DownloadCoverLetter(letter)}
                  className="bg-[#1FFFA5] p-2 px-[10px] flex justify-center items-center rounded-2xl"
                >
                  <FileDownloadOutlinedIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoverLetter;
