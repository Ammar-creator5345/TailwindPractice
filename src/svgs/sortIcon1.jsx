const SortIcon1 = ({ bgColor = "transparent" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M2.18506 11.5049H8.55171V17.8715H6.18506C3.97592 17.8715 2.18506 16.0807 2.18506 13.8715V11.5049Z"
      //   fill="#A38AF1"
      fill={bgColor}
      stroke="#0A0A0A"
      strokeWidth="1.2"
    />
    <path
      d="M11.6333 11.6333H17.9999V13.9999C17.9999 16.2091 16.2091 17.9999 13.9999 17.9999H11.6333V11.6333Z"
      fill={bgColor}
      stroke="#0A0A0A"
      strokeWidth="1.2"
    />
    <path
      d="M11.4485 2.12939H13.8151C16.0243 2.12939 17.8151 3.92026 17.8151 6.1294V8.49604H11.4485V2.12939Z"
      fill={bgColor}
      stroke="#0A0A0A"
      strokeWidth="1.2"
    />
    <path
      d="M2 6C2 3.79086 3.79086 2 6 2H8.36665V8.36665H2V6Z"
      fill={bgColor}
      stroke="#0A0A0A"
      strokeWidth="1.2"
    />
  </svg>
);

export default SortIcon1;
