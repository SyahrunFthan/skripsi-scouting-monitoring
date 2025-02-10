import React, { useEffect, useState } from "react";
import {
  Button,
  InputSearch,
  Pagination,
  TitleComponents,
} from "../../General";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getNewsApi, showError } from "../../../utils";

const NewsComponentsPage = ({
  title,
  data,
  search,
  setSearch,
  page,
  limit,
  totalPages,
  totalRows,
  setPage,
  onDeleteData,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full">
      <TitleComponents title={title} />

      <div className="flex flex-col w-full border mt-4 p-4 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              title={"Tambah Data"}
              icon={<FaPlus />}
              onClick={() => navigate("/admin/news/create")}
            />
          </div>
          <InputSearch search={search} setSearch={setSearch} />
        </div>

        <div className="flex flex-col w-full mt-3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3 no-scrollbar">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 w-8">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Foto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Judul
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sub Judul
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Isi
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
                      <td className="px-6 py-4">
                        <img
                          src={item?.path_image}
                          className="w-12 h-12 bg-center bg-cover"
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-4">{item?.title}</td>
                      <td className="px-6 py-4">{item?.sub_title}</td>
                      <td className="px-6 py-4">{item?.content}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => onDeleteData(item?.id)}
                          type="button"
                          className="text-red-500"
                        >
                          <FaTrash />
                        </button>
                        <Link
                          to={`/admin/news/${item?.id}`}
                          className="text-blue-500"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            onChangePage={setPage}
            totalPage={totalPages}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsComponentsPage;
