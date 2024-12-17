import React, { useEffect, useState } from "react";
import { ContributionComponents, DefaultLayout } from "../../components";
import {
  deleteContributionApi,
  patchContributionApi,
} from "../../utils/server";
import { showConfirm, showSuccess } from "../../utils";

const Contributions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [contributions, setContributions] = useState([]);
  const [search, setSearch] = useState("");
  const limit = 10;

  const getDataContibution = async () => {
    try {
      setIsLoading(true);
      const response = await patchContributionApi(page, limit, search);
      const {
        contributions: contribution,
        totalRows: totalRow,
        totalPages: totalPage,
        page: pages,
      } = response.data;
      setContributions(contribution);
      setPage(pages);
      setTotalPages(totalPage);
      setTotalRows(totalRow);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContribution = (id) => {
    showConfirm(
      "Anda yakin hapus data?",
      "Klik yes untuk melanjutkan",
      async () => {
        try {
          setIsLoading(true);
          const response = await deleteContributionApi(id);
          if (response?.status == 200) {
            showSuccess(response?.data?.message, 1000, () => {
              getDataContibution();
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
    getDataContibution();
  }, []);
  return (
    <DefaultLayout isLoading={isLoading}>
      <ContributionComponents
        title={"Data Kontribusi"}
        search={search}
        setSearch={setSearch}
        page={page}
        totalPages={totalPages}
        totalRows={totalRows}
        contributions={contributions}
        limit={limit}
        setPage={setPage}
        onClickDelete={(id) => handleDeleteContribution(id)}
      />
    </DefaultLayout>
  );
};

export default Contributions;
