"use client";
import { useState } from "react";
import {
  FaHome,
  FaBook,
  FaGem,
  FaChevronDown,
  FaChevronRight,
  FaStar,
  FaImages,
  FaSitemap,
  FaListUl,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { MdSwitchLeft } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import { CgMenuRightAlt } from "react-icons/cg";

const MenuItems = ({ handleAside }) => {
  const [openMenu, setOpenMenu] = useState({
    sitePages: false,
    assets: false,
    content: false,
    menu: false,
  });

  const toggleSubMenu = (menu) => {
    setOpenMenu((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const pathname = usePathname();
  const HandleFunction = (path) => {
    let isCurrentpath = path === pathname;
    return isCurrentpath;
  };

  const HandleParentFunction = (statwith) => {
    let isContentPath = pathname.startsWith(statwith);
    if (isContentPath) {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* Header */}
      <div className="mb-5 w-[100%]">
        <div className="flex items-center justify-between p-2 border-2 rounded-[10px] border-[#EEEEEE]">
          <div className="flex items-center gap-3 justify-start">
            <div className="h-[40px] w-[40px] rounded-full">
              <img
                src="/favicon.svg"
                alt=""
                className="object-cover w-[100%] h-[100%]"
              />
            </div>
            <div className="flex items-start justify-start flex-col ">
              <h1 className="font-medium text-[20px]">honeycomb</h1>
              <p className="text-[14px] text-[#4A5367]">Content Management</p>
            </div>
          </div>
          <div>
            <MdSwitchLeft className="rotate-90 text-[#82838A] text-[18px]" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="overflow-y-auto  no-scrollbar h-[calc(100vh-20vh)] pb-20">
        <ul className="space-y-2">
          <li className="flex flex-col">
            <div
              className={`flex ${
                false ? "bg-[#F6F6FF]" : ""
              } hover:bg-[#F6F6FF] px-4 py-3 rounded-[10px]  items-center justify-between gap-3 cursor-pointer`}
              onClick={() => toggleSubMenu("content")}
            >
              <div className="flex  items-center gap-3">
                <FaBook className="text-[#82838A]" />
                <span className="text-[#0A1215]">Content</span>
              </div>
              {openMenu.content ? (
                <FaChevronDown className="text-[#82838A]" />
              ) : (
                <FaChevronRight className="text-[#82838A]" />
              )}
            </div>
            {openMenu.content && (
              <ul className="ml-12 mt-2 border-l-2 border-gray-2  space-y-2">
                <li
                  className={`${
                    HandleFunction("/content/home-page")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/home-page"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Homepage
                  </Link>
                  {HandleFunction("/content/home-page") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/site-page")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/site-page"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Site Pages
                  </Link>
                  {HandleFunction("/content/site-page") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/policies")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/policies"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Policies
                  </Link>
                  {HandleFunction("/content/policies") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/guides")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/guides"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Guides
                  </Link>
                  {HandleFunction("/content/guides") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/birth-stones")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/birth-stones"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Birthstones
                  </Link>
                  {HandleFunction("/content/birth-stones") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/social-medias")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/social-medias"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Social Media
                  </Link>
                  {HandleFunction("/content/social-medias") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/ring-size-guide")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/ring-size-guide"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    {" "}
                    Ring size guide
                  </Link>
                  {HandleFunction("/content/ring-size-guide") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/gemstone-certification")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/gemstone-certification"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    {" "}
                    Gemstone certification
                  </Link>
                  {HandleFunction("/content/gemstone-certification") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/holiday-gift-guide")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/holiday-gift-guide"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    {" "}
                    Holiday gift guide
                  </Link>
                  {HandleFunction("/content/holiday-gift-guide") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/shipping")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/shipping"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Shipping
                  </Link>
                  {HandleFunction("/content/shipping") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/content/category-page")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/content/category-page"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    {" "}
                    Category Pages
                  </Link>
                  {HandleFunction("/content/category-page") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
              </ul>
            )}
          </li>
          {/* <li className="flex flex-col">
              <div
                className={`flex ${false ? "bg-[#F6F6FF]":""} hover:bg-[#F6F6FF] px-4 py-3 rounded-[10px]  items-center justify-between gap-3 cursor-pointer`}
                onClick={() => toggleSubMenu('assets')}
              >
              <div className="flex  items-center gap-3">
                <FaImages className='text-[#82838A]' />
                <span className='text-[#0A1215]'>Assets</span>
              </div>
                {openMenu.assets ? (
                  <FaChevronDown className='text-[#82838A]' />
                ) : (
                  <FaChevronRight className='text-[#82838A]' />
                )}
              </div>
              {openMenu.assets && (
                <ul className="ml-12 mt-2  border-l-2 border-gray-2  space-y-2">
                  <li className={`${HandleFunction('/assets/images') ? "bg-[#F6F6FF] text-[#434CE7]":"text-[#0A1215]"} cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}>
                    <Link href="/assets/images" onClick={handleAside} className='flex font-medium w-[100%]'>Images</Link>
                    {HandleFunction('/assets/images') && <div className='w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]'></div>}
                  </li>
                  <li className={`${HandleFunction('/assets/videos') ? "bg-[#F6F6FF] text-[#434CE7]":"text-[#0A1215]"} cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}>
                     <Link href="/assets/videos" onClick={handleAside} className='flex font-medium w-[100%]'>Videos</Link>
                     {HandleFunction('/assets/videos') && <div className='w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]'></div>}
                  </li>
                </ul>
              )}
            </li> */}
          <li
            className={`flex ${
              HandleFunction("/trade-shows") ? "bg-[#F6F6FF]" : ""
            } hover:bg-[#F6F6FF] cursor-pointer px-4 py-3 rounded-[10px] items-center gap-3`}
          >
            <Link
              href="/trade-shows"
              onClick={handleAside}
              className="flex gap-3 items-center w-[100%]"
            >
              <FaSitemap className="text-[#82838A]" />
              <span className="text-[#0A1215]">Tradeshow</span>
            </Link>
          </li>
          <li
            className={`flex ${
              HandleFunction("/reviews-and-ratings") ? "bg-[#F6F6FF]" : ""
            } hover:bg-[#F6F6FF] cursor-pointer px-4 py-3 rounded-[10px] items-center gap-3`}
          >
            <Link
              href="/reviews-and-ratings"
              onClick={handleAside}
              className="flex gap-3 items-center w-[100%]"
            >
              <FaStar className="text-[#82838A]" />
              <span className="text-[#0A1215]">Reviews and Ratings</span>
            </Link>
          </li>
          <li className="flex flex-col">
            <div
              className={`flex ${
                false ? "bg-[#F6F6FF]" : ""
              } hover:bg-[#F6F6FF] px-4 py-3 rounded-[10px]  items-center justify-between gap-3 cursor-pointer`}
              onClick={() => toggleSubMenu("menu")}
            >
              <div className="flex  items-center gap-3">
                <FaImages className="text-[#82838A]" />
                <span className="text-[#0A1215]">Menu</span>
              </div>
              {openMenu.menu ? (
                <FaChevronDown className="text-[#82838A]" />
              ) : (
                <FaChevronRight className="text-[#82838A]" />
              )}
            </div>
            {openMenu.menu && (
              <ul className="ml-12 mt-2  border-l-2 border-gray-2  space-y-2">
                <li
                  className={`${
                    HandleFunction("/menu/")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/menu/"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Gemstones
                  </Link>
                  {HandleFunction("/menu/") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/menu/")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/menu/"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Jewelry
                  </Link>
                  {HandleFunction("/menu/") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/menu/")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/menu/"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Drops & Beads
                  </Link>
                  {HandleFunction("/menu/") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/menu/")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/menu/"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Semi-Mounts
                  </Link>
                  {HandleFunction("/menu/") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/menu/")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/menu/"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Findings
                  </Link>
                  {HandleFunction("/menu/") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/menu/")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/menu/"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Gifts
                  </Link>
                  {HandleFunction("/menu/") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
                <li
                  className={`${
                    HandleFunction("/menu/")
                      ? "bg-[#F6F6FF] text-[#434CE7]"
                      : "text-[#0A1215]"
                  } cursor-pointer hover:text-[#434CE7] hover:bg-[#F6F6FF] relative px-4 py-2 rounded-[10px]   ml-3`}
                >
                  <Link
                    href="/menu/"
                    onClick={handleAside}
                    className="flex font-medium w-[100%]"
                  >
                    Custom Jewelry
                  </Link>
                  {HandleFunction("/menu/") && (
                    <div className="w-[2px] absolute top-0.5 -left-[14px] h-[35px] bg-[#434CE7]"></div>
                  )}
                </li>
              </ul>
            )}
          </li>
          <li
            className={`flex ${
              HandleFunction("/ticker") ? "bg-[#F6F6FF]" : ""
            } hover:bg-[#F6F6FF] cursor-pointer px-4 py-3 rounded-[10px] items-center gap-3`}
          >
            <Link
              href="/ticker"
              onClick={handleAside}
              className="flex gap-3 items-center w-[100%]"
            >
              <FaInfoCircle className="text-[#82838A]" />
              <span className="text-[#0A1215]">Ticker</span>
            </Link>
          </li>
          <li
            className={`flex ${
              HandleFunction("/custom-jewelry") ? "bg-[#F6F6FF]" : ""
            } hover:bg-[#F6F6FF] cursor-pointer px-4 py-3 rounded-[10px] items-center gap-3`}
          >
            <Link
              href="/custom-jewelry"
              onClick={handleAside}
              className="flex gap-3 items-center w-[100%]"
            >
              <FaGem className="text-[#82838A]" />
              <span className="text-[#0A1215]">Custom Jewelry</span>
            </Link>
          </li>
          <li
            className={`flex ${
              HandleFunction("/footer") ? "bg-[#F6F6FF]" : ""
            } hover:bg-[#F6F6FF] cursor-pinter px-4 py-3 rounded-[10px] items-center gap-3`}
          >
            <Link
              href="/footer"
              onClick={handleAside}
              className="flex gap-3 items-center w-[100%]"
            >
              <FaHome className="text-[#82838A]" />
              <span className="text-[#0A1215]">Footer</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Fixed Profile Section */}
      <div className="fixed bottom-0 left-0 right-auto bg-white w-[300px] p-5 border-t-[#EAECF0]  border-t-2  flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full">
            <img
              src="/images/avator.png"
              className="w-[40px] h-[40px] rounded-full"
              alt=""
            />
          </div>
          <div>
            <h3 className="font-semibold">Olivia Rhye</h3>
            <p className="text-sm text-gray-500">olivia@untitledui.com</p>
          </div>
        </div>
        <div>
          <MdSwitchLeft className="rotate-90 text-[#82838A] text-[18px]" />
        </div>
      </div>
    </>
  );
};

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative  w-[100%]  lg:left-0 lg:top-0  lg:h-[100vh] bg-gray-200 lg:shadow-lg ">
      {/* Mobile Sidebar */}
      <motion.aside
        className={`bg-white lg:hidden  shadow-lg p-5 fixed top-0  h-full w-[300px] z-50  lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  lg:z-auto`}
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <MenuItems handleAside={() => setSidebarOpen(false)} />
      </motion.aside>

      {/* Desktop Sidebar */}
      <motion.aside
        className={`bg-white hidden h-[100vh]  lg:block lg:fixed shadow-lg p-5 w-[300px]
          `}
      >
        <MenuItems handleAside={() => setSidebarOpen(false)} />
      </motion.aside>

      {/*  small screens Header */}
      <div className="w-[100%] border-b-2  h-[60px] p-3 fixed lg:hidden flex items-center top-0 left-0 right-0 z-40 bg-white">
        <button
          className=" p-3 text-black active:scale-95  text-[25px] "
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <CgMenuRightAlt />
        </button>
        <div className="flex items-center gap-3 p-y justify-start">
          <div className="h-[40px] w-[40px] rounded-full">
            <img
              src="/favicon.svg"
              alt=""
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
          <div className="flex items-start justify-start flex-col ">
            <h1 className="font-medium text-[16px]">honeycomb</h1>
            <p className="text-[12px] text-[#4A5367]">Content Management</p>
          </div>
        </div>
      </div>

      <div className="lg:px-2 lg:py-[10px] lg:mt-0 lg:ml-[300px]  mt-[60px] h-full w-[100%] lg:w-[calc(100vw-300px)] lg:h-[100vh] text-slate-900">
        <div className="bg-white lg:rounded-[10px] h-full w-[100%] lg:h-[calc(100vh-20px)] overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Clickable Overlay for Mobile View */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
