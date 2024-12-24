import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { patchSearchSchoolApi, patchSearchSchoolByIdApi } from "../../utils";
import { ActivityChart, ProgresComponents } from "../../components";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [calculate, setCalculate] = useState(0);
  const [point, setPoint] = useState(0);
  const [schools, setSchools] = useState([]);

  const patchSearchData = async () => {
    try {
      setIsLoading(true);
      const response = await patchSearchSchoolApi(search);
      setData(response?.data?.response);
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() !== "") {
        patchSearchData();
      } else {
        setData([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleOpenModal = async (id) => {
    try {
      const response = await patchSearchSchoolByIdApi(id);
      if (response?.status == 200) {
        setCalculate(response?.data?.calculate);
        setSchools(response?.data?.response);
        setPoint(response?.data?.totalPoints);

        document.getElementById("my_modal_4").showModal();
      }
    } catch (error) {
      console.log(error?.response);
    } finally {
      setSearch("");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen px-2 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/background.JPG')" }}
    >
      <div className="flex flex-col w-[90%] lg:w-[50%] fixed top-56 z-10">
        <div className="flex items-center gap-3 relative">
          <div className="absolute left-2">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Cari Sekolah"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-md pl-8 input-bordered bg-white w-full shadow-md text-xl placeholder:text-gray-500"
          />
        </div>
        {data.length > 0 && (
          <div className="flex flex-col w-full border p-4 rounded-md bg-white shadow-md mt-1 gap-3">
            {data.map((item, index) => {
              return (
                <button
                  className="pb-2 border-b-2 flex flex-col"
                  key={index}
                  onClick={() => handleOpenModal(item?.id_school)}
                >
                  <h1 className="text-sm font-semibold text-black">
                    {item?.name}
                  </h1>
                  <h1 className="text-sm font-semibold text-gray-400">
                    {item?.number_gudep}
                  </h1>
                </button>
              );
            })}
          </div>
        )}

        {search.trim() !== "" && !isLoading && data.length === 0 && (
          <div className="flex flex-col w-full border p-4 rounded-md bg-white shadow-md mt-1 gap-3">
            <div className="flex w-full items-center justify-center">
              <h1 className="text-xl font-semibold text-black">
                Data tidak di temukan
              </h1>
            </div>
          </div>
        )}
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          {/* Container Flex untuk Grafik dan Data Sekolah */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Bagian Grafik */}
            <div className="flex-1 border p-4 bg-gray-100 rounded-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                Grafik Keaktifan Kepramukaan
              </h2>
              <ActivityChart calculate={calculate} />
            </div>

            {/* Bagian Data Sekolah */}
            <div className="flex-1 border p-4 bg-gray-100 rounded-md w-full">
              <h2 className="text-xl font-semibold mb-4">Data Sekolah</h2>
              <ul className="list-none text-gray-700 space-y-2">
                <li>
                  <strong>Nama Sekolah:</strong> {schools?.name}
                </li>
                <li>
                  <strong>No. Gudep:</strong> {schools?.number_gudep}
                </li>
                <li>
                  <strong>Total Anggota:</strong> {schools?.total_participant}
                </li>
                <li>
                  <strong>Alamat:</strong> {schools?.address}
                </li>
                <li>
                  <strong>Total Point:</strong> {point}
                </li>
              </ul>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={() => {
                  setCalculate(0);
                  setData([]);
                  setSchools([]);
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
