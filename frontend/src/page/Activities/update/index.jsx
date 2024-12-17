import React, { useEffect, useState } from "react";
import { CreataActivitieComponents, DefaultLayout } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import {
  patchActivitiesById,
  showSuccess,
  updateActivitiesData,
} from "../../../utils";

const EditActivities = () => {
  const navigate = useNavigate();
  const routes = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    point: "",
    scale: "",
  });

  const AmbilDataId = async () => {
    try {
      setIsLoading(true);
      const response = await patchActivitiesById(routes?.id);
      const resData = response?.data?.response;

      setFormData({
        name: resData?.name,
        point: String(resData?.points),
        scale: resData?.scale_activity,
      });
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await updateActivitiesData(routes?.id, formData);
      if (response?.status == 200) {
        showSuccess(response?.data?.message, 1500, () => {
          navigate("/activities");
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AmbilDataId();
  }, []);

  return (
    <DefaultLayout isLoading={isLoading}>
      <CreataActivitieComponents
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        title={"Edit Kegiatan"}
        isSaveAndBack={false}
        onSubmit={handleSaveData}
      />
    </DefaultLayout>
  );
};

export default EditActivities;
