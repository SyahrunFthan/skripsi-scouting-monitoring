import React from "react";
import { TitleComponents } from "../../General";
import { FaArrowLeft, FaSave, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const FormNewsComponents = ({
  title,
  formData,
  setFormData,
  errors,
  onSubmit,
  onSaveAndBack,
  isSaveAndBack,
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
                      Judul <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      className={`input input-bordered input-sm w-full bg-white ${
                        errors?.title && "input-error"
                      }`}
                      placeholder="Masukkan Judul"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                    {errors?.title && (
                      <p className="text-xs text-red-500">{errors?.title}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col mb-3">
                <div className="flex items-center gap-3 w-full flex-col">
                  <div className="gap-2 flex flex-col w-full">
                    <label className="font-semibold text-sm w-full">
                      Sub Judul <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      className={`input input-bordered input-sm w-full bg-white ${
                        errors?.subTitle && "input-error"
                      }`}
                      placeholder="Masukkan sub judul"
                      value={formData.subTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, subTitle: e.target.value })
                      }
                    />
                    {errors?.subTitle && (
                      <p className="text-xs text-red-500">{errors?.subTitle}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col mb-3">
                <div className="flex items-center gap-3 w-full flex-col">
                  <div className="gap-2 flex flex-col w-full">
                    <label className="font-semibold text-sm w-full">
                      Isi <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      className={`textarea textarea-bordered textarea-sm w-full bg-white ${
                        errors?.content && "textarea-error"
                      }`}
                      placeholder="Content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                    ></textarea>
                    {errors?.content && (
                      <p className="text-xs text-red-500">{errors?.content}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start flex-col lg:flex-row justify-between gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm">
                    Foto <span className="text-red-500">*</span>
                  </label>
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
                    Upload Foto Berita
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
                    to={"/admin/news"}
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

export default FormNewsComponents;
