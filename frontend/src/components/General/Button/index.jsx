import React from "react";

const Button = ({ title, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-black shadow-md text-white px-2 py-2 lg:px-3 lg:py-1.5 lg:rounded-md rounded-full gap-2 flex items-center"
    >
      {icon}
      <span className="text-sm font-semibold hidden lg:flex">{title}</span>
    </button>
  );
};

export default Button;
