import React from "react";
import { TitleComponents } from "../../General";
import { FaArrowLeft, FaSave, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const FormContributionComponents = ({
  title,
  formdata,
  setFormdata,
  errors,
  onSubmitData,
  isSaveAndBack,
  onSaveAndBack,
  activities,
  schools,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <TitleComponents title={title} />

      <div className="flex flex-col bg-white p-4 my-3 shadow-md rounded-md w-full">
        <form onSubmit={onSubmitData}>
          <div className="flex items-start justify-start lg:gap-4 w-full lg:w-[70%] flex-col lg:flex-row">
            <div className="flex flex-col w-full">
              <div className="flex flex-col mb-3 gap-2">
                <label className="font-semibold text-sm">
                  Nama Sekolah <span className="text-red-500">*</span>
                </label>
                <select
                  value={formdata?.school}
                  onChange={(e) =>
                    setFormdata({ ...formdata, school: e.target.value })
                  }
                  className={`select select-bordered select-md bg-white ${
                    errors?.school && "select-error"
                  }`}
                >
                  <option value="">-- Pilih Sekolah --</option>
                  {schools?.map((school, index) => (
                    <option value={school?.id_school} key={index}>
                      {school?.name}
                    </option>
                  ))}
                </select>
                {errors?.school && (
                  <p className="text-red-500">{errors?.school}</p>
                )}
              </div>
              <div className="flex flex-col mb-3 gap-2">
                <label className="font-semibold text-sm">
                  Nama Kegiatan <span className="text-red-500">*</span>
                </label>
                <select
                  value={formdata?.activity}
                  onChange={(e) =>
                    setFormdata({ ...formdata, activity: e.target.value })
                  }
                  className={`select select-bordered select-md bg-white ${
                    errors?.activity && "select-error"
                  }`}
                >
                  <option value="">-- Pilih Kegiatan --</option>
                  {activities?.map((activity, index) => (
                    <option value={activity?.id_activity} key={index}>
                      {activity?.name}
                    </option>
                  ))}
                </select>
                {errors?.activity && (
                  <p className="text-red-500">{errors?.activity}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[70%]">
              <div className="flex items-center gap-3 w-full flex-col mt-6">
                <button
                  type="submit"
                  className="bg-black shadow-md w-full justify-center text-white px-4 py-2 lg:px-3 lg:py-1.5 rounded-md gap-2 flex items-center"
                >
                  <FaSave />
                  <span className="text-sm font-semibold">Simpan Data</span>
                </button>
                {isSaveAndBack && (
                  <button
                    type="button"
                    onClick={onSaveAndBack}
                    className="bg-white shadow-md w-full justify-center text-black border-primary border px-4 py-2 lg:px-3 lg:py-1.5 rounded-md gap-2 flex items-center"
                  >
                    <FaShare />
                    <span className="text-sm font-semibold">
                      Simpan & Kembali
                    </span>
                  </button>
                )}
                <Link
                  to={"/contributions"}
                  className="bg-white w-full justify-center shadow-md text-black border-primary border  px-4 py-2 lg:px-3 lg:py-1.5 rounded-md gap-2 flex items-center"
                >
                  <FaArrowLeft />
                  <span className="text-sm font-semibold">Kembali</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContributionComponents;
