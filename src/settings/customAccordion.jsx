import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "../svgs/successSvg";

const CustomAccordion = ({ children, title, icon }) => {
  return (
    <Accordion
      sx={{
        boxShadow: "none",
        border: "none",
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
            {icon}
            <span className="font-[500] text-[15px]">{title}</span>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
