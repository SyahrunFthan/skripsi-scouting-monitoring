import React from "react";
import { TitleComponents } from "../../General";
import moment from "moment";
import { FaArrowLeft, FaSave, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreataActivitieComponents = ({
  title,
  formData,
  setFormData,
  errors,
  onSubmit,
  onSaveAndBack,
  isSaveAndBack,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <TitleComponents title={title} />

      <div className="flex flex-col p-4 bg-white my-3 shadow-md rounded-md">
        <form onSubmit={onSubmit}>
          <div className="flex items-start flex-col lg:flex-row w-full gap-4">
            <div className="flex flex-col w-full">
              <div className="w-full flex flex-col mb-3">
                <div className="flex items-center gap-3 w-full flex-col">
                  <div className="gap-2 flex flex-col w-full">
                    <label className="font-semibold text-sm w-full">
                      Nama Kegiatan <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      className={`input input-bordered input-sm w-full bg-white ${
                        errors?.name && "input-error"
                      }`}
                      placeholder="Ex: Bantara"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    {errors?.name && (
                      <p className="text-xs text-red-500">{errors?.name}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col mb-3">
                <div className="flex items-center gap-3 w-full flex-col">
                  <div className="gap-2 flex flex-col w-full">
                    <label className="font-semibold text-sm w-full">
                      Point Kegiatan <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="number"
                      className={`input input-bordered input-sm w-full bg-white ${
                        errors?.point && "input-error"
                      }`}
                      placeholder="Ex: 3"
                      value={formData.point}
                      onChange={(e) =>
                        setFormData({ ...formData, point: e.target.value })
                      }
                    />
                    {errors?.point && (
                      <p className="text-xs text-red-500">{errors?.point}</p>
                    )}
                  </div>
                  <div className="gap-2 flex flex-col w-full">
                    <label className="font-semibold text-sm w-full">
                      Skala Kegiatan <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={formData.scale}
                      onChange={(e) =>
                        setFormData({ ...formData, scale: e.target.value })
                      }
                      className={`select select-bordered select-sm py-0.5 bg-white w-full text-sm ${
                        errors.scale && "select-error"
                      }`}
                    >
                      <option value="">-- Pilih Skala --</option>
                      <option value="Sekolah">Sekolah</option>
                      <option value="Kota">Kota</option>
                      <option value="Provinsi">Provinsi</option>
                      <option value="Nasional">Nasional</option>
                    </select>
                    {errors?.scale && (
                      <p className="text-xs text-red-500">{errors?.scale}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="w-full lg:w-[80%] flex flex-col mb-3 lg:mt-6">
                <div className="flex items-center gap-3 w-full flex-col">
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
                    to={"/activities"}
                    className="bg-white w-full justify-center shadow-md text-black border-primary border  px-4 py-2 lg:px-3 lg:py-1.5 rounded-md gap-2 flex items-center"
                  >
                    <FaArrowLeft />
                    <span className="text-sm font-semibold">Kembali</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreataActivitieComponents;
