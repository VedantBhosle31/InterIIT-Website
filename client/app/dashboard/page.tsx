"use client";
import background from "@/assets/background.svg";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAxios } from "@/utils/apiService";
import Image from "next/image";
export default function Home() {
  const [token, setToken] = useState("");
  const [psData, setPsData] = useState({});
  useEffect(() => {
    const tokenNew = localStorage.getItem("token") ?? "";
    if (tokenNew === "") {
      window.location.replace("/login");
    } else {
      setToken(tokenNew);
      const axios = getAxios(tokenNew);
      axios.get("/ps/findall").then(function (response: any) {
        setPsData(response.data);
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
          <Header isAdmin={false} />
          <main className="px-4 py-4 mt-0 h-screen">
            <ContentSection data={psData} />
          </main>
        </div>
      </div>
    );
}
