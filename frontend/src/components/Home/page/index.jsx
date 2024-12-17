import React from "react";
import CardWidgetComponents from "../card-widget";
import ChartDashboardComponents from "../chart";
import CardSchoolComponents from "../card-school";
import { TitleComponents } from "../../General";

const DashboardComponents = ({ title }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar w-full">
      <TitleComponents title={title} />

      {/* Content */}
      <div className="flex flex-col order-2 lg:order-1 w-full lg:h-full lg:overflow-y-auto no-scrollbar scroll-smooth my-3">
        <CardWidgetComponents />

        <div className="flex flex-col lg:flex-row my-5 justify-between gap-3 max-h-full items-start">
          <ChartDashboardComponents />
          <CardSchoolComponents title={"List Sekolah Aktif"} />
          <CardSchoolComponents title={"List Sekolah Tidak Aktif"} />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponents;
