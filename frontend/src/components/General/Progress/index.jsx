import React from "react";

const ProgresComponents = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black/20 z-10 absolute w-screen">
      <div className="bg-white py-12 px-12 shadow-md rounded-md">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    </div>
  );
};

export default ProgresComponents;
