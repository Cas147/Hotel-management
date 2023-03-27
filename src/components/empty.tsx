import React, {useState, FC } from "react";
import Image from "next/image";

//images
import DataIcon from "@/src/assets/icons/data.svg"

interface LayoutProps {}

const Empty:FC<LayoutProps> = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image 
        src={DataIcon}
        alt="No data image"
        width={72}
        height={72}
      />
      <h2 className="font-bold text-2xl mt-8 ">There are not data to be shown</h2>
      <p className="font-light">Starting digitalizing your business with traveler</p>
    </div>
  );
};

export default Empty;
