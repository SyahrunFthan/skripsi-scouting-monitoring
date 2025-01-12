import React from "react";
import {
  Button,
  EmptyData,
  InputSearch,
  Pagination,
  TitleComponents,
} from "../../General";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ActivitiesComponents = ({
  title,
  search,
  setSearch,
  setPage,
  totalPage,
  totalRow,
  data,
  page,
  limit,
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
                onClick={() => navigate("/admin/activities/create")}
                title={"Tambah Data"}
                icon={<FaPlus />}
              />
            </div>
            <InputSearch search={search} setSearch={setSearch} />
          </div>

          {data.length > 0 ? (
            <>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-1 no-scrollbar">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-8">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama Kegiatan
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Skala Kegiatan
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Point Kegiatan
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
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
                          <td className="px-6 py-4">{item?.name}</td>
                          <td className="px-6 py-4">{item?.scale_activity}</td>
                          <td className="px-6 py-4">{item?.points}</td>
                          <td className="px-6 py-4 gap-2 flex">
                            <Link
                              to={`/admin/activities/edit/${item?.id_activity}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              type="button"
                              onClick={() => onClickDelete(item?.id_activity)}
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
                totalPage={totalPage}
                totalRows={totalRow}
                onChangePage={setPage}
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

export default ActivitiesComponents;
