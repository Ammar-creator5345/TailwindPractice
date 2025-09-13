import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { MdDeleteForever } from "react-icons/md";
import CheckCircleIcon from "../svgs/successSvg";
import DeleteBinIcon from "../svgs/deleteIcon";

export const CustomAccordion = ({
  children,
  title,
  deleteFeature = false,
  handleDeleteAccordion,
}) => (
  <Accordion
    sx={{
      fontWeight: "600",
      boxShadow: "none",
      marginBottom: "10px",
      "&:before": {
        display: "none",
      },
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2-content"
      id="panel2-header"
      sx={{ border: "1px solid #e2e8f0", borderRadius: "10px" }}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1">
          <CheckCircleIcon />
          <span component="span">{title}*</span>
        </div>
        {deleteFeature && (
          <button type="button" onClick={() => handleDeleteAccordion()}>
            <DeleteBinIcon />
          </button>
        )}
      </div>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);
