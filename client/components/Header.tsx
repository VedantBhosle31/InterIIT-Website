"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/logo_light.svg";
import Image from "next/image";
import Button from "./Button/Button";

const parseStringWithUnderscore = (inputString: string) =>
  inputString
    .split("_")
    .map((word, index) => {
      if (index === 0) {
        return word.toUpperCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join(" ");

const Header = ({ isAdmin }: { isAdmin: boolean }) => {
  const [headerName, setHeaderName] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const name = localStorage.getItem("name") ?? "Inter IIT Tech Meet";
    setHeaderName(parseStringWithUnderscore(name));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleAccommodation = () => {
    router.push("/accommodation");
  };
  const handleAddLead = () => {
    router.push("/leads");
  };
  return (
    <div className="relative">
      <div className="bg-slate-800 py-2 flex justify-items-center">
        <div className="ml-4 w-[100px]">
          <Image
            className="hover:cursor-pointer"
            src={logo}
            alt="TechMeetLogo"
            width={50}
            height={50}
            onClick={() => {
              if (isAdmin) router.push("/admin");
              else router.push("/dashboard");
            }}
          />
        </div>
        <div className="font-bold text-3xl text-white text-center w-[100%]">
          {headerName}
        </div>
        {isAdmin ? (
          <>
            <div
              className="bg-white rounded-md font-bold mx-2 px-2 py-1 text-lg cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </>
        ) : (
          <div
            className="bg-white rounded-md font-bold mx-4 px-2 py-1 text-lg cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            Menu
          </div>
        )}
      </div>
      {isMenuOpen && (
        <div className="absolute top-0 right-0 mr-[20px] mt-[60px] bg-white rounded-md py-1 px-2">
          <div className="py-1">
            <Button
              className="text-white bg-slate-800 hover:bg-slate-600 font-bold py-2 px-2 rounded-md"
              onClick={handleAccommodation}
            >
              Accommodation
            </Button>
          </div>
          <div className="py-1">
            <Button
              className="text-white bg-slate-800 hover:bg-slate-600 font-bold py-2 px-2 rounded-md"
              onClick={handleAddLead}
            >
              Leads
            </Button>
          </div>
          <div className="py-1">
            <Button
              className="text-white bg-slate-800 hover:bg-slate-600 font-bold py-2 px-2 rounded-md"
              onClick={toggleSidebar}
            >
              Payment Status
            </Button>
          </div>
          <div className="py-1">
            <Button
              onClick={handleLogout}
              className="text-white bg-slate-800 hover:bg-slate-600 font-bold py-2 px-2 rounded-md"
            >
              Log out
            </Button>
          </div>
        </div>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}></Sidebar>
    </div>
  );
};

export default Header;
