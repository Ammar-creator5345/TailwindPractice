import AddIcon from "@mui/icons-material/Add";
import SuccessIcon from "../../svgs/successSvg";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  deleteReminder,
  getReminders,
  getReminderTypes,
  postReminder,
  postReminderType,
} from "../../apis/trackJobs";
import DeleteIcon from "../../svgs/deleteIcon";
import { MenuPaper } from "@mui/material/Menu";

const Reminder = ({ reminders, id, setReminders }) => {
  const [open, setOpen] = useState(false);
  const [reminderType, setReminderType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [description, setDescription] = useState("");
  const [newReminderIsOpen, setNewReminderIsOpen] = useState(false);
  const [reminderText, setReminderText] = useState("");
  const [reminderOptions, setReminderOptions] = useState([]);
  const isValid =
    reminderType && selectedDate && selectedTime && description.trim();
  const onCloseModal = () => {
    setOpen(false);
    setReminderType("");
    setSelectedTime(null);
    setSelectedDate(null);
    setDescription("");
  };

  const dateFormatter = (date) => new Date(date).toLocaleDateString("en-GB");
  const timeFormatter = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  const handleSaveReminder = () => {
    const postReminer = async () => {
      try {
        const payLoad = {
          application: id,
          description: description,
          due_date: selectedDate,
          type_id: reminderType,
        };
        const res = await postReminder(payLoad);
        onCloseModal();
        setReminders((prev) => [...prev, res.data]);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!isValid) return;
    postReminer();
  };

  const textField_style = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      backgroundColor: "#fafafa",
      fontSize: "14px",
      "& fieldset": {
        borderColor: "#c7cdd6",
      },
      "&:hover fieldset": {
        borderColor: "#e2e8f0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e2e8f0",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#686060",
    },
    "& .MuiInputLabel-root": {
      color: "#3d3838",
      fontSize: "14px",
    },
    "& .MuiFormHelperText-root": {
      color: "#e97979",
      margin: "10px 0 0 0",
    },
  };
  const style = {
    position: "absolute",
    bgcolor: "background.paper",
    width: "100%",
    height: "100%",
    boxShadow: 24,
    borderRadius: "16px",
    border: "none",
    p: "10px 22px 20px",
    "@media (min-width:770px)": {
      height: "auto",
      maxHeight: "85vh",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 470,
    },
  };

  const handleDeleteReminder = (reminderId) => {
    const delete_reminder = async () => {
      try {
        const res1 = await deleteReminder(reminderId);
        const res2 = await getReminders(id);
        setReminders(res2.data);
        console.log(res2);
      } catch (err) {
        console.log(err);
      }
    };
    delete_reminder();
  };

  const handleAddNewReminder = () => {
    setNewReminderIsOpen(true);
  };
  const postNewReminder = () => {
    const post_reminder = async () => {
      try {
        const res = await postReminderType({
          is_active: true,
          name: reminderText,
        });
        console.log(res.data);
        setReminderOptions((prev) => [...prev, res.data]);
        setNewReminderIsOpen(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (!reminderText) return;
    post_reminder();
  };
  const get_Reminder_Types = () => {
    const fetchReminderTypes = async () => {
      try {
        const res = await getReminderTypes();
        console.log(res.data);
        setReminderOptions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReminderTypes();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-[22px] font-[500] ">Set a Reminder</h1>
            <p className="text-[12px] text-[#666666]">
              Never miss an important follow-up or deadline. Set a reminder to
              stay on track!
            </p>
            <div className="mt-3">
              <TextField
                label="Select Reminder Type *"
                value={reminderType}
                onChange={(e) => setReminderType(e.target.value)}
                select
                slotProps={{
                  select: {
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          padding: 0,
                          maxHeight: "200px",
                        },
                      },
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  ...textField_style,
                }}
              >
                {!newReminderIsOpen &&
                  reminderOptions?.map((option) => (
                    <MenuItem
                      sx={{ fontSize: "14px" }}
                      key={option.id}
                      value={option?.id}
                    >
                      {option?.name}
                    </MenuItem>
                  ))}
                {newReminderIsOpen && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className="py-3 px-8 z-[3000] w-full h-full"
                  >
                    <input
                      type="text"
                      placeholder="Enter Reminder Type"
                      value={reminderText}
                      onChange={(e) =>
                        setReminderText(e.target.value.replaceAll(" ", ""))
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="border w-full p-3 rounded-xl bg-[#fafafa] outline-none"
                    />
                    <div className="mt-3 flex justify-end items-center gap-3">
                      <button
                        onClick={(e) => {
                          setNewReminderIsOpen(false);
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        className="text-sm font-[500] border-2 border-transparent transition-all flex justify-center items-center rounded-2xl px-3 py-3 hover:border-black"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          postNewReminder();
                        }}
                        className={`text-sm font-semibold flex justify-center items-center rounded-2xl px-4 py-[14px] bg-gradient-to-l from-[#3BFFC6] to-[#3BFF9E] transition-all duration-200 hover:py-[14px] hover:px-5`}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                {!newReminderIsOpen && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className="m-2 pb-4"
                  >
                    <button
                      onClick={() => handleAddNewReminder()}
                      className="flex items-center gap-2 whitespace-nowrap"
                    >
                      <div className="bg-gradient-to-r from-[#3BFF9E] to-[#3BFFC6] flex justify-center items-center rounded-3xl p-[6px] shadowColor2">
                        <AddIcon />
                      </div>
                      <span className="text-sm font-[500]">Add New</span>
                    </button>
                  </div>
                )}
              </TextField>
            </div>
            <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row">
              <div className="w-full  sm:w-1/2 ">
                <DatePicker
                  wrapperClassName="w-full"
                  className="bg-[#fafafa] w-full text-[#363535] text-sm border border-[#c7cdd6] p-2 py-3 rounded-xl focus::border-[#c7cdd6]"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  disabledKeyboardNavigation
                  placeholderText="Set Date"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="py-[11px] text-sm  w-full px-3 rounded-xl border border-[#c7cdd6] bg-[#fafafa] hover:border-[#c7cdd6] hover:bg-[#fafafa] focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-3">
              <textarea
                placeholder="Include any details you want to remember."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-3 min-h-[110px] bg-[#fafafa] max-h-[110px] rounded-xl text-[15px] border-[#c7cdd6] outline-none w-full resize-y focus:border-[#c7cdd6]"
              />
            </div>
            <div className="mt-3 flex flex-col justify-center items-center gap-3 md770:flex-row">
              <button
                onClick={handleSaveReminder}
                className={`text-sm font-semibold flex w-full justify-center items-center rounded-2xl px-4 py-[14px] bg-gradient-to-l from-[#3BFFC6] to-[#3BFF9E] transition-all duration-200 hover:py-[14px] hover:px-5 md770:w-fit ${
                  !isValid ? "cursor-not-allowed" : ""
                }`}
              >
                Save Reminder
              </button>
              <button
                onClick={onCloseModal}
                className="text-sm font-[500] border-2 w-full border-transparent transition-all flex justify-center items-center rounded-2xl px-3 py-2 hover:border-black md770:w-fit"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="bg-[#fafafa] p-4 rounded-2xl">
        <div>
          <button
            onClick={() => {
              get_Reminder_Types();
              setOpen(true);
            }}
            className="flex items-center gap-2 whitespace-nowrap mt-4"
          >
            <div className="bg-gradient-to-r from-[#3BFF9E] to-[#3BFFC6] rounded-[15px] py-[5px] px-[6px] shadowColor2">
              <AddIcon />
            </div>
            <span className="text-sm font-[500]">Set a Reminder</span>
          </button>
        </div>
        <div className="mt-4">
          {reminders?.map((value) => (
            <div
              key={value.id}
              className="p-3 border border-[#E2E8F0] shadowColor2 rounded-lg bg-white mt-3 flex gap-3"
            >
              <SuccessIcon
                color={!value?.is_completed ? "#E2E8F0" : "#1FFFA5"}
              />
              <div className="flex justify-between w-full">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-[500] text-[#292929]">
                      {value?.type?.name}
                    </h5>
                    <span className="text-[12px] text-[#666666]">
                      {dateFormatter(value?.created_at)}
                    </span>
                    <span className="text-[12px] text-[#666666]">
                      {timeFormatter(value?.created_at)}
                    </span>
                  </div>
                  <span className="text-sm text-[#666666]">
                    {value?.description}
                  </span>
                </div>
                {!value?.is_completed && (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteReminder(value?.id)}
                      className="bg-[#fafafa] p-2 rounded-xl flex justify-center items-center"
                    >
                      <DeleteIcon width={24} height={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reminder;
