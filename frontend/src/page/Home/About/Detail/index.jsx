import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/Landing/Navbar/Navbar";
import PieChart from "../../../../components/Landing/PieChart/PieChart";
import { patchSchoolDetailApi } from "../../../../utils/server";

const DetailAbout = () => {
  const { uuid } = useParams();

  const [school, setSchool] = useState([]);
  const [contribution, setContribution] = useState([]);
  const [images, setImages] = useState([]);
  const [dataChart, setDataChart] = useState({
    active: 0,
    notActive: 0,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activity = [
    {
      id: 1,
      title: "Kegiatan 1",
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    },
    {
      id: 2,
      title: "Kegiatan 2",
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    },
    {
      id: 3,
      title: "Kegiatan 3",
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    },
    {
      id: 4,
      title: "Kegiatan 4",
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    },
    {
      id: 5,
      title: "Kegiatan 5",
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    },
    {
      id: 6,
      title: "Kegiatan 6",
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    },
    {
      id: 7,
      title: "Kegiatan 7",
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const charts = {
    labels: ["Aktif", "Tidak Aktif"],
    datasets: [
      {
        label: "Kategori Sekolah",
        data: [dataChart?.active, dataChart?.notActive],
        backgroundColor: ["#8979FF", "#FF928A"],
        borderColor: ["#8979FF", "#FF928A"],
        borderWidth: 1,
      },
    ],
  };

  const optionsChart = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw} Sekolah`;
          },
        },
      },

      datalabels: {
        display: true,
        formatter: (value, context) => {
          const total = context.chart._data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${value} (${percentage}%)`;
        },
        color: "white",
        font: {
          weight: "bold",
          size: 16,
        },
        anchor: "center",
        align: "center",
      },
    },
  };

  const AmbilData = async () => {
    try {
      const response = await patchSchoolDetailApi(uuid);
      setSchool(response?.data?.school);
      setContribution(response?.data?.contribution);
      setDataChart({
        active: response?.data?.active,
        notActive: response?.data?.notActive,
      });

      const imagesData = response?.data?.contribution?.map(
        (item) => item?.images
      );

      setImages(imagesData);
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    AmbilData();
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-[#0095FF] to-[#000B12] min-h-screen">
      <Navbar color="white" />

      <div className="h-full w-full flex flex-col px-20 py-10 z-10 space-y-10 gap-5">
        <p className="text-white text-3xl font-extrabold max-w-sm mt-10">
          PROFIL GUGUS DEPAN PRAMUKA KOTA PALU
        </p>
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-1 flex flex-col items-center justify-center p-10 bg-white rounded-2xl gap-5">
            <img
              src={school?.path_image}
              alt="profile"
              className="w-56 h-56 rounded-full"
            />
            <div className="text-center">
              <p className="text-lg font-bold">{school?.name}</p>
              <p className="text-lg">{school?.number_gudep}</p>
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-16">
            <p className="text-lg font-bold text-center mb-10">
              SMA NEGERI 3 PALU
            </p>
            <div className="space-y-5">
              <div className="flex items-center">
                <label className="text-base font-bold w-1/4">Nama</label>
                <input
                  type="text"
                  className="w-2/4 pl-10 py-2 text-sm rounded-md bg-[#D9D9D9] pr-4 placeholder:text-black font-semibold shadow-lg border-none"
                  value={school?.name}
                  disabled
                />
              </div>

              <div className="flex items-center">
                <label className="text-base font-bold w-1/4">Alamat</label>
                <input
                  type="text"
                  className="w-2/4 pl-10 py-2 text-sm rounded-md bg-[#D9D9D9] pr-4 placeholder:text-black font-semibold shadow-lg border-none"
                  value={school?.address}
                  disabled
                />
              </div>

              <div className="flex items-center">
                <label className="text-base font-bold w-1/4">No Gudep</label>
                <input
                  type="text"
                  className="w-2/4 pl-10 py-2 text-sm rounded-md bg-[#D9D9D9] pr-4 placeholder:text-black font-semibold shadow-lg border-none"
                  value={school?.number_gudep}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <label className="text-base font-bold w-1/4">Kegiatan</label>
                <div className="relative w-2/4">
                  <div
                    onClick={toggleDropdown}
                    className="w-full pl-10 py-2 text-sm rounded-md bg-[#D9D9D9] pr-4 placeholder:text-black font-semibold shadow-lg border-none cursor-pointer"
                    aria-haspopup="true"
                    role="listbox"
                  >
                    kegiatan yang diikuti
                  </div>

                  {isDropdownOpen && (
                    <ul
                      className="absolute w-full max-h-60 overflow-y-auto bg-[#D9D9D9] mt-1 rounded-md shadow-lg z-10"
                      role="listbox"
                    >
                      {contribution.map((item, index) => {
                        return (
                          <li className="p-2 cursor-not-allowed" key={index}>
                            {item?.activity?.name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1 flex flex-col items-center justify-center p-10 bg-white rounded-2xl gap-5">
            <div className="flex justify-center gap-10">
              <PieChart
                data={charts}
                options={optionsChart}
                width={300}
                height={300}
              />
            </div>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 justify-center p-2 h-96 bg-white rounded-2xl overflow-y-scroll">
              {images.map((item) =>
                item.map((row, indexRow) => {
                  return (
                    <img
                      key={indexRow}
                      className="max-w-full h-48 rounded-lg"
                      src={row?.image_path}
                      alt="gambar"
                    />
                  );
                })
              )}
            </div>
          ) : (
            <div className="border bg-white p-2 rounded-2xl items-center justify-center flex">
              <h1 className="text-center font-semibold">
                Tidak Ada Foto Kegiatan
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailAbout;
