import { useEffect, useState } from "react";
import { BgGalleryImg } from "../../../assets";
import Navbar from "../../../components/Landing/Navbar/Navbar";
import { patchImagesApi } from "../../../utils/server";

const Gallery = () => {
  const [data, setData] = useState([]);

  const AmbilData = async () => {
    try {
      const response = await patchImagesApi();
      setData(response?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AmbilData();
  }, []);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-contrast-200 pb-20"
      style={{ backgroundImage: `url(${BgGalleryImg})` }}
    >
      <Navbar color="white" />

      <div className="h-full w-full flex flex-col justify-center items-center px-20 z-10 space-y-5">
        <h1 className="text-white text-center text-3xl font-bold max-w-sm">
          GALERI PRAMUKA KWARCAB KOTA PALU
        </h1>
        <div className="flex justify-between w-4/6 gap-5">
          <div className="space-y-8 w-1/4">
            {data.slice(0, 2).map((item, index) => {
              return (
                <div
                  className="rounded-[33px] w-full bg-[#D9D9D9] p-2"
                  key={index}
                >
                  <img
                    src={item?.image_path}
                    alt="cardImg"
                    className="w-full rounded-[33px]"
                  />
                  <p className="text-xs text-center py-1 font-bold">
                    {item?.contributions?.activity?.name}
                  </p>
                </div>
              );
            })}
          </div>
          {data[2] && (
            <div className="rounded-[33px] w-2/4 bg-[#D9D9D9] p-2 h-full">
              <img
                src={data[2]?.image_path}
                alt="cardImg"
                className="w-full rounded-[33px]"
              />
              <p className="text-xs text-center py-1 font-bold">
                {data[2]?.contributions?.activity?.name}
              </p>
            </div>
          )}
          <div className="space-y-8 w-1/4">
            {data.slice(3, 5).map((item, index) => (
              <div
                key={index}
                className="rounded-[33px] w-full bg-[#D9D9D9] p-2"
              >
                <img
                  src={item.image_path}
                  alt="cardImg"
                  className="w-full rounded-[33px]"
                />
                <p className="text-xs text-center py-1 font-bold">
                  {item?.contributions?.activity?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/60 text-sm font-bold text-center max-w-7xl">
          Sekolah berkomitmen mendukung pembentukan karakter siswa melalui
          pendidikan yang holistik, termasuk pengembangan jiwa kepemimpinan dan
          kedisiplinan melalui kegiatan kepramukaan. Berlokasi di [Alamat
          Sekolah], sekolah ini menyediakan lingkungan belajar yang kondusif,
          didukung fasilitas lengkap, dan program pembinaan pramuka yang aktif
          dan inovatif. Dengan semangat gotong royong, kemandirian, dan cinta
          tanah air, Sekolah [Nama Sekolah] terus melahirkan generasi muda yang
          berkarakter dan berkontribusi bagi masyarakat.
        </p>
      </div>
    </div>
  );
};

export default Gallery;
