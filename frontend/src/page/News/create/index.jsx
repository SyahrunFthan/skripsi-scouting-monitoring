import React, { useState } from "react";
import { DefaultLayout, FormNewsComponents } from "../../../components";
import { postNewsApi, showError, showSuccess } from "../../../utils";
import { useNavigate } from "react-router-dom";

const NewsCreate = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    content: "",
    image: null,
  });
  const [errors, setErros] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("title", formData?.title);
    formdata.append("subTitle", formData?.subTitle);
    formdata.append("content", formData?.content);
    formdata.append("image", formData?.image);

    try {
      setIsSubmit(true);
      const response = await postNewsApi(formdata);
      if (response?.status == 201) {
        showSuccess(response?.data?.message, 1500, () => {
          navigate("/admin/news");
        });
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        const errorMessages = {};
        const errorData = error?.response?.data?.error;
        errorData.forEach((err) => {
          let find = err?.path[0];
          errorMessages[find] = err?.message;
        });
        setErros(errorMessages);
      } else {
        console.log(error);

        showError("Server sedang bermasalah!");
      }
    } finally {
      setTimeout(() => {
        setIsSubmit(false);
      }, 200);
    }
  };

  return (
    <DefaultLayout isLoading={isSubmit}>
      <FormNewsComponents
        title={"Tambah Data"}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
        isSaveAndBack={false}
        onSubmit={handleSubmit}
      />
    </DefaultLayout>
  );
};

export default NewsCreate;
