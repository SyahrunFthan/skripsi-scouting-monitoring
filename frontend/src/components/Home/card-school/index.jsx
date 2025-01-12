import React from "react";

const CardSchoolComponents = ({ title, actives, inActives, isActives }) => {
  return (
    <div className="flex flex-col bg-white p-4 shadow-md rounded-md w-full h-auto">
      <h1 className="font-semibold text-lg">{title}</h1>

      {isActives ? (
        actives.length > 0 ? (
          actives.map((item, index) => {
            return (
              <div className="mt-2 mb-1 flex items-center gap-2" key={index}>
                <img
                  src={
                    item?.image !== null
                      ? item?.logo
                      : "./assets/images/scout.png"
                  }
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex flex-col">
                  <h1 className="font-semibold text-sm">{`${item?.name}`}</h1>

                  <span className="font-semibold text-sm text-gray-400">
                    Total Kegiatan: {item?.total_kegiatan}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col mt-4">
            <h1 className="text-gray-300 text-center">
              Tidak ada data untuk di tampilkan.
            </h1>
          </div>
        )
      ) : inActives.length > 0 ? (
        inActives.map((item, index) => {
          return (
            <div className="mt-2 mb-1 flex items-center gap-2" key={index}>
              <img
                src={
                  item?.image !== null
                    ? item?.logo
                    : "./assets/images/scout.png"
                }
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <h1 className="font-semibold text-sm">{`${item?.name}`}</h1>

                <span className="font-semibold text-sm text-gray-400">
                  Total Kegiatan: {item?.total_kegiatan}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col mt-4">
          <h1 className="text-gray-300 text-center">
            Tidak ada untuk di tampilkan
          </h1>
        </div>
      )}
    </div>
  );
};

export default CardSchoolComponents;
