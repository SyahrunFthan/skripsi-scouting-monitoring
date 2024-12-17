import React from "react";
import {
  Button,
  EmptyData,
  InputSearch,
  Pagination,
  TitleComponents,
} from "../../General";
import {
  FaDownload,
  FaEdit,
  FaPlus,
  FaTrashAlt,
  FaUpload,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SchoolComponents = ({
  title,
  search,
  setSearch,
  schools,
  setPage,
  page,
  limit,
  totalRow,
  totalPage,
  onClickDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar w-full">
      <TitleComponents title={title} />

      <div className="flex flex-col my-3 w-full h-full">
        <div className="flex flex-col w-full max-h-full bg-white shadow-md p-4 rounded-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                title={"Tambah Data"}
                icon={<FaPlus />}
                onClick={() => navigate("/schools/create")}
              />
              <Button title={"Download Data"} icon={<FaUpload />} />
              <Button title={"Import Data"} icon={<FaDownload />} />
            </div>
            <InputSearch search={search} setSearch={setSearch} />
          </div>

          {schools?.length > 0 ? (
            <>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3 no-scrollbar">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-8">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Gugus Depan
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Anggota
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Alamat Sekolah
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
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
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {(page - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={
                                      item?.image !== null
                                        ? item?.path_image
                                        : "/assets/images/scout.png"
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item?.name}</div>
                                <div className="text-sm opacity-50">
                                  {item?.number_gudep}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {item?.total_participant}
                          </td>
                          <td className="px-6 py-4">{item?.address}</td>
                          <td className="px-6 py-4 gap-2 flex">
                            <Link
                              to={`/schools/edit/${item?.id_school}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              type="button"
                              onClick={() => onClickDelete(item?.id_school)}
                              className="font-medium text-red-600 hover:underline"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Pagination
                onChangePage={setPage}
                totalPage={totalPage}
                totalRows={totalRow}
              />
            </>
          ) : (
            <div className="my-4">
              <EmptyData text={"Tidak ada data"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolComponents;
