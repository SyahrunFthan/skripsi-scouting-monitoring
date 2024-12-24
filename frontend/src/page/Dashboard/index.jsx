import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/General/Layouts";
import { DashboardComponents } from "../../components";
import { patchDataFromDashboardApi } from "../../utils";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [actives, setActives] = useState([]);
  const [inActives, setInActives] = useState([]);
  const [total, setTotal] = useState({
    school: 0,
    activity: 0,
    contribution: 0,
    schoolActive: 0,
    schoolNotActive: 0,
  });

  const patchDataDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await patchDataFromDashboardApi();
      setActives(response?.data?.activeSchools);
      setInActives(response?.data?.inactiveSchools);
      setTotal({
        school: response?.data?.totalSchool,
        activity: response?.data?.totalActivity,
        contribution: response?.data?.totalContribution,
        schoolActive: response?.data?.activeSchools?.length || 0,
        schoolNotActive: response?.data?.inactiveSchools?.length || 0,
      });
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    patchDataDashboard();
  }, []);

  return (
    <DefaultLayout isLoading={isLoading}>
      <DashboardComponents
        actives={actives}
        inActives={inActives}
        title={"Dashboard"}
        totalActive={total.schoolActive}
        totalNotActive={total.schoolNotActive}
        totaldata={total}
      />
    </DefaultLayout>
  );
};

export default Dashboard;
