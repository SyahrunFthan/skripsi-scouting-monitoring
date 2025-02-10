import { useEffect, useState } from "react";
import { BgNewsImg, CardImg } from "../../../assets";
import Navbar from "../../../components/Landing/Navbar/Navbar";
import { getAllNewsApi } from "../../../utils/server";

const News = () => {
  const [data, setData] = useState([]);

  const AmbilData = async () => {
    try {
      const response = await getAllNewsApi();
      setData(response?.data?.response);
      console.log(response?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AmbilData();
  }, []);

  return (
    <div className="relative min-h-screen">
      <img
        src={BgNewsImg}
        alt="imgNews"
        className="absolute w-full h-full object-cover contrast-150 blur-sm"
      />
      <div className="absolute w-full h-full bg-red-600/50"></div>
      <Navbar color="white" />

      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full flex flex-col justify-between px-20 py-10 z-10 space-y-10">
        <p className="text-white text-5xl font-bold max-w-xl">
          Seputar Pramuka Indonesia
        </p>

        <div className="text-white text-5xl font-bold text-start -space-y-10">
          <p className="text-white text-sm font-extrabold">
            Pramuka Indonesia Saat Ini
          </p>
          <br />
          <p className="text-gray-300 text-sm">
            Pramuka Indonesia, sebagai salah satu organisasi kepanduan terbesar
            di dunia, terus menjadi wadah pembentukan karakter generasi muda
            yang tangguh, berintegritas, dan cinta tanah air. Di era modern ini,
            Pramuka tidak hanya identik dengan kegiatan alam terbuka, tetapi
            juga telah merambah ke berbagai bidang, seperti pengembangan
            teknologi, pemberdayaan masyarakat, dan kepedulian lingkungan.
          </p>
          <br />
          <p className="text-gray-300 text-[13px]">
            Melalui Gerakan Pramuka, anggota dididik untuk menjadi pemimpin yang
            berjiwa sosial, mandiri, dan mampu menghadapi tantangan zaman.
            Program-program inovatif yang berbasis pada penguatan keterampilan
            digital dan kewirausahaan kini diintegrasikan dalam aktivitas
            kepramukaan, sehingga selaras dengan kebutuhan generasi muda masa
            kini. Di tengah arus globalisasi, Pramuka Indonesia tetap memegang
            teguh Dasa Dharma dan Tri Satya sebagai pedoman hidup, sekaligus
            berperan aktif dalam menjaga dan mempromosikan nilai-nilai budaya
            Indonesia. Dengan semangat kebersamaan, Pramuka Indonesia terus
            menjadi pilar penting dalam membangun bangsa yang maju, mandiri, dan
            berkarakter
          </p>
        </div>

        {/* sisanya */}
        <div className="flex justify-between gap-20 flex-1">
          <div className="flex flex-col items-center w-1/2">
            {data.length > 0 && (
              <div className="rounded-[33px] bg-[#D9D9D9] p-5 w-full h-full">
                <img
                  src={data[0]?.path_image}
                  alt="product1"
                  className="w-full h-[200px] rounded-[33px] object-cover"
                />
                <p className="text-sm font-semibold text-center py-1">
                  {data[0]?.title}
                </p>
                <p className="text-sm text-center py-1">{data[0]?.sub_title}</p>
                <p className="text-sm text-center py-1">
                  {data[0]?.content?.split(".")[0] + "."}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 w-1/2">
            {data.slice(1).map((item, index) => {
              return (
                <div
                  className="rounded-[33px] bg-[#D9D9D9] p-2 border-2 pb-5"
                  key={index}
                >
                  <img
                    src={item?.path_image}
                    alt="product2"
                    className="w-full h-[100px] object-contain rounded-[33px]"
                  />
                  <p className="text-sm font-semibold text-center py-1">
                    {item?.title}
                  </p>
                  <p className="text-sm text-center py-1">{item?.sub_title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
