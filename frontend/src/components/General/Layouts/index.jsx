import React, { useEffect, useState } from "react";
import SidebarComponents from "../Sidebar";
import NavbarComponents from "../Navbar";
import {
  FaChalkboard,
  FaChartLine,
  FaFileAlt,
  FaTachometerAlt,
  FaTrophy,
} from "react-icons/fa";
import LoadingComponents from "../Loading";
import ProgresComponents from "../Progress";

const DefaultLayout = ({ children, isLoading }) => {
  const [loading, setLoading] = useState(true);

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Data Kegiatan",
      path: "/activities",
      icon: <FaChartLine />,
    },
    {
      name: "Data Sekolah",
      path: "/schools",
      icon: <FaChalkboard />,
    },
    {
      name: "Data Kontribusi",
      path: "/contributions",
      icon: <FaTrophy />,
    },
    {
      name: "Data Laporan",
      path: "/laporan",
      icon: <FaFileAlt />,
    },
  ];

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
        <NavbarComponents menus={menus} />
        <div className="flex bg-slate-100 flex-col flex-1 w-full h-full px-4 overflow-y-auto no-scrollbar py-4 md:py-8">
          {children}
        </div>
      </div>

      {isLoading && <ProgresComponents />}
    </div>
  );
};

export default DefaultLayout;
