import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage({ setToken }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <div className="p-5 md:p-10 w-full min-h-screen bg-gradient-to-bl from-[#f59b9b] via-[#d4d4e6] to-[#e4e491]">
      <div className="flex flex-col md:flex-row gap-10 justify-between h-full">
        <div className="w-full md:w-[50%] md:ml-20 md:pl-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mt-5 md:mt-10">
            <img src="/bot.png" alt="somePic" className="w-10 h-10" />
            <h1 className="text-2xl font-semibold">GrowHire</h1>
          </div>

          <div className="mt-6 md:mt-10">
            <h1 className="text-2xl md:text-3xl font-bold leading-snug">
              Welcome to GrowHire Where Careers & Companies Connect!
            </h1>
            <p className="text-sm mt-3 md:text-base">
              Find your dream job or hire top talent—let's get started!
            </p>
          </div>

          <div className="mt-7">
            <h1 className="font-semibold mb-3 text-base md:text-lg">
              Choose Your Role
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                onClick={() => navigate("/login")}
                className="shadowColor2 rounded-2xl border mt-3 sm:mt-5 bg-white p-4 w-full sm:w-fit flex items-center justify-center flex-col gap-2 cursor-pointer transition-all hover:scale-[1.05]"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnuq5vURkDe5JVf172BbZctaVIqONWpXxJA&s"
                  alt="somePic"
                  className="rounded-full w-[80px] h-[80px] object-cover"
                />
                <p className="text-sm font-semibold">I'm a Candidate</p>
              </div>

              <div className="shadowColor2 opacity-[0.5] rounded-2xl border mt-3 sm:mt-5 bg-white p-4 w-full sm:w-fit flex items-center justify-center flex-col gap-2">
                <img
                  src="https://static.thenounproject.com/png/1050475-200.png"
                  alt="somePic"
                  className="rounded-full w-[80px] h-[80px] object-cover"
                />
                <p className="text-sm font-semibold">I'm a Employer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] rounded-3xl overflow-hidden mt-10 md:mt-0">
          <img
            src="https://app.ziphire.hr/auth_page_img.ac875e35c1bbbeb4.jpeg"
            alt="somePic"
            className="w-full h-[250px] md:h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
