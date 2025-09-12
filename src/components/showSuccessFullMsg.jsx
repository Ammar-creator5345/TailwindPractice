import Drawer from "@mui/material/Drawer";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const ShowAlert = ({ section, onClose }) => {
  const [savedOpenDrawer, setSavedOpenDrawer] = useState(true);
  const [message, setMessage] = useState("");

  const toggleSavedOpenDrawer = (newOpen) => () => {
    setSavedOpenDrawer(newOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSavedOpenDrawer(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sectionMessage = {
      personalInfo: "Personal Info has been updated!",
      education: "Education has been updated!",
      projects: "Projects has been updated!", // Fixed typo
      certificates: "Certificates has been updated!", // Fixed typo
      works: "Work History has been updated!",
      publications: "Publications has been updated!",
      profilePhoto: "Profile Photo has been updated!",
      aboutMe: "About me has been updated!",
      skills: "Skills has been updated!",
      languages: "Languages has been updated!",
      hobbies: "Hobbies has been updated!",
    };
    setMessage(sectionMessage[section]);
  }, [section]);

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
            <h1 className="text-lg font-semibold">Successful!</h1>{" "}
            {/* Fixed spelling */}
            <h3 className="text-[16px]">{message}</h3>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleSavedOpenDrawer(false)}
          className="absolute top-4 right-4" // Changed from fixed to absolute
        >
          <CloseIcon />
        </button>
      </div>
    </Drawer>
  );
};

export default ShowAlert;
