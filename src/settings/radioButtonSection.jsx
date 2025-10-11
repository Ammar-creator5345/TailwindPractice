import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const RadioButton = ({
  array,
  title,
  firstSection = false,
  value,
  switchManager,
  setSwitchManager,
  keyName,
}) => {
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
      <div>
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
            },
          }}
          control={
            <IOSSwitch
              checked={value}
              onChange={() =>
                setSwitchManager((prev) => ({
                  ...prev,
                  [keyName]: !prev[keyName],
                }))
              }
              sx={{ m: 1 }}
            />
          }
          label={title}
        />
      </div>
      {firstSection && (
        <div className="ml-20">
          {array.map((value, index) => (
            <li key={index} className="text-[13px] mt-1 text-[#666666]">
              {value}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadioButton;
