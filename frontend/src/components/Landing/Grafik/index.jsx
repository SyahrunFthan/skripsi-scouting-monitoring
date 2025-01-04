import React, { useEffect, useState } from "react";
import { Pagination } from "../../General";
import { patchSchoolHomeApi } from "../../../utils";

const GrafikComponents = () => {
  const [schools, setSchools] = useState([]);

  const AmbilData = async () => {
    try {
      const response = await patchSchoolHomeApi();
      setSchools(response?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AmbilData();
  }, []);
  return (
    <div
      id="chart"
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/background.JPG')" }}
    >
      <div className="flex flex-col pt-[20%] md:pt-[7%] pb-[5%] w-full h-full text-white px-4">
        <h1 className="text-4xl font-bold max-w-[400px]">
          Keaktifan Sekolah Kota Palu
        </h1>

        <div className="flex flex-col w-full h-full overflow-y-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-1 no-scrollbar">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 w-8">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sekolah
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Alamat
                  </th>
                  <th scope="col" className="px-6 py-3">
                    No. Gudep
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Persentase
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {schools.map((item, index) => {
                  return (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50"
                      key={index}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item?.name}</td>
                      <td className="px-6 py-4">{item?.alamat}</td>
                      <td className="px-6 py-4">{item?.numberGudep}</td>
                      <td className="px-6 py-4">{item?.persentaseKegiatan}%</td>
                      <td className="px-6 py-4">
                        {item?.aktif == 1 ? "Aktif" : "Tidak Aktif"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default GrafikComponents;
