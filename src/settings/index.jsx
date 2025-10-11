import MenuIcon from "@mui/icons-material/Menu";
import SideBarDrawer from "../components/sideBarDrawer";
import { useEffect, useState } from "react";
import CustomAccordion from "./customAccordion";
import NotificationIcon from "../svgs/notificationIcon";
import GroceryIcon from "../svgs/groceryIcon";
import KeyIcon from "../svgs/keyIcon";
import DeleteIcon from "../svgs/deleteIcon";
import RadioButton from "./radioButtonSection";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Radio, { radioClasses } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getPreferences, putPreferences } from "../apis/subscription";

const Settings = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [checkedRadio, setCheckedRadio] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [switchManager, setSwitchManager] = useState({
    application_updates: false,
    enable_job_alerts: false,
    general_notifications: false,
    job_notifications: false,
    receive_alerts_via_email: false,
  });
  const [open, setOpen] = useState(false);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    RenewPassword: "",
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "new password must be atleast 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*.])[A-Za-z\d!@#$%&*.]+$/,
        "New password must contain letters, numbers, and special"
      )
      .required("New password is required"),
    RenewPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "password must match"),
  });
  const [showIcon, setShowIcon] = useState({
    currentPassword: false,
    newPassword: false,
    RenewPassword: false,
  });
  const toggleIcon = (value) => {
    setShowIcon((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };
  const FieldItem = ({
    name,
    placeholder,
    errors,
    touched,
    showIcon,
    toggleIcon,
  }) => (
    <div>
      <div className="w-[35%] bg-white overflow-hidden pr-3 flex items-center justify-between border-2 border-[#dbdada] rounded-2xl">
        <Field
          type={showIcon ? "text" : "password"}
          name={name}
          className="input-style3"
          placeholder={placeholder}
        />
        <button sx={{ cursor: "pointer" }} onClick={toggleIcon}>
          {showIcon ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>
      <p
        className={`transition-all m-0 duration-700 text-[12px] text-[#666666] ${
          touched[name] && errors[name] ? "opacity-100" : "opacity-0"
        }`}
      >
        {errors[name]}
      </p>
    </div>
  );
  const style = {
    position: "absolute",
    borderRadius: "18px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    padding: "8px 16px 16px",
  };
  useEffect(() => {
    if (!checkedRadio) return;
    setOpen(true);
  }, [checkedRadio]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await getPreferences();
        console.log(res.data);
        setIsLoaded(true);
        setSwitchManager(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPreferences();
  }, []);
  useEffect(() => {
    try {
      if (!isLoaded) return;
      putPreferences(switchManager);
    } catch (err) {
      console.log(err);
    }
  }, [switchManager]);
  return (
    <>
      <SideBarDrawer
        open={openSideBar}
        setOpen={setOpenSideBar}
        setToken={setToken}
      />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setCheckedRadio("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-2xl font-bold text-center">
            Are you sure you want to proceed with this action?
          </h1>
          <p className="text-sm text-[#666666] text-center mt-2">
            Your active jobs will be hidden, and you won't receive messages or
            alerts. You can reactivate anytime.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <button className="py-[10px] px-4 rounded-2xl text-[15px] font-[500] bg-gradient-to-l from-[#3BFFC6] to-[#3BFF9E]">
              Yes,Proceed
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setCheckedRadio("");
              }}
              className="py-2 px-3 rounded-2xl text-[15px] font-[500] border-2 border-transparent transition-all hover:border-black"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
      <div>
        <div className="mx-8">
          <div className="flex items-center gap-3 py-5">
            <button
              onClick={() => setOpenSideBar(true)}
              className="flex justify-center items-center lg960:hidden"
            >
              <MenuIcon />
            </button>
            <h1 className="text-[27px] font-bold">Settings</h1>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-81px)] p-1">
            <div className="bg-white shadowColor2 rounded-2xl p-4">
              <h1 className="text-[22px] font-[500]">Preferences</h1>
              <p className="text-[12px] text-[#666666]">
                Customize how you receive updates and job recommendations.
              </p>
              <div className="flex flex-col gap-2 mt-6">
                <CustomAccordion
                  title="Notifications"
                  icon={<NotificationIcon />}
                >
                  <div>
                    <RadioButton
                      firstSection={true}
                      title="Job Notifications"
                      array={[
                        "Receive job recommendations based on your profile",
                        "Get alerts when a saved job is about to expire",
                        "Notify me when a job I applied for is updated",
                      ]}
                      value={switchManager.job_notifications}
                      switchManager={switchManager}
                      setSwitchManager={setSwitchManager}
                      keyName="job_notifications"
                    />
                    <hr className="my-3" />
                    <RadioButton
                      firstSection={true}
                      title="Application Updates"
                      array={[
                        "Get notified when an employer views my application",
                        "Receive updates on application status (interview, offer, rejection)",
                      ]}
                      value={switchManager.application_updates}
                      switchManager={switchManager}
                      setSwitchManager={setSwitchManager}
                      keyName="application_updates"
                    />
                    <hr className="my-3" />
                    <RadioButton
                      firstSection={true}
                      title="General Notifications"
                      array={[
                        "Receive account-related notifications (security, settings)",
                        "Get reminders for scheduled interviews and assessments",
                      ]}
                      value={switchManager.general_notifications}
                      switchManager={switchManager}
                      setSwitchManager={setSwitchManager}
                      keyName="general_notifications"
                    />
                  </div>
                </CustomAccordion>
                <CustomAccordion title="Jobs Alert" icon={<GroceryIcon />}>
                  <div>
                    <RadioButton
                      title="Enable Job alerts"
                      value={switchManager.enable_job_alerts}
                      switchManager={switchManager}
                      setSwitchManager={setSwitchManager}
                      keyName="enable_job_alerts"
                    />
                    <hr className="my-2" />
                    <RadioButton
                      title="Receive alerts via email"
                      value={switchManager.receive_alerts_via_email}
                      switchManager={switchManager}
                      setSwitchManager={setSwitchManager}
                      keyName="receive_alerts_via_email"
                    />
                  </div>
                </CustomAccordion>
              </div>
              <hr className="my-5" />
              <h1 className="text-[22px] font-[500]">Account Settings</h1>
              <p className="text-[12px] text-[#666666]">
                Control your account security and personal data.
              </p>
              <div className="flex flex-col gap-2 mt-6">
                <CustomAccordion title="Change Password" icon={<KeyIcon />}>
                  <div>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                    >
                      {({ errors, touched, values }) => (
                        <Form className="flex flex-col gap-4 mt-3">
                          <FieldItem
                            name="currentPassword"
                            placeholder="Enter current password"
                            errors={errors}
                            touched={touched}
                            values={values}
                            showIcon={showIcon.currentPassword}
                            toggleIcon={() => toggleIcon("currentPassword")}
                          />
                          <FieldItem
                            name="newPassword"
                            placeholder="Enter new password"
                            errors={errors}
                            touched={touched}
                            values={values}
                            showIcon={showIcon.newPassword}
                            toggleIcon={() => toggleIcon("newPassword")}
                          />
                          <FieldItem
                            name="RenewPassword"
                            placeholder="Re-enter new password"
                            errors={errors}
                            touched={touched}
                            values={values}
                            showIcon={showIcon.RenewPassword}
                            toggleIcon={() => toggleIcon("RenewPassword")}
                          />
                          <hr className="my-1" />
                          <div>
                            <button
                              type="submit"
                              className="py-[10px] px-4 rounded-2xl bg-gradient-to-bl font-[500] to-[#3BFF9E] from-[#3BFFC6]"
                            >
                              Save Changes
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </CustomAccordion>
                <CustomAccordion
                  title="Deactivate Account"
                  icon={<DeleteIcon />}
                >
                  <FormControl>
                    <RadioGroup
                      value={checkedRadio}
                      onChange={(e) => setCheckedRadio(e.target.value)}
                      aria-labelledby="radioGroup"
                      name="radioGroup"
                    >
                      <div>
                        <FormControlLabel
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "14px",
                              fontWeight: "bold",
                            },
                          }}
                          value="deactivate"
                          control={
                            <Radio
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "black",
                                },
                              }}
                            />
                          }
                          label={
                            <span className="text-[14px] font-bold">
                              Deactivate Account
                            </span>
                          }
                        />
                        <ul>
                          <li className="ml-8 text-[12px] text-[#666666] list-disc">
                            Temporarily disable your account.
                          </li>
                        </ul>
                      </div>
                      <div>
                        <FormControlLabel
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "14px",
                              fontWeight: "bold",
                            },
                          }}
                          value="delete"
                          control={
                            <Radio
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "black",
                                },
                              }}
                            />
                          }
                          label={
                            <span className="text-[14px] font-bold">
                              Delete Account
                            </span>
                          }
                        />
                        <ul>
                          <li className="ml-8 text-[12px] text-[#666666] list-disc">
                            Permanently remove your account and all associated
                            data.
                          </li>
                        </ul>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </CustomAccordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
