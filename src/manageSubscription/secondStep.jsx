import { useState } from "react";

const SecondStep = ({ setOpen, setCurrentState }) => {
  const [holderName, setHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [date, setDate] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (holderName && cardNumber && cvc && date) {
            setCurrentState(2);
          }
        }}
      >
        <div className="my-6">
          <h1 className="text-[15px] font-bold">Card Details</h1>
          <p className="text-[12px] text-[#666666]">
            Enter your card details to proceed with the payment.
          </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Cardholder Name"
            className="input-style4"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            className="input-style4"
            required
            value={cardNumber}
            onChange={(e) => {
              let words = e.target.value;
              words = words.replace(/\D/g, "");
              words = words.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
              setCardNumber(words);
            }}
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            required
            value={date}
            onChange={(e) => {
              let date = e.target.value.replace(/[^0-9]/g, "");
              if (date.length > 2) {
                date = date.slice(0, 2) + "/" + date.slice(2, 4);
              }
              setDate(date);
            }}
            className="input-style4"
          />
          <input
            type="text"
            required
            value={cvc}
            onChange={(e) => {
              let word = e.target.value.replace(/[^0-9]/g, "");
              if (word.length > 4) {
                word = word.slice(0, 4);
              }
              setCvc(word);
            }}
            placeholder="CVC"
            className="input-style4"
          />
        </div>
        <div className="mt-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="submit"
            className={`mt-2 w-full bg-gradient-to-l from-[#3BFFC6] to-[#3BFF9E] py-3 px-4 rounded-2xl flex items-center gap-2 justify-center font-semibold text-[15px] transition-all hover:py-[14px] hover:px-5 sm:w-fit`}
          >
            Confirm & Subscribe
          </button>
          <button
            onClick={() => {
              setCurrentState(0);
              setOpen(false);
            }}
            className="px-3 w-full py-2 font-[500] rounded-2xl border-2 border-transparent transition-all hover:border-black sm:w-fit"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
