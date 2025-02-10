import React, { useEffect, useState } from "react";
import { DefaultLayout, FormNewsComponents } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNewsIdApi,
  patchNewsApi,
  showError,
  showSuccess,
} from "../../../utils";

const UpdateNews = () => {
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
  const { id } = useParams();

  const getDataNews = async () => {
    try {
      const response = await getNewsIdApi(id);
      const data = response?.data?.response;
      setFormData({
        title: data?.title,
        subTitle: data?.sub_title,
        content: data?.content,
        image: null,
      });
      setSelectedImage(data?.path_image);
    } catch (error) {
      showError("Server dalam masalah");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("title", formData?.title);
    formdata.append("subTitle", formData?.subTitle);
    formdata.append("content", formData?.content);
    formdata.append("image", formData?.image);

    try {
      setIsSubmit(true);
      const response = await patchNewsApi(id, formdata);
      if (response?.status == 200) {
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

  useEffect(() => {
    getDataNews();
  }, []);
  return (
    <DefaultLayout isLoading={isSubmit}>
      <FormNewsComponents
        title={"Edit Data"}
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

export default UpdateNews;
