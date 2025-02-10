import { BgAdressImg } from "../../../assets";
import Navbar from "../../../components/Landing/Navbar/Navbar";
import { Link } from "react-router-dom";

const Adress = () => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-contrast-200 bg-white/10 pb-20"
      style={{ backgroundImage: `url(${BgAdressImg})` }}
    >
      <Navbar color="white" />

      <div className="flex flex-col justify-center items-center px-5 z-10 space-y-5">
        <h1 className="text-white text-center text-3xl font-bold max-w-xl">
          SEKRETARIAT KWARCAB KOTA PALU
        </h1>

        <div className="flex justify-center border-2 overflow-hidden w-2/4 rounded-[33px]">
          <div
            style={{
              position: "relative",
              textAlign: "right",
              width: "100%",
              height: "400px",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                background: "none",
                width: "100%",
                height: "100%",
              }}
            >
              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=kwarcab palu&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                frameBorder="0"
                scrolling="no"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            </div>
          </div>
        </div>

        <Link
          to="https://www.instagram.com/dk_cabangpalu/"
          target="_blank"
          type="button"
          className="bg-[#56ADFF] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-sm px-10 py-2.5 text-center mt-1"
        >
          KUNJUNGI SEKRETARIAT KAMI !
        </Link>

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

export default Adress;
