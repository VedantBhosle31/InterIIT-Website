"use client";
import background from "@/assets/background.svg";
import Header from "@/components/Header";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAxios } from "@/utils/apiService";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface UnavailableContention {
  against: string;
  description: string;
  status: string;
}

const Contention = () => {
  const params = useSearchParams();
  const psId = params.get("id") ?? "";
  const name = params.get("name") ?? "";
  const [token, setToken] = useState("");
  const [psTeamId, setPsTeamId] = useState<string>("");
  const [availableContentions, setAvailableContentions] = useState<string[]>(
    []
  );
  const [unavailableContentions, setUnavailableContentions] = useState<
    UnavailableContention[]
  >([]);
  const [opponents, setOpponents] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [selectedOpponent, setSelectedOpponent] = useState<string>("");
  useEffect(() => {
    const tokenNew = localStorage.getItem("token") ?? "";
    if (tokenNew === "") {
      window.location.replace("/login");
    } else {
      setToken(tokenNew);
      const axios = getAxios(tokenNew);
      axios.get("/iit/getUser").then(function (response: any) {
        const iitId = response.data.id;
        const psTeams = response.data.ps_teams;
        const thisPsTeam = psTeams.find((psTeam: any) => psTeam.ps_id === psId);
        if (thisPsTeam === undefined) {
          alert("You are not registered for this PS");
          window.location.replace("/dashboard");
        } else {
          // console.log(thisPsTeam);
          const thisPsTeamId = thisPsTeam.id;
          setPsTeamId(thisPsTeamId);
          axios
            .get("/contention?id=" + thisPsTeamId)
            .then((res) => {
              // console.log(res.data);
              const parsedAvailableContentions =
                res.data.availableContentions.map((item: any) => item.id);
              setAvailableContentions(parsedAvailableContentions);
              setUnavailableContentions(res.data.unavailableContentions);
            })
            .catch((err) => {
              // console.log(err);
            });
          axios
            .get("/iit/opponents?id=" + iitId)
            .then((res) => {
              setOpponents(res.data);
            })
            .catch((err) => {
              // console.log(err);
            });
        }
      });
    }
  }, []);

  const raiseContention = () => {
    if (selectedOpponent === "") {
      alert("Please select whon to raise contention against");
      return;
    } else if (description === "") {
      alert("Please enter a description");
      return;
    }
    const contentionPayload = {
      contentionItemId: availableContentions[0],
      against: selectedOpponent,
      description: description,
    };
    const axios = getAxios(token);
    axios
      .post("/contention/raise", contentionPayload)
      .then((res) => {
        alert("Contention raised successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert("Error in raising contention");
      });
  };

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
            <div className="flex items-center ml-4 mb-4 text-3xl mt-8 font-extrabold text-slate-800">
              Contentions - {name}
            </div>
            <div className="my-6 mx-4">
              <span className="text-bold p-2 my-2 bg-slate-800 text-white rounded">
                Available Contentions - {availableContentions.length}
              </span>
              {availableContentions.length > 0 ? (
                <div className="my-6 p-4 bg-gray-100 rounded-lg shadow-md w-[600px]">
                  <select
                    className="text-gray-600 bg-white shadow-md placeholder-gray-600 w-1/2 px-2 py-2.5 my-2 text-base border-transparent rounded-lg focus:bg-gray-200"
                    value={selectedOpponent}
                    onChange={(e) => {
                      setSelectedOpponent(e.target.value);
                    }}
                  >
                    <option value="">Contention Against</option>
                    {opponents.map((opponent) => (
                      <option key={opponent} value={opponent}>
                        {opponent}
                      </option>
                    ))}
                  </select>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your contention here"
                    className="w-full mt-1 p-2 border rounded-md shadow-md resize-none"
                  />
                  <button
                    onClick={raiseContention}
                    className="mt-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Submit Contention
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <span className="ml-4 mb-4 text-xl mt-8 font-extrabold text-slate-800">
                Other Contentions
              </span>
              <div className="my-6 mx-4">
                {unavailableContentions.map((item) => (
                  <div
                    key={item.against}
                    className="my-3 p-4 bg-gray-100 rounded-lg shadow-md w-[600px]"
                  >
                    <div className="text-md font-bold">
                      {item.against} - {item.status}
                    </div>
                    <div className="text-gray-600">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
};

export default Contention;
