import React, { useState } from "react";
import { DefaultLayout, FormSchoolComponents } from "../../../components";
import { postSchoolsApi, showSuccess } from "../../../utils";
import { useNavigate } from "react-router-dom";

const CreateSchools = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    noGudep: "",
    total: "",
    address: "",
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const createDataSekolah = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", formData.image);
    formdata.append("name", formData.name);
    formdata.append("noGudep", formData.noGudep);
    formdata.append("total", formData.total);
    formdata.append("address", formData.address);

    try {
      setIsLoading(true);
      const response = await postSchoolsApi(formdata);
      if (response?.status == 201) {
        showSuccess(response?.data?.message);
        setFormData({
          name: "",
          noGudep: "",
          total: "",
          address: "",
          image: null,
        });
        setErrors({});
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        const errorMessages = {};
        const dataErrors = error?.response?.data?.error;
        dataErrors.forEach((row) => {
          errorMessages[row.path[0]] = row.message;
        });

        setErrors(errorMessages);
      } else {
        console.log(error?.response);
      }
    } finally {
      setSelectedImage(null);
      setIsLoading(false);
    }
  };

  const saveAndBack = async () => {
    const formdata = new FormData();
    formdata.append("file", formData.image);
    formdata.append("name", formData.name);
    formdata.append("noGudep", formData.noGudep);
    formdata.append("total", formData.total);
    formdata.append("address", formData.address);

    try {
      setIsLoading(true);
      const response = await postSchoolsApi(formdata);
      if (response?.status == 201) {
        showSuccess(response?.data?.message, 1000, () => {
          navigate("/schools");
        });
        setFormData({
          name: "",
          noGudep: "",
          total: "",
          address: "",
          image: null,
        });
        setErrors({});
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        const errorMessages = {};
        const dataErrors = error?.response?.data?.error;
        dataErrors.forEach((row) => {
          errorMessages[row.path[0]] = row.message;
        });

        setErrors(errorMessages);
      } else {
        console.log(error?.response);
      }
    } finally {
      setSelectedImage(null);
      setIsLoading(false);
    }
  };
  return (
    <DefaultLayout isLoading={isLoading}>
      <FormSchoolComponents
        title={"Tambah Data Sekolah"}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isSaveAndBack={true}
        onSaveAndBack={saveAndBack}
        onSubmitData={createDataSekolah}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </DefaultLayout>
  );
};

export default CreateSchools;
