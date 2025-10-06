import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#6a6aeb] via-[#caa0b4] to-[#9bd466] text-gray-800">
      <div className="relative bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-[90%] max-w-md p-8 flex flex-col items-center text-center animate-fadeIn">
        <h1 className="text-[80px] md:text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6a6ace] to-[#a88ef5] leading-none">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Sorry, the page you’re looking for doesn’t exist. <br />
          Please return home.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="mt-6 bg-gradient-to-r from-[#6a6ace] to-[#111111] text-white font-semibold rounded-full px-6 py-3 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
        >
          Return Home
        </button>
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-white/10 to-transparent blur-2xl"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
