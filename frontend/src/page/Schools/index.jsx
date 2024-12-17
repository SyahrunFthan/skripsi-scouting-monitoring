import React, { useEffect, useRef, useState } from "react";
import { DefaultLayout, SchoolComponents } from "../../components";
import {
  createImportDataApi,
  deleteSchoolsById,
  patchSchoolsApi,
  showConfirm,
  showSuccess,
} from "../../utils";
import * as XLSX from "xlsx";

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

  const handleImportData = async () => {
    const filepaths = await window.showOpenFilePicker({
      types: [
        {
          description: "Excel Files",
          accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],
            "application/vnd.ms-excel": [".xls"],
          },
        },
      ],
      multiple: true,
    });

    const filedata = await Promise.all(
      filepaths.map(async (fileHanlde) => {
        const file = await fileHanlde.getFile();

        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "binary" });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsondata = XLSX.utils.sheet_to_json(worksheet);

        const dataSchool = jsondata.map((item) => {
          return {
            name: item?.["Nama Sekolah"],
            numberGudep: item?.["No Gudep"],
            total: item?.["Total Anggota"],
            address: item?.["Alamat"],
          };
        });

        return dataSchool;
      })
    );

    try {
      setIsLoading(true);
      const response = await createImportDataApi({ data: filedata[0] });
      if (response?.status == 201) {
        showSuccess(response?.data?.message, 1000, () => {
          patchDataSchools();
        });
      }
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsLoading(false);
    }
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
        onImportData={handleImportData}
      />
    </DefaultLayout>
  );
};

export default Schools;
