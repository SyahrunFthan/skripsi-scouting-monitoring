import React from "react";
import { FaChalkboard, FaChartBar, FaTrophy, FaUsers } from "react-icons/fa";

const CardWidgetComponents = ({ totaldata }) => {
  return (
    <div className="flex flex-col items-start lg:flex-row md:flex-row md:items-center lg:items-center w-full gap-4 justify-start">
      <div className="flex items-center lg:items-start md:items-start lg:flex-col md:flex-col gap-3 md:gap-0 lg:gap-0 rounded-md bg-white shadow-md lg:p-3 md:p-3 w-full lg:w-[35%] md:w-[35%]">
        <div
          className={`flex flex-col lg:w-16 md:w-16 lg:h-16 md:h-16 w-20 h-20 justify-center items-center rounded-l-md lg:rounded-md md:rounded-md bg-indigo-500 text-white`}
        >
          <FaChalkboard />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-gray-400 text-sm font-semibold">
            Data Sekolah
          </span>
          <span className="text-black font-bold text-xl">
            {totaldata?.school}
          </span>
        </div>
      </div>
      <div className="flex items-center lg:items-start md:items-start lg:flex-col md:flex-col gap-3 md:gap-0 lg:gap-0 rounded-md bg-white shadow-md lg:p-3 md:p-3 w-full lg:w-[35%] md:w-[35%]">
        <div
          className={`flex flex-col lg:w-16 md:w-16 lg:h-16 md:h-16 w-20 h-20 justify-center items-center rounded-l-md lg:rounded-md md:rounded-md bg-blue-500 text-white`}
        >
          <FaChartBar />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-gray-400 text-sm font-semibold">
            Data Kegiatan
          </span>
          <span className="text-black font-bold text-xl">
            {totaldata?.activity}
          </span>
        </div>
      </div>
      <div className="flex items-center lg:items-start md:items-start lg:flex-col md:flex-col gap-3 md:gap-0 lg:gap-0 rounded-md bg-white shadow-md lg:p-3 md:p-3 w-full lg:w-[35%] md:w-[35%]">
        <div
          className={`flex flex-col lg:w-16 md:w-16 lg:h-16 md:h-16 w-20 h-20 justify-center items-center rounded-l-md lg:rounded-md md:rounded-md bg-red-500 text-white`}
        >
          <FaTrophy />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-gray-400 text-sm font-semibold">
            Data Kontribusi
          </span>
          <span className="text-black font-bold text-xl">
            {totaldata?.contribution}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardWidgetComponents;
