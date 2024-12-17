import React from "react";

const CardSchoolComponents = ({ title }) => {
  return (
    <div className="flex flex-col bg-white p-4 shadow-md rounded-md w-full h-auto">
      <h1 className="font-semibold text-lg">{title}</h1>

      <div className="mt-2 mb-1 flex items-center gap-2">
        <img
          src="./assets/images/scout.png"
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">
            SMA 3 Palu (01.179 - 01.180)
          </h1>
          <span className="font-semibold text-sm text-gray-400">
            Total Point: 20
          </span>
          <span className="font-semibold text-sm text-gray-400">
            Total Kegiatan: 20
          </span>
        </div>
      </div>
      <div className="mt-2 mb-1 flex items-center gap-2">
        <img
          src="./assets/images/scout.png"
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">
            SMA 3 Palu (01.179 - 01.180)
          </h1>
          <span className="font-semibold text-sm text-gray-400">
            Total Point: 20
          </span>
          <span className="font-semibold text-sm text-gray-400">
            Total Kegiatan: 20
          </span>
        </div>
      </div>
      <div className="mt-2 mb-1 flex items-center gap-2">
        <img
          src="./assets/images/scout.png"
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">
            SMA 3 Palu (01.179 - 01.180)
          </h1>
          <span className="font-semibold text-sm text-gray-400">
            Total Point: 20
          </span>
          <span className="font-semibold text-sm text-gray-400">
            Total Kegiatan: 20
          </span>
        </div>
      </div>
      <div className="mt-2 mb-1 flex items-center gap-2">
        <img
          src="./assets/images/scout.png"
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">
            SMA 3 Palu (01.179 - 01.180)
          </h1>
          <span className="font-semibold text-sm text-gray-400">
            Total Point: 20
          </span>
          <span className="font-semibold text-sm text-gray-400">
            Total Kegiatan: 20
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardSchoolComponents;
