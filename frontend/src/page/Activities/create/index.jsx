import React, { useState } from "react";
import { CreataActivitieComponents, DefaultLayout } from "../../../components";
import { postActivitiesData, showSuccess } from "../../../utils";
import { useNavigate } from "react-router-dom";

const CreataActivities = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    point: "",
    scale: "",
  });

  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await postActivitiesData(formData);
      if (response?.status == 201) {
        setFormData({
          name: "",
          point: "",
          scale: "",
        });
        setErrors({});
        showSuccess("Created Success");
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        let errorMessages = {};
        const rowErrors = error?.response?.data?.error;
        rowErrors.forEach((item) => {
          let find = item?.path[0];
          errorMessages[find] = item?.message;
        });

        setErrors(errorMessages);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleSaveDataAndBack = async () => {
    try {
      setIsLoading(true);
      const response = await postActivitiesData(formData);
      if (response?.status == 201) {
        setFormData({
          name: "",
          point: "",
          scale: "",
        });
        showSuccess("Created Success", 1500, () => {
          navigate("/admin/activities");
        });
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        let errorMessages = {};
        const rowErrors = error?.response?.data?.error;
        rowErrors.forEach((item) => {
          let find = item?.path[0];
          errorMessages[find] = item?.message;
        });

        setErrors(errorMessages);
      } else {
        console.log(error);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <DefaultLayout isLoading={isLoading}>
      <CreataActivitieComponents
        title={"Tambah Kegiatan"}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onSubmit={handleSaveData}
        onSaveAndBack={handleSaveDataAndBack}
        isSaveAndBack={true}
      />
    </DefaultLayout>
  );
};

export default CreataActivities;
