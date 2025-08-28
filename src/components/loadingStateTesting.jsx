import { useEffect, useState } from "react";

const LoadingTesting = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData({ name: "Ammar", age: "19", employed: false });
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="bg-red-700">h</div>
      ) : (
        <h1 className="text-4xl font-semibold">{`my name is ${
          data.name
        } and i am ${data.age} years old and i am ${
          data.employed ? "employed" : "not employed"
        }`}</h1>
      )}
      {/* <div className="w-[100px] h-[100px] bg-green-950 rounded-full flex justify-center items-center m-10">
        <div className="w-[80px] h-[80px] bg-white   rounded-full">

        </div>
      </div> */}
    </div>
  );
};

export default LoadingTesting;
