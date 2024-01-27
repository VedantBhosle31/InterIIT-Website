"use client";
import background from "@/assets/background.svg";
import Header from "@/components/Header";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAxios } from "@/utils/apiService";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ContentionStatusType, ContentionType } from "./contentionInterface";

const Contention = () => {
  const [token, setToken] = useState("");
  const [isContentionCreated, setIsContentionCreated] = useState(false);
  const [contentionData, setContentionData] = useState<ContentionType[]>([]);
  const [contentionApprovalStatus, setContentionApprovalStatus] = useState<
    ContentionStatusType[]
  >([]);
  const params = useSearchParams();
  const psId = params.get("id") ?? "";
  const psName = params.get("name") ?? "";

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
          axios.get("contention/all?id=" + psId).then((response) => {
            setIsContentionCreated(response.data.created);
            if (response.data.created) {
              setContentionData(response.data.contentionData);
              let contentionApprovalInitialStatus: ContentionStatusType[] = [];
              (response.data.contentionData as ContentionType[]).forEach(
                (item) => {
                  const contentionStatuses: ContentionStatusType[] =
                    item.contentions.map((contentionItem) => {
                      return {
                        contentionItemId: contentionItem.id,
                        status: "",
                      };
                    });
                  contentionApprovalInitialStatus = [
                    ...contentionApprovalInitialStatus,
                    ...contentionStatuses,
                  ];
                }
              );
              setContentionApprovalStatus(contentionApprovalInitialStatus);
            }
          });
        }
      });
    }
  }, []);

  const handleCreateContention = () => {
    const axios = getAxios(token);
    axios
      .post("contention/create", { psId: psId })
      .then((response) => {
        setIsContentionCreated(true);
        alert("Contentions are active.");
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  const handleSelectChange = (
    contentionItemId: string,
    approvalStatus: "APPROVED" | "REJECTED" | ""
  ) => {
    setContentionApprovalStatus((contentionApprovalStatus) => {
      return contentionApprovalStatus.map((item) => {
        if (item.contentionItemId === contentionItemId) {
          return {
            contentionItemId,
            status: approvalStatus,
          };
        } else return item;
      });
    });
  };

  const handleContentionApproval = (contentionItemId: string) => {
    const approvalStatus = contentionApprovalStatus.find(
      (x) => x.contentionItemId === contentionItemId
    )?.status;

    if (approvalStatus === "") {
      alert("Please select a valid input");
      return;
    } else {
      const axios = getAxios(token);
      axios
        .patch("contention/update", {
          contentionItemId: contentionItemId,
          approved: approvalStatus === "APPROVED" ? true : false,
        })
        .then(() => {
          alert("Contention Status Updated");
          window.location.reload();
          setIsContentionCreated(true);
        })
        .catch((err) => {
          alert("Error: " + err.message);
        });
    }
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
          <Header isAdmin={true} />
          <main className="px-4 py-4 mt-0 h-screen">
            <div className="flex items-center ml-4 mb-4 text-3xl mt-8 font-extrabold text-slate-800">
              Contentions - {psName}
            </div>
            {isContentionCreated ? (
              <div>
                {contentionData.map((item, key) => {
                  if (item.contentions.length === 0) return <></>;
                  else
                    return (
                      <div key={key}>
                        <h2 className="ml-4 mb-4 text-2xl font-extrabold text-slate-800">
                          {item.team}
                        </h2>
                        <div className="flex justify-start gap-3 mb-4">
                          {item.contentions.map((contention, n) => {
                            return (
                              <div
                                key={n}
                                className="bg-white p-4 rounded-md shadow-md w-1/2 cursor-pointer"
                              >
                                <h2 className="text-md font-semibold">
                                  Contention {n + 1}
                                </h2>
                                <p className="text-sm text-gray-600 font-bold py-2">
                                  Against: {contention.against}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {contention.description}
                                </p>
                                <div>
                                  <select
                                    className="text-gray-600 focus:bg-white placeholder-gray-600 w-1/2 px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    required
                                    value={
                                      contentionApprovalStatus.find(
                                        (x) =>
                                          x.contentionItemId === contention.id
                                      )?.status
                                    }
                                    onChange={(e) => {
                                      handleSelectChange(
                                        contention.id,
                                        e.target.value as
                                          | "APPROVED"
                                          | "REJECTED"
                                          | ""
                                      );
                                    }}
                                  >
                                    <option value=""></option>
                                    <option value="APPROVED">Approve</option>
                                    <option value="REJECTED">Reject</option>
                                  </select>
                                  <button
                                    onClick={(e) => {
                                      handleContentionApproval(contention.id);
                                    }}
                                    className="ml-4 mb-1 mt-2 bg-slate-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                          {item.contentions.length === 0 ? (
                            <h3 className="text-slate-800 font-bold ml-4">
                              No active contentions
                            </h3>
                          ) : null}
                        </div>
                      </div>
                    );
                })}
              </div>
            ) : (
              <div className="ml-4">
                <button
                  onClick={handleCreateContention}
                  className=" ml-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Start Contentions
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    );
};

export default Contention;
