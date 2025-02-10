import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BgAboutImg } from "../../../assets";
import Navbar from "../../../components/Landing/Navbar/Navbar";
import { patchSchoolHomeApi } from "../../../utils/server";

const About = () => {
  const [data, setData] = useState([]);
  // const data = [
  //   {
  //     id: 1,
  //     sekolah: "SMA Negeri 1 Palu",
  //     address: "Jl. Gatot Subroto",
  //     gudep: "01.120 - 01.121",
  //     kontribusi: "13",
  //     status: "kurang aktif",
  //   },
  //   {
  //     id: 2,
  //     sekolah: "SMA Negeri 2 Palu",
  //     address: "Jl. Gatot Subroto",
  //     gudep: "01.120 - 01.121",
  //     kontribusi: "13",
  //     status: "kurang aktif",
  //   },
  //   {
  //     id: 3,
  //     sekolah: "SMA Negeri 3 Palu",
  //     address: "Jl. Gatot Subroto",
  //     gudep: "01.120 - 01.121",
  //     kontribusi: "13",
  //     status: "kurang aktif",
  //   },
  //   {
  //     id: 4,
  //     sekolah: "SMA Negeri 4 Palu",
  //     address: "Jl. Gatot Subroto",
  //     gudep: "01.120 - 01.121",
  //     kontribusi: "13",
  //     status: "kurang aktif",
  //   },
  //   {
  //     id: 5,
  //     sekolah: "SMA Negeri 5 Palu",
  //     address: "Jl. Gatot Subroto",
  //     gudep: "01.120 - 01.121",
  //     kontribusi: "13",
  //     status: "kurang aktif",
  //   },
  // ];
  const navigate = useNavigate();

  const AmbilData = async () => {
    try {
      const response = await patchSchoolHomeApi();
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
      className="relative w-full min-h-screen bg-cover bg-contrast-200 bg-blue-500/60 pb-20"
      style={{ backgroundImage: `url(${BgAboutImg})` }}
    >
      <Navbar color="white" />

      <div className="h-full w-full flex flex-col items-center justify-center z-10 space-y-7">
        <h1 className="text-white text-center text-3xl font-bold">
          PROFIL GUGUS DEPAN PRAMUKA KOTA PALU
        </h1>

        <div className="overflow-hidden rounded-b-[56px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-black uppercase bg-[#D9D9D9] border-b-8 border-neutral-400">
              <tr>
                <th scope="col" className="px-6 py-5 pt-10">
                  No
                </th>
                <th scope="col" className="px-6 py-5 pt-10">
                  Sekolah
                </th>
                <th scope="col" className="px-6 py-5 pt-10">
                  Alamat
                </th>
                <th scope="col" className="px-6 py-5 pt-10">
                  No Gudep
                </th>
                <th scope="col" className="px-6 py-5 pt-10">
                  Kontribusi
                </th>
                <th scope="col" className="px-6 py-5 pt-10">
                  Status
                </th>
                <th scope="col" className="px-6 py-5 pt-10">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="bg-white uppercase" key={index}>
                  <th className="px-6 py-2">{index + 1}</th>
                  <td className="px-6 py-2">{item.name}</td>
                  <td className="px-6 py-2">{item.alamat}</td>
                  <td className="px-6 py-2">{item.numberGudep}</td>
                  <td className="px-6 py-2">{item.total_kegiatan}</td>
                  <td className="px-6 py-2">
                    {item.aktif == 1 ? "Aktif" : "Kurang Aktif"}
                  </td>
                  <td className="px-6 py-2">
                    <button
                      type="button"
                      className="bg-[#56ADFF] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-sm px-10 py-2.5 text-center mt-1"
                      onClick={() => navigate(`/about/${item.school_id}`)}
                    >
                      DETAIL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/60 text-sm font-bold text-center max-w-6xl">
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

export default About;
