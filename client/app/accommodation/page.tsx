"use client";
import { useEffect, useState } from "react";
import background from "@/assets/background.svg";
import Header from "@/components/Header";
import Image from "next/image";
import { getAxios } from "@/utils/apiService";
import {
  AccommodationDataType,
  TeamMemberType,
  parseAccommodationData,
} from "./dataParser";

const Accommodation = () => {
  const [token, setToken] = useState<string>("");
  const [iitId, setIitId] = useState<string>("");
  const [accommodationData, setAcommadationData] = useState<
    AccommodationDataType[]
  >([]);

  useEffect(() => {
    const tokenNew = localStorage.getItem("token") ?? "";
    if (tokenNew === "") {
      window.location.replace("/login");
    } else {
      setIitId(localStorage.getItem("iitId") ?? "");
      setToken(tokenNew);
      const axios = getAxios(tokenNew);
      axios
        .get("iit/getUser")
        .then((userData) => {
          axios
            .get("ps/findAll")
            .then((psData) => {
              const psTeams = userData.data.ps_teams.map(
                (psTeam: any) => psTeam.id
              );
              axios
                .post("accommodation/findAll", {
                  psTeams: psTeams,
                })
                .then((accData) => {
                  setAcommadationData(
                    parseAccommodationData(
                      psData.data,
                      userData.data,
                      accData.data
                    )
                  );
                })
                .catch((err) => {
                  alert("Error Fetching Accommodation Preferences");
                });
            })
            .catch((err) => {
              alert("Error Fetching PS Data");
            });
        })
        .catch((err) => {
          alert("Error Fetching User Data");
        });
    }
  }, []);

  // const handleSelectChange = (
  //   type: "startDate" | "endDate" | "sex",
  //   psTeamId: string,
  //   memId: string,
  //   value: string,
  //   accommodation: boolean
  // ) => {
  //   if (!accommodation) return;
  //   setAcommadationData((accommodationData) => {
  //     return accommodationData.map((ps) => {
  //       if (ps.psTeamId === psTeamId) {
  //         const members = ps.teamMembers.map((member) => {
  //           if (member.id === memId) {
  //             member[type] = value;
  //           }
  //           return member;
  //         });
  //         ps.teamMembers = members;
  //         return ps;
  //       } else return ps;
  //     });
  //   });
  // };

  // const handleUpdate = () => {
  //   const axios = getAxios(token);
  //   axios
  //     .post("accommodation/update", { accommodationData })
  //     .then((res) => {
  //       alert("Accommodation Preferences Updated Successfully");
  //     })
  //     .catch((err) => {
  //       alert("Error Updating Accommodation Preferences");
  //     });
  // };

  if (token !== "")
    return (
      <>
        <Image
          src={background}
          alt="background"
          className="fixed z-0 inset-0 object-cover w-full h-full"
        />
        <div className="relative z-2">
          <Header isAdmin={false} />
          <div className="flex items-center ml-4 mb-4 text-3xl mt-8 font-extrabold text-slate-800">
            Accommodation
          </div>
          <div className="flex">
            <div className="w-3/4">
              <div className="flex items-center ml-8 text-md text-slate-800">
                The final list of participants that need accommodation for each
                PS.
              </div>
            </div>
            <div className="w-1/4 flex justify-evenly content-center">
              {/* <button
                type="button"
                onClick={() => handleUpdate()}
                className="h-[40px] mr-4 ml-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded items-center"
              >
                Update
              </button> */}
            </div>
          </div>
          <div>
            {accommodationData.map((data, key) => {
              return (
                <div key={key}>
                  <div className="flex items-center ml-8 mb-4 text-xl mt-4 font-extrabold text-slate-800">
                    {data.psName}
                  </div>
                  <div className="ml-8 mr-8 mb-4 w-3/4 bg-white border rounded-lg p-4">
                    <div>
                      <div className="flex flex-row">
                        <div className="basis-1/4 text-bold text-slate-800">
                          Name
                        </div>
                        {/* <div className="basis-1/4 text-bold text-slate-800 text-center">
                          Accommodation
                        </div> */}
                        <div className="basis-1/4 text-bold text-slate-800 text-center">
                          Sex
                        </div>
                        <div className="basis-1/4 text-bold text-slate-800 text-center">
                          Start Date
                        </div>
                        <div className="basis-1/4 text-bold text-slate-800 text-center">
                          End Date
                        </div>
                      </div>
                      {data.teamMembers
                        .filter((member) => member.accommodation)
                        .map((member: TeamMemberType, n) => {
                          return (
                            <div key={n} className="flex flex-row py-1">
                              <div className="basis-1/4 text-slate-800">
                                {member.name}
                              </div>
                              {/* <div className="basis-1/4 text-slate-800 text-center">
                                <input
                                  type="checkbox"
                                  checked={member.accommodation}
                                  // onChange={(e) =>
                                  //   handleAccommodationChecked(
                                  //     data.psTeamId,
                                  //     member.id,
                                  //     e.target.checked
                                  //   )
                                  // }
                                />
                              </div> */}
                              <div className="basis-1/4 text-slate-800 text-center">
                                <span>{member.sex}</span>
                                {/* <select
                                className="border-2 rounded w-[120px]"
                                value={member.sex}
                                onChange={(e) => {
                                  handleSelectChange(
                                    "sex",
                                    data.psTeamId,
                                    member.id,
                                    e.target.value,
                                    member.accommodation
                                  );
                                }}
                              >
                                <option value=""></option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                              </select> */}
                              </div>
                              <div className="basis-1/4 text-slate-800 text-center">
                                <span>{member.startDate}</span>
                                {/* <select
                                className="border-2 rounded w-[120px]"
                                value={member.startDate}
                                onChange={(e) => {
                                  handleSelectChange(
                                    "startDate",
                                    data.psTeamId,
                                    member.id,
                                    e.target.value,
                                    member.accommodation
                                  );
                                }}
                              >
                                <option value="17/12/2023">17/12/2023</option>
                                <option value="18/12/2023">18/12/2023</option>
                              </select> */}
                              </div>
                              <div className="basis-1/4 text-slate-800 text-center">
                                <span>{member.endDate}</span>
                                {/* <select
                                className="border-2 rounded w-[120px]"
                                value={member.endDate}
                                onChange={(e) => {
                                  handleSelectChange(
                                    "endDate",
                                    data.psTeamId,
                                    member.id,
                                    e.target.value,
                                    member.accommodation
                                  );
                                }}
                              >
                                <option value="22/12/2023">22/12/2023</option>
                                <option value="23/12/2023">23/12/2023</option>
                              </select> */}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
};

export default Accommodation;
