import React, { useEffect, useState } from "react";
import { DefaultLayout, FormSchoolComponents } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import {
  patchSchoolsById,
  showSuccess,
  updateSchoolsApi,
} from "../../../utils";

const EditSchools = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    noGudep: "",
    total: "",
    image: null,
  });

  const patchDataSchools = async () => {
    try {
      const response = await patchSchoolsById(params?.id);
      if (response.status === 200) {
        setFormData({
          name: response?.data?.response?.name,
          address: response?.data?.response?.address,
          noGudep: response?.data?.response?.number_gudep,
          total: response?.data?.response?.total_participant,
        });
        setSelectedImage(response?.data?.response?.path_image);
      }
    } catch (error) {
      console.log(error?.response);
    }
  };

  const updateDataSekolah = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", formData.image);
    formdata.append("name", formData.name);
    formdata.append("noGudep", formData.noGudep);
    formdata.append("total", formData.total);
    formdata.append("address", formData.address);

    try {
      setIsLoading(true);
      const response = await updateSchoolsApi(params?.id, formdata);
      if (response?.status == 200) {
        showSuccess(response?.data?.message, 1500, () => {
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

  useEffect(() => {
    patchDataSchools();
  }, []);

  return (
    <DefaultLayout isLoading={isLoading}>
      <FormSchoolComponents
        title={"Edit Data Sekolah"}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        isSaveAndBack={false}
        onSubmitData={updateDataSekolah}
      />
    </DefaultLayout>
  );
};

export default EditSchools;
