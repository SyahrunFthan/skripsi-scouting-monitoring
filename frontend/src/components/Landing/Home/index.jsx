import React from "react";
import { Link } from "react-scroll";

const HomeLandingComponents = () => {
  return (
    <div
      id="home"
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/background.JPG')" }}
    >
      <div className="h-screen max-w-[700px] flex flex-col justify-center px-3 text-white">
        <h1 className="text-2xl font-bold">Sistem Monitoring Kegiatan</h1>
        <h1 className="text-2xl font-bold">Kepramukaan Kota Palu</h1>
        <p>
          Sistem Monitoring Kegiatan Kepramukaan Kota Palu adalah sebuah
          aplikasi yang dirancang untuk meningkatkan efisiensi pengelolaan dan
          pemantauan kegiatan kepramukaan di Kota Palu. Aplikasi ini mendukung
          transparansi dan akuntabilitas dengan menyediakan data kegiatan secara
          real-time, mempermudah komunikasi dan kolaborasi antara pembina,
          anggota, dan pihak terkait, serta meningkatkan partisipasi anggota
          dalam setiap kegiatan.
        </p>
        <Link
          to="news"
          smooth={true}
          duration={500}
          className="px-6 md:px-8 bg-orange-500 w-[50%] md:w-[30%] mt-4 py-1.5 rounded-full hover:bg-orange-600"
        >
          Selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default HomeLandingComponents;
