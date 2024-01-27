"use client";
import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import background from "@/assets/background.svg";
import logo from "@/assets/logo_dark.svg";
import Image from "next/image";
import LandingPageBar from "@/components/LandingPageBar";
import { Button } from "@material-tailwind/react";

export default function Home() {
  const apiUrl: string = String(process.env.API_URL);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    await axios
      .post(`${apiUrl}/auth/login`, params)
      .then(function (response: any) {
        localStorage.clear();
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("name", username);
        if (response.data.role === "PARTICIPANT") router.push("/dashboard");
        else router.push("/admin");
      })
      .catch(function (response: any) {
        alert("Invalid username or password");
      });
  };
  return (
    <div>
      <Image
        src={background}
        alt="background"
        className="absolute z-0 inset-0 object-cover w-full h-full"
      />
      <div className="flex flex-col h-screen relative z-2">
        <LandingPageBar />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">
            InterIIT Tech Meet 12.0
          </h1>
          <p className="text-2xl mb-4 text-slate-800">Hosted by IIT Madras</p>

          <form className="bg-white border border-black shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
            {/*px - horizontal padding */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow-lg  border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleLogin}
                className=" bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
