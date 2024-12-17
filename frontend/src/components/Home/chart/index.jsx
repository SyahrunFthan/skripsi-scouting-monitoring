import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDashboardComponents = () => {
  const data = {
    labels: ["Sekolah Aktif", "Sekolah Tidak Aktif"],
    datasets: [
      {
        label: "Grafik Keaktifan",
        data: [70, 30],
        backgroundColor: ["rgb(63 131 248)", "rgb(240 82 82)"],
        borderColor: ["rgb(63 131 248)", "rgb(240 82 82)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="flex flex-col lg:w-[35%] w-full h-full border bg-white p-4 rounded-md shadow-md">
      <h2 className="text-center font-semibold">Grafik Keaktifan Sekolah</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ChartDashboardComponents;
