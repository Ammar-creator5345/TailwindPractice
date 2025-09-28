import BookIcon from "../../svgs/bookIcon";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EyeIcon from "../../svgs/eyeIcon";
import { downloadPdf } from "../../apis/trackJobs";

const Resumes = ({ resume }) => {
  const handlePdfDownload = () => {
    const downloadPdfFile = async () => {
      try {
        const res = await downloadPdf(resume?.resume_id);
        const url = await window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.log(err);
      }
    };
    downloadPdfFile();
  };
  return (
    <div className="bg-[#fafafa] rounded-2xl min-h-[100px] p-3 pb-4">
      <div>
        <h1 className="text-sm font-semibold">Sent Resume</h1>
        <div className="flex items-center justify-between bg-white rounded-lg shadowColor2 py-2 px-3 mt-3">
          <div className="flex items-center gap-2">
            <BookIcon />
            <span className="text-sm">{resume?.resume_name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#fafafa] p-2 px-3 rounded-2xl">
              <EyeIcon />
            </button>
            <button
              onClick={handlePdfDownload}
              className="bg-[#1FFFA5] p-2 px-[10px] flex justify-center items-center rounded-2xl"
            >
              <FileDownloadOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumes;
