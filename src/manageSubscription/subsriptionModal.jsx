import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import { useState } from "react";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    md: "650px",
  },
  height: {
    xs: "100%",
    md: "auto",
  },
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "18px",
  p: 3,
  overflowY: "auto",
};

const SubscriptionModal = ({ open, setOpen }) => {
  const steps = ["Plan Details", "Checkout", "Done"];
  const [currentState, setCurrentState] = useState(0);
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 12,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
      fontSize: "10px",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 1,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 1,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#eaeaf0",
      borderTopWidth: 1,
      borderRadius: 1,
    },
  }));
  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: "black",
    display: "flex",
    fontSize: "13px",
    width: 22,
    height: 22,
    padding: "12px",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E0E0E0",
    background: ownerState.active ? "#7CFCB4" : "transparent",
  }));

  function QontoStepIcon(props) {
    const { active, completed, className, icon } = props;
    return (
      <QontoStepIconRoot
        ownerState={{ active, completed }}
        className={className}
      >
        {icon}
      </QontoStepIconRoot>
    );
  }
  const nextStep = () => {
    if (currentState < steps.length - 1) {
      setCurrentState((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentState > 0) {
      setCurrentState((prev) => prev - 1);
    }
  };

  const stepController = {
    0: <FirstStep setCurrentState={setCurrentState} setOpen={setOpen} />,
    1: <SecondStep setCurrentState={setCurrentState} setOpen={setOpen} />,
    2: <ThirdStep />,
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setCurrentState(0);
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stepper
          alternativeLabel
          activeStep={currentState}
          connector={<QontoConnector />}
          sx={{ width: "100%" }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={QontoStepIcon}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "13px",
                    margin: "5px 0",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* <button onClick={nextStep} className="border p-2 rounded-md">
          next
        </button>
        <button onClick={prevStep} className="border p-2 rounded-md">
          Previos{" "}
        </button> */}
        <div>{stepController[currentState]}</div>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
