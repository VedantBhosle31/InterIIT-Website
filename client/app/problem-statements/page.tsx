import React from "react";
import LandingPageBar from "@/components/LandingPageBar";
import {
  highPrepPsDetails,
  lowPrepPsDetails,
  midPrepPsDetails,
} from "./psDetails";
import PSBox from "./PSBox";
import "./styles.css";

const Ps = () => {
  return (
    <div className="ps-main">
      <div>
        <div>
          <LandingPageBar />
        </div>
        <div className="">
          <div className="flex justify-center mt-[5vh]">
            <div className="text-4xl text-slate-800 text-bold">
              Problem Statements
            </div>
          </div>
          <div>
            <div className="text-2xl text-slate-800 text-bold py-4 text-center lg:text-left lg:px-8">
              High Prep
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-4">
              {highPrepPsDetails.map((ps, n) => (
                <PSBox desc={ps.desc} file={ps.file} image={ps.image} key={n} />
              ))}
            </div>
          </div>
          <div>
            <div className="text-2xl text-slate-800 text-bold py-4 text-center lg:text-left lg:px-8">
              Mid Prep
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-4">
              {midPrepPsDetails.map((ps, n) => (
                <PSBox desc={ps.desc} file={ps.file} image={ps.image} key={n} />
              ))}
            </div>
          </div>
          <div>
            <div className="text-2xl text-slate-800 text-bold py-4 text-center lg:text-left lg:px-8">
              Low Prep
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-4">
              {lowPrepPsDetails.map((ps, n) => (
                <PSBox
                  desc={ps.desc}
                  file={ps.file}
                  image={ps.image}
                  key={n}
                  smallLogo={ps.smallLogo ?? false}
                  width={ps.width ?? 200}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ps;
