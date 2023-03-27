import {useRouter} from "next/router";
import React from "react";
import {
  Calendar,
  BookOpen,
  Grid,
  Home,
  Users,
} from "react-feather";
import { NavItem } from "./SideBar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: `/Hotels/`,
    icon: <Home className="w-6 h-6" />,
  },
  {
    label: "Customers",
    href: `/Customers/`,
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "Bookings",
    href: `/Bookings/`,
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    label: "Rooms",
    href: `/Rooms/`,
    icon: <Grid className="w-6 h-6" />,
  },
];
