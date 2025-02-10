import React, { useEffect, useState } from "react";
import SidebarComponents from "../Sidebar";
import NavbarComponents from "../Navbar";
import {
  FaChalkboard,
  FaChartLine,
  FaFileAlt,
  FaNewspaper,
  FaTachometerAlt,
  FaTrophy,
} from "react-icons/fa";
import LoadingComponents from "../Loading";
import ProgresComponents from "../Progress";
import {
  getItem,
  patchUserLoginApi,
  removeItem,
  removeTokenApi,
  showConfirm,
} from "../../../utils";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children, isLoading }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Data Kegiatan",
      path: "/admin/activities",
      icon: <FaChartLine />,
    },
    {
      name: "Data Sekolah",
      path: "/admin/schools",
      icon: <FaChalkboard />,
    },
    {
      name: "Data Kontribusi",
      path: "/admin/contributions",
      icon: <FaTrophy />,
    },
    {
      name: "Data Berita",
      path: "/admin/news",
      icon: <FaNewspaper />,
    },
  ];

  const handleLogout = () => {
    showConfirm(
      "Anda yakin keluar aplikasi?",
      "Jika ya, klik tombol Ya, Keluar!",
      "Ya, Keluar",
      async () => {
        try {
          setLoading(true);
          const profile = getItem("profile");
          const response = await removeTokenApi(profile?.userId);
          if (response?.status == 200) {
            removeItem("profile");
            navigate("/");
          }
        } catch (error) {
          console.log(error?.response);
        } finally {
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    const AmbilData = async () => {
      try {
        const profile = getItem("profile");
        const response = await patchUserLoginApi(profile?.userId);
        setData(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };

    AmbilData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingComponents />;
  }
  return (
    <div className="h-screen w-screen flex overflow-hidden flex-col lg:flex-row">
      <SidebarComponents menus={menus} />
      <div className="flex flex-col w-screen h-screen lg:ml-64">
        <NavbarComponents
          menus={menus}
          data={data}
          onClickLogout={handleLogout}
        />
        <div className="flex bg-slate-100 flex-col flex-1 w-full h-full px-4 overflow-y-auto no-scrollbar py-4 md:py-8">
          {children}
        </div>
      </div>

      {isLoading && <ProgresComponents />}
    </div>
  );
};

export default DefaultLayout;
