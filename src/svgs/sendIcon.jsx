import React from "react";

const SendIcon = ({ size = 16, color = "white", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M9.84001 8.00001H4.55468C4.55468 7.81668 4.51668 7.63335 4.44134 7.46135L2.85668 3.87601C2.35001 2.72935 3.56201 1.58135 4.67934 2.14868L13.8667 6.81135C14.84 7.30468 14.84 8.69535 13.8667 9.18868L4.68001 13.8513C3.56201 14.4187 2.35001 13.27 2.85668 12.124L4.44001 8.53868C4.51484 8.36896 4.55344 8.1855 4.55334 8.00001"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SendIcon;
