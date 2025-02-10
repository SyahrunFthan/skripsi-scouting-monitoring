import React, { useEffect, useRef, useState } from "react";
import { DefaultLayout, FormContributionComponents } from "../../../components";
import {
  patchSchoolAndActivitiesApi,
  postContributionApi,
  showSuccess,
} from "../../../utils";
import { useNavigate } from "react-router-dom";

const ContributionCreate = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    school: "",
    activity: "",
    image1: null,
    image2: null,
    image3: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [schools, setSchools] = useState([]);

  const createContribution = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("school", formData.school);
    form.append("activity", formData.activity);
    form.append("image1", formData.image1);
    form.append("image2", formData.image2);
    form.append("image3", formData.image3);

    try {
      setIsLoading(true);
      const response = await postContributionApi(form);
      if (response?.status == 201) {
        showSuccess(response?.data?.message);
        setErrors({});
        setFormData({
          school: "",
          activity: "",
          image1: null,
          image2: null,
          image3: null,
        });
        fileInputRef.current.value = "";
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        let errorMessages = {};
        const errorData = error?.response?.data?.error;
        errorData.forEach((err) => {
          let find = err?.path[0];
          errorMessages[find] = err?.message;
        });
        setErrors(errorMessages);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createContributionAndBack = async () => {
    try {
      setIsLoading(true);
      const response = await postContributionApi(formData);
      if (response?.status == 201) {
        showSuccess(response?.data?.message, 1000, () => {
          navigate("/admin/contributions");
        });
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        let errorMessages = {};
        const errorData = error?.response?.data?.error;
        errorData.forEach((err) => {
          let find = err?.path[0];
          errorMessages[find] = err?.message;
        });
        setErrors(errorMessages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDataSchool = async () => {
    try {
      const response = await patchSchoolAndActivitiesApi();
      setSchools(response?.data?.schools);
      setActivities(response?.data?.activities);
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    getDataSchool();
  }, []);

  return (
    <DefaultLayout isLoading={isLoading}>
      <FormContributionComponents
        title={"Tambah Kontribusi"}
        formdata={formData}
        setFormdata={setFormData}
        errors={errors}
        isSaveAndBack={true}
        onSubmitData={createContribution}
        activities={activities}
        schools={schools}
        onSaveAndBack={createContributionAndBack}
        fileInputRef={fileInputRef}
      />
    </DefaultLayout>
  );
};

export default ContributionCreate;
