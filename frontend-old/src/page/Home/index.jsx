import { FaSearch } from "react-icons/fa";
import { BgHomeImg, Card2Img, CardImg } from "../../assets";
import Navbar from "../../components/Landing/Navbar/Navbar";
import { useEffect, useState } from "react";
import { searchSchoolApi } from "../../utils/server";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const AmbilData = async () => {
    try {
      const response = await searchSchoolApi(search);
      setData(response?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.trim().length > 0) {
      AmbilData();
    } else {
      setData([]);
    }
  }, [search]);

  return (
    <div className="relative min-h-screen">
      <img
        src={BgHomeImg}
        alt="imgHome"
        className="absolute w-full h-full object-cover contrast-150"
      />
      <div className="absolute w-full h-full bg-black/50"></div>

      <Navbar color="white" />

      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full flex flex-col items-center justify-center z-10 space-y-14">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white font-bold text-5xl max-w-5xl text-center">
            SISTEM MONITORING KEGIATAN KEPRAMUKAAN KOTA PALU
          </h1>
          <p className="text-[13px] text-white fnot text-center mt-5 max-w-6xl">
            Sistem Monitoring Kegiatan Kepramukaan Kota Palu adalah sebuah
            aplikasi yang dirancang untuk meningkatkan efisiensi pengelolaan dan
            pemantauan kegiatan kepramukaan di Kota Palu. Aplikasi ini mendukung
            transparansi dan akuntabilitas dengan menyediakan data kegiatan
            secara real-time, mempermudah komunikasi dan kolaborasi antara
            pembina, anggota, dan pihak terkait, serta meningkatkan partisipasi
            anggota dalam setiap kegiatan. Selain itu, aplikasi ini juga
            berfungsi sebagai basis data yang akurat untuk mendukung evaluasi
            dan perencanaan kegiatan kepramukaan di masa mendatang.
          </p>
        </div>

        {/* ------------------------------  */}

        <form className="w-1/2 mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-5 flex items-center ps-3 pointer-events-none">
              <FaSearch size={24} />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pr-9 text-gray-700 text-lg border border-gray-300 rounded-3xl bg-gray-50"
              placeholder="Cari Sekolah Anda ...."
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {data.length > 0 && (
            <div className="bg-white p-4 mt-2 flex flex-col gap-2">
              {data.map((item, index) => {
                return (
                  <div className="flex gap-3 border-b-2 pb-2" key={index}>
                    <img
                      src={Card2Img}
                      className="w-16 h-16 object-cover rounded-md"
                      alt=""
                    />

                    <div>
                      <h1 className="font-semibold text-black">SMAN 2 Palu</h1>
                      <h1>01.180 - 01.181</h1>
                      <h1>Jl. Lekatu</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </form>

        <div className="flex justify-between items-center w-2/3">
          <div className="rounded-[33px] w-72 bg-[#D9D9D9] p-2">
            <img
              src={CardImg}
              alt="cardImg"
              className="w-full rounded-[33px]"
            />
            <p className="text-xs text-center py-1 font-semibold">
              Sejarah Pramuka Dunia dan Pramuka Indonesia
            </p>
          </div>
          <div className="rounded-[33px] w-72 bg-[#D9D9D9] p-2">
            <img
              src={CardImg}
              alt="cardImg"
              className="w-full rounded-[33px]"
            />
            <p className="text-xs text-center py-1 font-semibold">
              Undang - undang Nomor 12 tahun 2010 tentang Gerakan pPramuka
            </p>
          </div>
          <div className="rounded-[33px] w-72 bg-[#D9D9D9] p-2">
            <img
              src={CardImg}
              alt="cardImg"
              className="w-full rounded-[33px]"
            />
            <p className="text-xs text-center py-1 font-semibold">
              Atribut Kepramukaan
            </p>
          </div>
        </div>

        {/* ------------------------------  */}
      </div>
    </div>
  );
};

export default Home;
