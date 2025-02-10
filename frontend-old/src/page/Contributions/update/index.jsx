import React, { useEffect, useState } from "react";
import { DefaultLayout, FormContributionComponents } from "../../../components";
import {
  patchContributionById,
  patchSchoolAndActivitiesApi,
  showSuccess,
  updateContributionApi,
} from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";

const EditContribution = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    school: "",
    activity: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [schools, setSchools] = useState([]);

  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await updateContributionApi(params?.id, formData);
      if (response?.status == 200) {
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
      } else {
        console.log(error);
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

  const patchDataContributionId = async () => {
    try {
      const response = await patchContributionById(params?.id);
      if (response?.status == 200) {
        setFormData({
          school: response?.data?.response?.school_id,
          activity: response?.data?.response?.activity_id,
        });
      }
      console.log(response?.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    getDataSchool();
    patchDataContributionId();
  }, []);

  return (
    <DefaultLayout isLoading={isLoading}>
      <FormContributionComponents
        title={"Edit Kontribusi"}
        formdata={formData}
        setFormdata={setFormData}
        errors={errors}
        activities={activities}
        schools={schools}
        onSubmitData={handleSaveData}
      />
    </DefaultLayout>
  );
};

export default EditContribution;
