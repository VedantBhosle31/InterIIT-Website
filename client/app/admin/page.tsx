"use client";
import background from "@/assets/background.svg";
import Header from "@/components/Header";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAxios } from "@/utils/apiService";
import Image from "next/image";
import PsGrid from "./psGrid";
export default function Home() {
  const [token, setToken] = useState("");
  const [psData, setPsData] = useState({});
  useEffect(() => {
    const tokenNew = localStorage.getItem("token") ?? "";
    if (tokenNew === "") {
      window.location.replace("/login");
    } else {
      const axios = getAxios(tokenNew);
      axios.get("iit/getUser").then((response) => {
        if (response.data.role !== "ADMIN") {
          window.location.replace("/dashboard");
        } else {
          setToken(tokenNew);
          axios.get("/ps/findall").then(function (response: any) {
            setPsData(response.data);
          });
        }
      });
    }
  }, []);
  if (token !== "")
    return (
      <div>
        <Image
          src={background}
          alt="background"
          className="fixed z-0 inset-0 object-cover w-full h-full"
        />
        <div className="relative z-2">
          <Header isAdmin={true} />
          <main className="px-4 py-4 mt-0 h-screen">
            <PsGrid psData={psData} />
          </main>
        </div>
      </div>
    );
}
