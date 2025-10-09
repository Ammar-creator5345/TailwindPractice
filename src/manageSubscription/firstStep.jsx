import SuccessIcon from "../../src/svgs/successSvg";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const FirstStep = ({ setCurrentState, setOpen }) => {
  const InstructionLine = ({ title }) => (
    <div className="flex items-center gap-2">
      <SuccessIcon />
      <p className="text-[15px] font-[500] text-[#666666]">{title}</p>
    </div>
  );
  const [currentButton, setCurrentButton] = useState(0);
  const buttons = ["Monthly", "Yearly"];

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 50,
    height: 30,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "100ms",
      "&.Mui-checked": {
        transform: "translateX(20px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#7CFCAA",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 26,
      height: 26,
    },
    "& .MuiSwitch-track": {
      borderRadius: "16px",
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 100,
      }),
    },
  }));

  return (
    <div>
      <div className="my-3 mt-5">
        <h1 className="text-[15px] font-[600]">Upgrade Plan</h1>
        <p className="text-[12px] text-[#666666]">
          Upgrade your plan to unlock more features .
        </p>
      </div>
      <div className="bg-white border border-[#E2E8F0] p-[22px] rounded-lg shadowColor2 w-full">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="">
            <div className="flex items-end gap-3">
              <h1 className="text-[22px] font-[500]">ACE</h1>
              <span className="text-[12px] text-[#666666] flex items-end mb-1">
                <span>Full Access</span>
              </span>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <h1 className="text-[27px] font-[700]">
                {currentButton === 0 ? "$20" : "$50"}
              </h1>
              <span className="text-sm text-[#666666] flex items-end mb-1">
                <span>{currentButton === 0 ? "Per Month" : "Per Year"}</span>
              </span>
            </div>
          </div>
          <div className="m-auto mt-3 sm:m-0">
            <div className="bg-[#fafafa] w-fit p-2 py-2 rounded-2xl border flex items-center gap-3 sm:py-3">
              {buttons.map((button, index) => (
                <button
                  onClick={() => setCurrentButton(index)}
                  className={`px-4 py-3 border-2 rounded-[18px] shadowColor2 text-sm font-[500] ${
                    currentButton === index
                      ? "bg-[#7CFCA6] border-[black]"
                      : "bg-white border-transparent"
                  }`}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] mt-4 p-3 rounded-lg">
          <div className="flex flex-wrap gap-3 justify-between">
            <div className="flex flex-col gap-[12px]">
              <InstructionLine title="Unlock unlimited jobs" />
              <InstructionLine title="Job alerts with no limits" />
              <InstructionLine title="Regenerate unlimited resumes" />
            </div>
            <div className="flex flex-col gap-3">
              <InstructionLine title="Unlock unlimited insider connections" />
              <InstructionLine title="Regenerate unlimited cover letters" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
            },
          }}
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label={
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Renew plan automatically every{" "}
              {currentButton === 0 ? "month" : "year"}.
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", color: "gray", marginTop: "2px" }}
              >
                (You can cancel auto-renewal anytime)
              </Typography>
            </Box>
          }
        />
      </div>
      <div className="mt-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={() => setCurrentState(1)}
          className={`mt-2 w-full bg-gradient-to-l from-[#3BFFC6] to-[#3BFF9E] py-3 px-4 rounded-2xl flex items-center gap-2 justify-center font-semibold text-[15px] transition-all hover:py-[14px] hover:px-5 sm:w-fit`}
        >
          Continue to Payment
        </button>
        <button
          onClick={() => {
            setCurrentState(0);
            setOpen(false);
          }}
          className="px-3 w-full py-2 font-[500] rounded-2xl border-2 border-transparent transition-all hover:border-black sm:w-fit"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FirstStep;
