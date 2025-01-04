import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

const listMenus = [
  {
    id: "home",
    name: "Beranda",
  },
  {
    id: "news",
    name: "Berita",
  },
  {
    id: "chart",
    name: "Grafik",
  },
  {
    id: "about",
    name: "About",
  },
  {
    id: "galary",
    name: "Galeri",
  },
];

const NavbarHomeComponents = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between px-5 lg:px-[72px] h-[80px] fixed top-0 w-full bg-gray-200/20 z-50">
      <ul className="hidden md:flex">
        <li className="flex gap-x-4">
          {listMenus.map((menu) => {
            return (
              <Scroll
                to={menu?.id}
                smooth={true}
                duration={500}
                activeClass="costum-active"
                className={`hover:text-orange-500 text-sm cursor-pointer text-gray-400`}
                key={menu?.id}
              >
                {menu?.name}
              </Scroll>
            );
          })}
        </li>
      </ul>
      <div className="flex items-center">
        <Link
          to={"/admin/auth"}
          className="hidden md:flex px-6 lg:px-8 py-2 bg-orange-500 transition-all duration-150 rounded-full text-white hover:shadow-md text-sm"
        >
          Masuk
        </Link>
        <FaBars
          className="text-2xl block md:hidden cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      </div>
      <div
        className={`flex flex-col gap-4 pt-5 bg-white px-5 md:hidden absolute top-0 w-full h-screen ${
          showMenu ? "right-0" : "-right-[100%]"
        }`}
      >
        <FaTimes
          className="cursor-pointer text-2xl"
          onClick={() => setShowMenu((prev) => !prev)}
        />
        <ul>
          <li className="flex gap-y-5 flex-col">
            {listMenus.map((menu) => {
              return (
                <Link
                  to={menu?.id}
                  className="hover:text-orange-500 text-sm border-b cursor-pointer"
                  key={menu?.id}
                >
                  {menu?.name}
                </Link>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarHomeComponents;
