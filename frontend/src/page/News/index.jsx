import React, { useEffect, useState } from "react";
import { DefaultLayout, NewsComponentsPage } from "../../components";
import {
  deleteNewsApi,
  getNewsApi,
  showConfirm,
  showError,
  showSuccess,
} from "../../utils";

const NewsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  const AmbilData = async () => {
    try {
      const response = await getNewsApi(search, page, limit);
      setNews(response.data.news);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
      setPage(response.data.page);
    } catch (error) {
      showError("Server dalam gangguan.");
    }
  };

  const handleDelete = (id) => {
    showConfirm(
      "Anda akan menghapus data?",
      "Klik, Hapus untuk melanjutkan!",
      "Ya, Hapus",
      async () => {
        try {
          setIsLoading(true);
          const response = await deleteNewsApi(id);
          if (response?.status == 200) {
            showSuccess(response?.data?.message, 1000, () => {
              AmbilData();
            });
          }
        } catch (error) {
          showError("Server dalam gangguan.");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        }
      }
    );
  };

  useEffect(() => {
    AmbilData();
  }, [search, page]);
  return (
    <DefaultLayout isLoading={isLoading}>
      <NewsComponentsPage
        title={"Data Berita"}
        data={news}
        page={page}
        limit={limit}
        totalPages={totalPages}
        totalRows={totalRows}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        onDeleteData={(id) => handleDelete(id)}
      />
    </DefaultLayout>
  );
};

export default NewsPage;
