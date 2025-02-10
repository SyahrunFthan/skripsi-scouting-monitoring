import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import {
  FaBars,
  FaInbox,
  FaLongArrowAltLeft,
  FaSignOutAlt,
  FaStream,
  FaUserCircle,
  FaUserCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavbarComponents = ({ menus, data, onClickLogout }) => {
  const [showList, setShowList] = useState(false);
  const location = useLocation();

  return (
    <div className="px-4 py-4 shadow-lg border-b-2 bg-white flex items-center justify-between lg:justify-end">
      <Popover className={"flex lg:hidden"}>
        <PopoverButton
          onClick={() => setShowList((prev) => !prev)}
          className="border w-8 h-8 flex items-center justify-center shadow-sm outline-none"
        >
          {showList ? (
            <FaStream className="transition-transform duration-150" />
          ) : (
            <FaBars className="transition-transform duration-150" />
          )}
        </PopoverButton>

        <Transition
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
          show={showList}
        >
          <PopoverPanel
            anchor="bottom"
            className="fixed inset-0 h-screen opacity-50 z-10"
            onClick={() => setShowList((show) => !show)} // Close menu when clicking outside
          ></PopoverPanel>
        </Transition>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
          show={showList}
        >
          <PopoverPanel className="absolute py-8 px-4 bg-accent left-0 top-0 h-screen w-64 z-20 text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <img src="/assets/images/scout.png" className="w-12 h-12" />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold">Scouting</h1>
                  <span className="mt-[-5px] font-light">Monitoring</span>
                </div>
              </div>
              <button onClick={() => setShowList((show) => !show)}>
                <FaLongArrowAltLeft size={28} />
              </button>
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
                        isActive ? "bg-gray-500/20" : ""
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
          </PopoverPanel>
        </Transition>
      </Popover>

      <Popover>
        <PopoverButton className="outline-none">
          <img
            src={
              data?.path_image ? data?.path_image : "/assets/images/user-01.png"
            }
            className="w-8 h-8"
            alt=""
          />
        </PopoverButton>

        <PopoverPanel
          anchor="bottom"
          className="flex flex-col w-1/2 lg:w-[20%] bg-white left-0 right-6 py-3 px-3"
        >
          <div className="flex flex-col py-4 gap-2">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-gray-400" />
              <span className="text-sm text-gray-400">{data?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaInbox className="text-gray-400" />
              <span className="text-sm text-gray-400">{data?.email}</span>
            </div>

            <div className="border-t mt-2">
              <button
                type="button"
                onClick={onClickLogout}
                className="flex items-center gap-3 mt-3 w-full"
              >
                <FaSignOutAlt className="text-gray-400" />
                <span className="text-sm text-gray-400">Keluar Aplikasi</span>
              </button>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default NavbarComponents;
