import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-[50px] font-bold  text-center">
        {" "}
        Abe bharwe sahi URl Daal na
      </h1>
      <h2 className="text-[30px] font-semibold text-center">
        Kiu time zaya kr raha hai galat URL daal k
      </h2>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/")}
          className="border border-red-600 bg-[#302b2b] text-white p-2 rounded-md"
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
