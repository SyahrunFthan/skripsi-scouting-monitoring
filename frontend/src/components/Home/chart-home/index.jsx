import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ActivityChart = ({ calculate }) => {
  // Hitung persentase sisa kegiatan
  const inactivePercentage = 100 - calculate;

  // Data untuk grafik
  const data = {
    labels: ["Keaktifan", "Tidak Aktif"],
    datasets: [
      {
        label: "Persentase Kegiatan",
        data: [calculate, inactivePercentage], // Aktif dan tidak aktif
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)", // Warna untuk aktif
          "rgba(255, 99, 132, 0.7)", // Warna untuk tidak aktif
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Opsi grafik
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full lg:w-[50%]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ActivityChart;
