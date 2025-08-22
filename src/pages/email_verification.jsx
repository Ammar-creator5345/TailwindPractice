import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate()
  const email = useLocation().state?.email
  const verifyCode = () => {
    axios
      .post(
        "https://api.ziphire.hr/v2/developer/verify_email2",
        {
            email:email,
            otp: code,
        },
        {
          headers: {
            "content-type": "application/json",
            accept: "application/json; version=1.0",
            "x-api-key":
              "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/home")
      })
      .catch((err) => {
        console.log("something Error", err);
      });
  };
  return (
    <div>
      <h1>Verify your Email</h1>
      <span>We have sent a verication code to {email} plz verify it</span>
      <div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-2 border-black m-3  rounded-md"
          type="numbers"
        />
      </div>
      <button
        className="border-2 border-black p-2 rounded-lg bg-slate-600 text-white mx-10"
        onClick={verifyCode}
      >
        verify code
      </button>
    </div>
  );
};

export default EmailVerification;
