"use client";
import { useState, useEffect } from "react";
import background from "@/assets/background.svg";
import { getAxios } from "@/utils/apiService";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { participantType } from "../registration/page";
import Header from "@/components/Header";
import Image from "next/image";

export interface userDetailsType {
  psname: string;
  participants: participantType[];
}

export default function Preview() {
  const [participants, setParticipants] = useState<userDetailsType>();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const tokenNew = localStorage.getItem("token") ?? "";
    if (tokenNew === "") {
      window.location.replace("/login");
    } else {
      setToken(tokenNew);
      const storedJsonString = localStorage.getItem("userDetails") ?? "";
      const parsedData: userDetailsType = JSON.parse(storedJsonString);
      setParticipants(parsedData);
      parsedData.participants.map((item) => {});
    }
  }, []);

  const params = useSearchParams();
  const name = params.get("name") ?? "";
  const psId = params.get("id") ?? "";
  const noOfParticipants = Number(params.get("noOfParticipants")) ?? 0;

  const router = useRouter();
  let axios = getAxios(token);
  if (token !== "")
    return (
      <div>
        <Image
          src={background}
          alt="background"
          className="fixed z-0 inset-0 object-cover w-full h-full"
        />
        <div className="relative z-2">
          <Suspense>
            <Header isAdmin={false} />
            <div className="flex items-center ml-4 text-3xl mt-8 font-extrabold text-slate-800">
              {params.get("registered") === "true"
                ? `Registered Participants - ${name}`
                : `Preview Submission - ${name}`}
            </div>

            <div className="p-4 grid grid-cols-4 gap-4">
              {participants?.participants.map(
                (participant: participantType, index: any) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border rounded-lg bg-white shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {participant.name}
                    </h3>
                    <p className="text-gray-700">Email: {participant.email}</p>
                    <p className="text-gray-700">
                      Discord Id: {participant.discordId}
                    </p>
                    <p className="text-gray-700">
                      T-Shirt Size: {participant.tshirt}
                    </p>
                    <p className="text-gray-700">Phone: {participant.phone}</p>
                    <p className="text-gray-700">
                      Food Preference: {participant.foodPref}
                    </p>
                    <p className="text-gray-700">
                      ID Card:{" "}
                      {participant.idCardUrl !== "" ? (
                        <a
                          href={participant.idCardUrl}
                          className="underline text-blue-600"
                          target="_blank"
                        >
                          link
                        </a>
                      ) : (
                        "NA"
                      )}
                    </p>
                    <p className="text-gray-700">
                      Photo:{" "}
                      {participant.photo_url !== "" ? (
                        <a
                          href={participant.photo_url}
                          className="underline text-blue-600"
                          target="_blank"
                        >
                          link
                        </a>
                      ) : (
                        "NA"
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
            <div>
              <button
                className="ml-8 bg-slate-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() => {
                  if (params.get("registered") === "true")
                    router.push("/dashboard");
                  else
                    axios
                      .post("/psTeam/create", participants)
                      .then((data) => {
                        alert("Registered!");
                        router.push("/dashboard");
                      })
                      .catch((err) => {
                        alert("Unable to register for PS");
                      });
                }}
              >
                {params.get("registered") === "true" ? "OK" : "Submit"}
              </button>
              {params.get("registered") !== "true" ? (
                <button
                  className="ml-8 bg-slate-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.append("name", `${name}`);
                    params.append("id", `${psId}`);
                    params.append("noOfParticipants", `${noOfParticipants}`);
                    router.push(`/registration?${params.toString()}`);
                  }}
                >
                  Back
                </button>
              ) : (
                ""
              )}
            </div>
          </Suspense>
        </div>
      </div>
    );
}
