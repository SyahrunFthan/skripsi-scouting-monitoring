import React, { useEffect, useState } from "react";
import { DefaultLayout, FormContributionComponents } from "../../../components";
import {
  patchSchoolAndActivitiesApi,
  postContributionApi,
  showSuccess,
} from "../../../utils";
import { useNavigate } from "react-router-dom";

const ContributionCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    school: "",
    activity: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [schools, setSchools] = useState([]);

  const createContribution = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await postContributionApi(formData);
      if (response?.status == 201) {
        showSuccess(response?.data?.message);
        setErrors({});
        setFormData({
          school: "",
          activity: "",
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

  const createContributionAndBack = async () => {
    try {
      setIsLoading(true);
      const response = await postContributionApi(formData);
      if (response?.status == 201) {
        showSuccess(response?.data?.message, 1000, () => {
          navigate("/contributions");
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
      />
    </DefaultLayout>
  );
};

export default ContributionCreate;
