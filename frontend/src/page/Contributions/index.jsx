import React, { useEffect, useState } from "react";
import { ContributionComponents, DefaultLayout } from "../../components";
import {
  deleteContributionApi,
  detailContributionApi,
  patchContributionApi,
} from "../../utils/server";
import { showConfirm, showError, showSuccess } from "../../utils";

const Contributions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [contributions, setContributions] = useState([]);
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
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
      "Ya, Hapus",
      async () => {
        try {
          setIsLoading(true);
          const response = await deleteContributionApi(id);
          if (response?.status == 200) {
            showSuccess(response?.data?.message, 1000, () => {
              getDataContibution();
              setSearch("");
            });
          }
        } catch (error) {
          if (error?.response?.status == 400) {
            showError(error?.response?.data?.message);
          } else {
            console.log(error);
          }
        } finally {
          setIsLoading(false);
        }
      }
    );
  };

  const handleClickDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await detailContributionApi(id);
      if (response?.status == 200) {
        setImages(response?.data?.response);
        setShowCarousel(true);
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        showError(error?.response?.data?.message);
      } else {
        console.log(error);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };

  useEffect(() => {
    getDataContibution();
  }, [search]);
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
        onClickDetails={(id) => handleClickDetails(id)}
      />
      {showCarousel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
              onClick={() => setShowCarousel(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
            >
              ✖
            </button>
            <div className="carousel carousel-vertical rounded-box h-96">
              {images.map((image, index) => {
                return (
                  <div className="carousel-item h-full" key={index}>
                    <img src={image?.image_path} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Contributions;
