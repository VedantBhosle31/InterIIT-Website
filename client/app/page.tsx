"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image"; // Import from 'next/image'
import home from "@/assets/landingpage.svg";
import Logo from "@/assets/logo_dark.svg";
import LandingPageBar from "@/components/LandingPageBar";
import LandingPageSlider from "@/components/LandingPageSlider";
import "./styles.css";

const Home = () => {
  const about = () => {
    return (
      <div className="flex justify-center mt-[5vh]  mb-4">
        <div className="max-w-4xl p-6 border rounded-xl shadow border-gray-700 bg-slate-800">
          <div className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white">
            About
          </div>
          <div className="flex justify-between font-normal text-black text-justify text-white">
            The InterIIT Tech Meet is the annual technology competition between
            the IITs, being organized by IIT Madras this year. At InterIIT, we
            believe in supporting and promoting the continuous need for
            technological advancement and human growth through fresh new
            perspectives, creative thinking, and innovative solutions. IIT
            Madras is proud to host the 12th edition of InterIIT Tech Meet in
            December{"'"}23.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative app-main">
      {/* <Image src={home} alt="bg" className="w-[100vw] absolute -z-10" /> */}
      <div className="">
        <LandingPageBar />
        <div className="flex justify-center mt-[1vh] min-h-[50vh] md:min-h-[90vh] ml-[4vw] mr-[4vw]">
          <Image src={Logo} alt="bg" />
        </div>
        <div className="px-4 py-5 text-lg">{about()}</div>
        {/* <div className="flex justify-center md:py-5">
          <div className="grid grid-cols-1 gap-4 content-center md:py-5">
            <div className="  text-5xl text-center py-5">
              SPONSORS
            </div>
            <div className="h-1/4">
              <LandingPageSlider />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
