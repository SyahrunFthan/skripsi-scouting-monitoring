import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDashboardComponents = ({ active, notActive }) => {
  // Jika kedua nilai adalah 0, chart tidak akan ditampilkan
  if (active === 0 && notActive === 0) {
    return (
      <div className="flex flex-col lg:w-[35%] w-full h-full border bg-white p-4 rounded-md shadow-md">
        <h2 className="text-center font-semibold">Grafik Keaktifan Sekolah</h2>
        <p className="text-center mt-6 text-gray-300">
          Tidak ada data untuk ditampilkan
        </p>
      </div>
    );
  }

  const data = {
    labels: ["Sekolah Aktif", "Sekolah Tidak Aktif"],
    datasets: [
      {
        label: "Grafik Keaktifan",
        data: [active, notActive],
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
    <div className="flex flex-col lg:w-[35%] w-full h-full border bg-white p-4 rounded-md shadow-md items-center">
      <h2 className="text-center font-semibold max-w-[50%]">
        Grafik Keaktifan Sekolah Kota Palu
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ChartDashboardComponents;
