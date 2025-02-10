import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarComponents = ({ menus }) => {
  const location = useLocation();
  return (
    <div className="hidden lg:flex flex-col fixed py-8 px-4 bg-accent h-screen w-64 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <img src="/assets/images/scout.png" className="w-12 h-12" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Scouting</h1>
            <span className="mt-[-5px] font-light">Monitoring</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-20">
        <ul className="flex flex-col gap-3">
          {menus.map((item, index) => {
            const isActive =
              location.pathname.startsWith(item?.path) ||
              item.subMenu?.some((sub) =>
                location.pathname.startsWith(sub.path)
              );
            return (
              <Link
                className={`flex items-center gap-4 px-4 py-2 text-xl ${
                  isActive ? "bg-gray-500/20 rounded-md" : ""
                }`}
                key={index}
                to={item?.path}
              >
                {item?.icon}
                <span>{item?.name}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponents;
