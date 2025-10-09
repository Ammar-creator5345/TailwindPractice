import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarDrawer from "../components/sideBarDrawer";
import SuccessIcon from "../../src/svgs/successSvg";
import WarningIcon from "../myProfile/warningIcon";
import {
  createSubscription,
  getCurrentSubscription,
  getSubscriptionInvoices,
} from "../apis/subscription";
import TailordResumeIcon from "../svgs/TailordResumeIcon";
import BookIcon from "../svgs/bookIcon";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import ShowAlert from "../components/showSuccessFullMsg";
import SubscriptionModal from "./subsriptionModal";

const ManageSubscription = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [invoices, setInvoices] = useState([]);
  const [currentSubs, setCurrentSubs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const InstructionLine = ({ title }) => (
    <div className="flex items-center gap-2">
      <SuccessIcon />
      <p className="text-sm text-[#666666]">{title}</p>
    </div>
  );
  const dateFormatter = (date) => {
    const total = new Date(date * 1000);
    return total.toLocaleDateString();
  };

  const PlanItem = ({
    title,
    trialTitle,
    price,
    buttonTitle,
    onclick,
    InstructionLine1,
    InstructionLine2,
    InstructionLine3,
    InstructionLine4,
    onTrialButton = false,
  }) => {
    return (
      <div className="bg-white border border-[#E2E8F0] p-[22px] rounded-lg shadowColor2 w-full md:w-1/2">
        <div className="flex items-end gap-3">
          <h1 className="text-[22px] font-[500]">{title}</h1>
          <span className="text-[12px] text-[#666666] flex items-end mb-1">
            <span>{trialTitle}</span>
          </span>
        </div>
        <div className="flex items-end gap-2 mt-1">
          <h1 className="text-[27px] font-[700]">{price}</h1>
          <span className="text-sm text-[#666666] flex items-end mb-1">
            <span>per Month</span>
          </span>
        </div>
        <button
          onClick={onclick}
          disabled={loading}
          className={`w-full mt-2 bg-gradient-to-l from-[#3BFFC6] to-[#3BFF9E] py-3 px-4 rounded-2xl flex items-center gap-2 justify-center font-semibold text-[15px] transition-all hover:py-[14px] ${
            loading ? "cursor-not-allowed" : ""
          }`}
        >
          {onTrialButton && loading && <CircularProgress size={20} />}
          {buttonTitle}
        </button>
        <div className="bg-[#FAFAFA] mt-4 p-3 rounded-lg">
          <div className="flex flex-col gap-[10px]">
            <InstructionLine title={InstructionLine1} />
            <InstructionLine title={InstructionLine2} />
            <InstructionLine title={InstructionLine3} />
            <InstructionLine title={InstructionLine4} />
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await getSubscriptionInvoices();
        console.log(res.data.data);
        setInvoices(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCurrentSubscription = async () => {
      try {
        const res = await getCurrentSubscription();
        console.log(res.data);
        setCurrentSubs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInvoices();
    fetchCurrentSubscription();
  }, []);

  const handleStartTrial = async () => {
    try {
      setLoading(true);
      const payload = {
        is_recurring: true,
        plan_id: currentSubs?.stripe_sub_data?.plan?.id,
        trial_days: 7,
      };
      const res = await createSubscription(payload);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
    console.log("clicked");
  };
  return (
    <>
      <SideBarDrawer
        open={openSideBar}
        setOpen={setOpenSideBar}
        setToken={setToken}
      />
      {showAlert && (
        <ShowAlert
          section={error}
          onClose={() => setShowAlert(false)}
          time={3000}
          isError={true}
        />
      )}
      <SubscriptionModal open={open} setOpen={setOpen} />

      <div>
        <div className="ml-1 mr-1 lg960:ml-8 lg960:mr-3">
          <div className="flex items-center gap-2 py-5">
            <button
              className="flex items-center justify-center lg960:hidden"
              onClick={() => setOpenSideBar(true)}
            >
              <MenuIcon />
            </button>
            <h1 className="text-[25px]  font-bold">Manage Your Subscription</h1>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-80px)] pb-2 p-1">
            <div className="bg-white shadowColor2 pt-[22px] px-[16px] pb-[30px] rounded-2xl lg960:px-[22px]">
              <h1 className="text-[22px] font-[500] ">Plans</h1>
              <p className="text-[12px] text-[#666666]">
                Upgrade your plan to unlock more features and boost your job
                search success.
              </p>
              <div className="flex flex-col gap-2 md:flex-row mt-5">
                <PlanItem
                  title="Explorer"
                  trialTitle="Free 7 Days Trial"
                  price="$0"
                  buttonTitle="Start Trial"
                  InstructionLine1="Unlock 10 jobs (10 credits)"
                  InstructionLine2="Regenerate cover letters (2 per job)"
                  InstructionLine3="Download 1 resume per job"
                  InstructionLine4="Job Alerts once per day"
                  onclick={() => handleStartTrial()}
                  onTrialButton={true}
                />
                <PlanItem
                  title="Ace"
                  trialTitle="Full Access"
                  price="$20"
                  buttonTitle="Upgrade To Ace"
                  InstructionLine1="Unlock unlimited jobs"
                  InstructionLine2="Job alerts with no limits"
                  InstructionLine3="Regenerate unlimited cover letters"
                  InstructionLine4="Regenerate unlimited resumes"
                  onclick={() => setOpen(true)}
                />
              </div>
              <hr className="my-5" />
              <div>
                <h1 className="text-[22px] font-[500]">Current Plan</h1>
                <span className="text-[12px] text-[#666666]">
                  You're on a free trial – limited access.
                </span>
                <div className="min-h-[100px] mt-4 p-3 rounded-lg bg-[#fafafa] flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <WarningIcon />
                    <p className="text-sm text-[#666666] font-[500]">
                      You haven't activated any plan yet. Start your free trial
                      to unlock premium features!
                    </p>
                  </div>
                </div>
                <hr className="my-5" />
                <div>
                  <h1 className="text-[22px] font-[500]">Billing & Invoices</h1>
                  <p className="text-[12px] text-[#666666]">
                    View your past payments and download invoices for your
                    records.
                  </p>
                  <div className="mt-7">
                    {invoices?.map((value, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-between border border-[#E2E8F0] bg-white rounded-lg p-3 shadowColor2 mt-2 md:flex-row"
                      >
                        <div className="flex items-center gap-2">
                          <BookIcon />
                          <div className="flex items-center gap-2 text-sm font-[500]">
                            <span>Invoice</span>
                            <span>{value?.number}</span>
                          </div>
                        </div>
                        <div className="flex bg-[#fafafa] rounded-xl p-2 px-3 flex-col items-center mt-8 gap-2 font-[500] text-sm text-[#666666] md:flex-row md:gap-10 md:mt-0 md:bg-transparent md:rounded-none md:p-0 md:px-0">
                          <div className="flex items-center gap-1">
                            <span>Start Date:</span>
                            <span>{dateFormatter(value?.period_start)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>End Date:</span>
                            <span>{dateFormatter(value?.period_end)}</span>
                          </div>
                        </div>
                        <div className="mt-6 md:mt-0">
                          <div>
                            <a
                              href={value?.pdf_url}
                              className="bg-[#1FFFA5] flex items-center justify-center py-2 px-3 rounded-2xl shadowColor2"
                            >
                              <FileDownloadOutlinedIcon />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSubscription;
