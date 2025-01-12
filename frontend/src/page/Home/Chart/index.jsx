import { useEffect, useState } from "react";
import { BgChartImg } from "../../../assets";
import BarChart from "../../../components/Landing/BarChart/BarChart";
import Navbar from "../../../components/Landing/Navbar/Navbar";
import { patchSchoolHomeApi } from "../../../utils/server";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  const AmbilData = async () => {
    try {
      const response = await patchSchoolHomeApi();
      const dataRes = response?.data?.response;

      const labels = dataRes.map((item) => item?.name);
      const dataValues = dataRes.map((item) => item?.total_kegiatan);

      const groupedData = [];
      for (let i = 0; i < labels.length; i += 4) {
        groupedData.push({
          labels: labels.slice(i, i + 4),
          datasets: [
            {
              label: "Kegiatan",
              backgroundColor: "#55b3fd",
              borderColor: "55b3fd",
              data: dataValues.slice(i, i + 4),
            },
          ],
        });
      }

      setChartData(groupedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AmbilData();
  }, []);

  const options = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: () => null,
        },
      },
    },
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={BgChartImg}
        alt="imgNews"
        className="absolute w-full h-full object-cover contrast-200"
      />
      <div className="absolute w-full h-full bg-white/90"></div>
      <Navbar color="black" />

      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full flex flex-col justify-center items-center px-20 py-10 z-10 space-y-10">
        <h1 className="text-3xl font-bold max-w-xl">
          Grafik Keaktifan Kegiatan
        </h1>
        <div className="flex justify-between gap-10">
          {chartData.map((data, index) => (
            <BarChart
              key={index}
              data={data}
              options={options}
              width={400}
              height={300}
            />
          ))}
        </div>
        <p className="text-sm max-w-2xl font-semibold text-center">
          SEKOLAH YANG MENGIKUT LEBIH DARI 11 KEGIATAN MERUPAKAN SEKOLAH
          MEMILIKI KATEGORI AKTIF DAN APABILA KURANG DARI 11 KEGIATAN TERMASUK
          SEKOLAH DENGAN KATEGORI KURANG AKTIF
        </p>
      </div>
    </div>
  );
};

export default Chart;
