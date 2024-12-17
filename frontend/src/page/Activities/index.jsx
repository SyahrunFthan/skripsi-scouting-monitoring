import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/General/Layouts";
import { ActivitiesComponents } from "../../components";
import { deleteActivitiesById, patchActivitiesData } from "../../utils/server";
import { showConfirm, showSuccess } from "../../utils";

const Activities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRow, setTotalRow] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const limit = 10;

  const patchDataActivities = async () => {
    try {
      setIsLoading(true);
      const response = await patchActivitiesData(page, limit, search);
      setData(response?.data?.response);
      setTotalPage(response?.data?.totalPage);
      setTotalRow(response?.data?.totalRow);
      setPage(response?.data?.page);
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickDelete = (id) => {
    showConfirm(
      "Anda yakin menghapus data?",
      "Tindakan ini tidak akan mengembalikan data!",
      async () => {
        try {
          setIsLoading(true);
          const response = await deleteActivitiesById(id);
          if (response?.status == 200) {
            showSuccess(response?.data?.message, 1000, () => {
              patchDataActivities();
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
    patchDataActivities();
  }, [page, search]);

  return (
    <DefaultLayout isLoading={isLoading}>
      <ActivitiesComponents
        title={"Data Kegiatan"}
        search={search}
        setSearch={setSearch}
        data={data}
        page={page}
        limit={limit}
        totalPage={totalPage}
        totalRow={totalRow}
        setPage={setPage}
        onClickDelete={(id) => handleClickDelete(id)}
      />
    </DefaultLayout>
  );
};

export default Activities;
