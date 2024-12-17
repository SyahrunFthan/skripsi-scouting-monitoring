import React, { useState } from "react";
import { TitleComponents } from "../../General";
import { FaArrowLeft, FaSave, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const FormSchoolComponents = ({
  title,
  formData,
  setFormData,
  onSubmitData,
  errors,
  isSaveAndBack,
  onSaveAndBack,
  selectedImage,
  setSelectedImage,
}) => {
  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const filePath = URL.createObjectURL(file);
      setSelectedImage(filePath);
    }

    setFormData({ ...formData, image: file });
  };

  return (
    <div className="flex flex-col w-full">
      <TitleComponents title={title} />

      <div className="flex flex-col bg-white p-4 w-full my-3 rounded-md shadow-md">
        <form onSubmit={onSubmitData}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center flex-col lg:flex-row justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-sm">
                  Nama Sekolah <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: SMAN 3 Palu"
                  className={`input input-sm input-bordered w-full bg-white ${
                    errors?.name && "input-error"
                  }`}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                {errors?.name && (
                  <p className="text-xs text-red-500">{errors?.name}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-sm">
                  No. Gudep <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: 01.123 - 01.124"
                  className={`input input-sm input-bordered w-full bg-white ${
                    errors?.noGudep && "input-error"
                  }`}
                  value={formData.noGudep}
                  onChange={(e) =>
                    setFormData({ ...formData, noGudep: e.target.value })
                  }
                />

                {errors?.noGudep && (
                  <p className="text-xs text-red-500">{errors?.noGudep}</p>
                )}
              </div>
            </div>
            <div className="flex items-start flex-col justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-sm">
                  Total Anggota <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Ex: 30"
                  className={`input input-sm input-bordered w-full bg-white ${
                    errors?.total && "input-error"
                  }`}
                  value={formData.total}
                  onChange={(e) =>
                    setFormData({ ...formData, total: e.target.value })
                  }
                />

                {errors?.total && (
                  <p className="text-xs text-red-500">{errors?.total}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-sm">
                  Alamat Sekolah <span className="text-red-500">*</span>
                </label>

                <textarea
                  placeholder="Ex: Jl. Example"
                  className={`textarea textarea-sm textarea-bordered bg-white ${
                    errors?.address && "textarea-error"
                  }`}
                  value={formData?.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                ></textarea>

                {errors?.address && (
                  <p className="text-xs text-red-500">{errors?.address}</p>
                )}
              </div>
            </div>
            <div className="flex items-start flex-col lg:flex-row justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-sm">Foto</label>
                <img
                  src={
                    selectedImage
                      ? selectedImage
                      : "/assets/images/add-image.png"
                  }
                  className={`w-full object-contain border-2 h-40 rounded-md p-4 ${
                    selectedImage && "bg-black"
                  }`}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-sm">
                  Upload Foto Sekolah
                </label>

                <input
                  type="file"
                  placeholder="Ex: 30"
                  className={`file-input file-input-sm file-input-bordered w-full bg-white ${
                    errors?.image && "file-input-error"
                  }`}
                  onChange={handleChangeImage}
                />

                {errors?.image && (
                  <p className="text-xs text-red-500">{errors?.image}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full flex-col lg:flex-row lg:justify-end">
              <button
                type="submit"
                className="bg-black shadow-md w-full lg:w-[25%] justify-center text-white px-4 py-2 lg:px-3 lg:py-1.5 rounded-md gap-2 flex items-center"
              >
                <FaSave />
                <span className="text-sm font-semibold">Simpan Data</span>
              </button>
              {isSaveAndBack && (
                <button
                  type="button"
                  onClick={onSaveAndBack}
                  className="bg-white shadow-md w-full lg:w-[25%] justify-center text-black border-primary border px-4 py-2 lg:px-3 lg:py-1.5 rounded-md gap-2 flex items-center"
                >
                  <FaShare />
                  <span className="text-sm font-semibold">
                    Simpan & Kembali
                  </span>
                </button>
              )}
              <Link
                to={"/schools"}
                className="bg-white w-full lg:w-[25%] justify-center shadow-md text-black border-primary border  px-4 py-2 lg:px-3 lg:py-1.5 rounded-md gap-2 flex items-center"
              >
                <FaArrowLeft />
                <span className="text-sm font-semibold">Kembali</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSchoolComponents;
