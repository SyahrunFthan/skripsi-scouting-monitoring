import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const EmptyData = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[50%] flex-col justify-center items-center">
        <DotLottieReact src="/assets/animation/not-found.lottie" autoplay />
        <h1 className="text-gray-400 font-semibold text-2xl text-center">
          {text}
        </h1>
      </div>
    </div>
  );
};

export default EmptyData;
