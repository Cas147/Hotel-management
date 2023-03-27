import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

// Redux & Actions
import { useAppDispatch, useAppSelector } from "@/utility/hooks"
import {handleLogout} from "@/src/redux/slices/user";

import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";
//images
import HotelIcon from "@/src/assets/icons/hotel.svg"
import hotelDash from "@/src/assets/icons/hotelDash.svg"

import {IHotels} from "@/src/redux/slices/hotels";
import {useRouter} from "next/router";

import {
 LogOut
} from "react-feather";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  id?: number
};

type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
  id?: number
};
const Sidebar = ({ open, navItems = defaultNavItems, setOpen}: Props) => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const hotels = useAppSelector(
    (state) => state?.hotels ?? {}
  ) as any

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  return (
    <div className="h-screen p-0 md:p-4">
      <div
        className={classNames({
          "flex fixed rounded-2xl flex-col justify-between shadow-lg": true, // layout
          "bg-indigo-100 text-zinc-50": true, // colors
          "md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true, // positioning
          "h-screen md:h-full w-[300px]": true, // for height and width
          "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
          "-translate-x-full ": !open, //hide sidebar to the left when closed
        })}
        ref={ref}
      >
        <nav className="md:sticky top-0 md:top-1">
          <Link href="/Home" className='flex items-center justify-center my-8'>
            <Image 
              src={HotelIcon}
              alt="logo icon"
              width={60}
              height={60}
            />
            <h1 className='text-purple-500 mx-4 text-2xl'>Travelers</h1>
          </Link>
          <ul className="py-2 flex flex-col gap-2">
            {navItems.map((item, index) => {
              return (
                <Link key={index} href={`${item.href}${id}`}>
                  <li
                    className={classNames({
                      "text-indigo-900 hover:bg-indigo-500 hover:text-white": true, //colors
                      "flex gap-4 items-center ": true, //layout
                      "transition-colors duration-300": true, //animation
                      "rounded-md p-2 mx-2": true, //self style
                    })}
                  >
                    {item.icon} {item.label}
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
        <div>
          <div 
            className="flex rounded-md p-2 m-2 cursor-pointer text-indigo-900 hover:bg-indigo-500 hover:text-white items-center"
            onClick={() => {
              router.push('/')
              dispatch(handleLogout())
            }}
            >
            <LogOut 
              className="w-6 h-6 mr-2"
            />
            {"Log out"}
          </div>
          {/* account  */}
          <div className="border-t border-t-indigo-800 p-4">
            <div className="flex gap-4 items-center">
              <Image
                src={hotelDash}
                height={36}
                width={36}
                alt="profile image"
                className="rounded-full"
              />
              <div className="flex flex-col ">
                <span className="text-indigo-900 my-0">{(hotels?.data || []).find((x:IHotels) => x.id === Number(id))?.name}</span>
                <Link href="/" className="text-indigo-500 text-sm">
                  View Hotel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
