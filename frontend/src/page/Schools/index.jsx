import React, { useEffect, useState } from "react";
import { DefaultLayout, SchoolComponents } from "../../components";
import {
  deleteSchoolsById,
  patchSchoolsApi,
  showConfirm,
  showSuccess,
} from "../../utils";

const Schools = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRow, setTotalRow] = useState(0);
  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);
  const limit = 10;

  const patchDataSchools = async () => {
    try {
      setIsLoading(true);
      const response = await patchSchoolsApi(page, limit, search);
      setSchools(response.data.schools);
      setTotalPage(response.data.totalPage);
      setTotalRow(response.data.totalRow);
      setPage(response?.data?.page);
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSchool = (id) => {
    showConfirm(
      "Anda yakin menghapus data?",
      "Tindakan ini tidak akan mengembalikan data!",
      async () => {
        try {
          setIsLoading(true);

          const response = await deleteSchoolsById(id);
          if (response?.status == 200) {
            showSuccess(response?.data?.message, 1500, () => {
              patchDataSchools();
            });
          }
        } catch (error) {
          console.log(error?.response);
        } finally {
          setIsLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    patchDataSchools();
  }, [search, page]);

  return (
    <DefaultLayout>
      <SchoolComponents
        title={"Data Sekolah"}
        search={search}
        setSearch={setSearch}
        schools={schools}
        limit={limit}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        totalRow={totalRow}
        onClickDelete={(id) => handleDeleteSchool(id)}
      />
    </DefaultLayout>
  );
};

export default Schools;
