import Drawer from "@mui/material/Drawer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const AlertDrawer = () => {
  const [savedOpenDrawer, setSavedOpenDrawer] = useState(true);
  const toggleSavedOpenDrawer = (newOpen) => () => {
    setSavedOpenDrawer(newOpen);
  };
  setTimeout(() => {
    setSavedOpenDrawer(false);
  }, 5000);
  return (
    <Drawer
      anchor="right"
      open={savedOpenDrawer}
      onClose={toggleSavedOpenDrawer(false)}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "300px",
              sm: "350px",
              md: "400px",
            },
            height: "fit-content",
            maxHeight: "120px",
            top: 20,
            right: 10,
            borderRadius: "10px",
          },
        },
      }}
    >
      <div className="flex h-[110px] w-full gap-4 relative">
        <div className="w-[10px] h-full bg-green-500"></div>
        <div className="flex gap-2 mt-5">
          <div className="mt-2">
            <CheckCircleOutlineIcon
              sx={{
                background: "green",
                color: "white",
                borderRadius: "50px",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Error!</h1>
            <h3 className="text-[16px] ">Token Expired</h3>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleSavedOpenDrawer(false)}
          className="fixed top-8 right-10"
        >
          <CloseIcon />
        </button>
      </div>
    </Drawer>
  );
};

export default AlertDrawer;
