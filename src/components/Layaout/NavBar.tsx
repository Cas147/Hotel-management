import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import { Menu } from "react-feather";
import classNames from "classnames";

//images
import UserIcon from "@/src/assets/icons/user.svg"

//hooks
import {useAppDispatch, useAppSelector} from "@/utility/hooks";

//Redux
import {handleLogout} from "@/src/redux/slices/user";


type Props = {
  onMenuButtonClick(): void
  title: string
};

const Navbar = (props: Props) => {
  const dispatch = useAppDispatch()
  
  const store = useAppSelector(
    (state) => state?.user ?? {}
  ) as any
  return (
   <nav className="flex items-center justify-between h-12">
    <div className="font-bold text-3xl">
      {props.title}
    </div>
    <div className="flex h-full rounded-l-2xl w-3/12 md:w-5/12 shadow-lg">
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex items-center shadow-2xl h-full mx-4">
        <Image
          src={UserIcon}
          height={36}
          width={36}
          alt="profile image"
          className="rounded-full hidden md:block"
        />
        <span className="text-indigo-900 my-0 ml-4 text-2xl">{store.userName}</span>
      </div>
    </div>
   </nav>
  );
};

export default Navbar;