import React from "react";
import DefaultLayout from "../../components/General/Layouts";
import { DashboardComponents } from "../../components";

const Dashboard = () => {
  return (
    <DefaultLayout>
      <DashboardComponents title={"Dashboard"} />
    </DefaultLayout>
  );
};

export default Dashboard;
