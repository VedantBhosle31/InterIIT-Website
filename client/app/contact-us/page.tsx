import React from "react";
import LandingPageBar from "@/components/LandingPageBar";
import { contactDetails } from "./contactDetails";
import "./styles.css";
import Image from "next/image";

const MeetTeam = () => {
  return (
    <div className="relative content-main">
      <div className="z-10">
        <LandingPageBar />
      </div>

      <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-16 xl:px-24 mt-8">
        {contactDetails.map((vertical) => (
          <div key={vertical.vertical} className="mb-5 text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-800 p-2 rounded-md">
              {vertical.vertical}
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {vertical.heads.map((head) => (
                <div
                  key={head.name}
                  className="bg-white text-slate-800 p-6 mx-8 rounded-md shadow-md flex flex-col items-center mb-4 hover:text-white hover:bg-slate-800"
                >
                  <Image
                    // src="https://media.istockphoto.com/id/1484179548/photo/black-man-counseling-and-psychology-consulting-for-therapy-mental-healthcare-or-support-happy.jpg?s=1024x1024&w=is&k=20&c=38wmDPvhR4-csZd1HZ8qhbryOxa5oVCN21F0NcIkA4k="
                    src={head.photo}
                    alt={head.name}
                    width={500}
                    height={500}
                    className="w-64 h-64 mb-2 rounded-md"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{head.name}</h3>
                    <p className="text-sm">{head.phone}</p>
                    <p className="text-sm">{head.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTeam;
