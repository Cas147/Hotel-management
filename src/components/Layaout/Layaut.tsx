import {useRouter} from "next/router";
import React, { PropsWithChildren, useState, FC, ReactNode } from "react";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";
import {BookOpen} from "react-feather";
import CreateBookingModal from "@/pages/Bookings/createBooking";

interface LayoutProps {
  children: ReactNode,
  title?: string
}

const Layout:FC<LayoutProps> = ({children, title = ""}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className="w-screen flex bg-slate-50">

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="w-full flex flex-col align-middle justify-center">
        <div className="mt-4 px-4 md:px-8">
          <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} title={title}/>
        </div>
        {children}
      </div>
      <button 
        className={`float bg-purple-500`}
        onClick={() => {
          setOpenModal(true)
        }}
        >
          <BookOpen size={24}/>
      </button>
      <CreateBookingModal showModal={openModal} setShowModal={setOpenModal} value={null}/>
    </div>
  );
};

export default Layout;
