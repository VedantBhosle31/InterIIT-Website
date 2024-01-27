"use client";
// pages/index.tsx
import background from "@/assets/background.svg";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Button from "@/components/Button/Button";
import { v4 as uuidv4 } from "uuid";

import uploadFileToS3 from "@/utils/fileUpload";
const allowedFileTypes = ["png", "jpeg", "jpg"];

import { userDetailsType } from "../preview/page";
import Image from "next/image";
import { getAxios } from "@/utils/apiService";
import { AxiosStatic } from "axios";
import Confirm from "@/components/Confirm";

export interface participantType {
  name: string;
  email: string;
  phone: string;
  discordId: string;
  photo_url: string;
  idCardUrl: string;
  tshirt: string;
  foodPref: string;
}

interface leadsType {
  contingentLead: participantType;
  deputyContingentLead: participantType;
  deputyContingentLead2?: participantType;
  coCas: participantType;
}

const Home: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [token, setToken] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [iitId, setIitId] = useState<string>("");
  const handleOpen = () => setOpen(!open);
  let axios: AxiosStatic;

  const leadsText = [
    "Contingent Lead",
    "Deputy Contingent Lead",
    "Deputy Contingent Lead 2 (Optional)",
    "Technical Secretary",
  ];
  let [leadsPreviewText, setLeadsPreviewText] = useState([
    "Contingent Lead",
    "Deputy Contingent Lead",
    "Deputy Contingent Lead 2",
    "Technical Secretary",
  ]);
  useEffect(() => {
    const accessToken: string = localStorage.getItem("token") ?? "";
    axios = getAxios(accessToken);
    if (accessToken === "") {
      window.location.replace("/login");
    } else {
      setToken(accessToken);
    }
    axios.get("iit/getUser").then((response) => {
      if (response.data.contingentLeaderId != null) {
        setIsAdded(true);
      }
      setIitId(response.data.id);
    });
    let leadsUser: leadsType;

    if (isAdded) {
      axios.get("iit/getLeads").then(function (response) {
        delete response.data.coCas.id;
        delete response.data.contingentLead.id;
        delete response.data.deputyContingentLead.id;
        if (response.data.deputyContingentLead2 != null) {
          delete response.data.deputyContingentLead2.id;
        }
        leadsUser = response.data;
        let listOfParticipants: participantType[] = [
          leadsUser.contingentLead,
          leadsUser.deputyContingentLead,
          leadsUser.coCas,
        ];

        if (leadsUser.deputyContingentLead2 != null) {
          listOfParticipants.push(leadsUser.deputyContingentLead2);
          listOfParticipants[2] = leadsUser.deputyContingentLead2;
          listOfParticipants[3] = leadsUser.coCas;
        } else setLeadsPreviewText(["Contingent Lead", "Deputy Contingent Lead", "Technical Secretary"]);

        setParticipants(listOfParticipants);
      });
    }
  });
  const [participants, setParticipants] = useState<participantType[]>([
    {
      name: "",
      email: "",
      phone: "",
      discordId: "",
      photo_url: "",
      idCardUrl: "",
      tshirt: "",
      foodPref: "",
    },
    {
      name: "",
      email: "",
      phone: "",
      discordId: "",
      photo_url: "",
      idCardUrl: "",
      tshirt: "",
      foodPref: "",
    },
    {
      name: "",
      email: "",
      phone: "",
      discordId: "",
      photo_url: "",
      idCardUrl: "",
      tshirt: "",
      foodPref: "",
    },
    {
      name: "",
      email: "",
      phone: "",
      discordId: "",
      photo_url: "",
      idCardUrl: "",
      tshirt: "",
      foodPref: "",
    },
  ]);
  const validateLeads = (leadsEntered: participantType[]): boolean => {
    leadsEntered = [leadsEntered[0], leadsEntered[1], leadsEntered[3]];
    return leadsEntered.some((participant) =>
      Object.values(participant).some((value) => value === "")
    );
  };
  const handleFileUpload = async (
    index: number,
    field: string,
    leadName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant, i) =>
        i === index ? { ...participant, [field]: "" } : participant
      )
    );
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop() ?? "png";
      const fileName = `${uuidv4()}.${fileType}`;
      if (!allowedFileTypes.includes(fileType)) {
        alert("Invalid file type. Please upload a png or jpeg file");
      } else {
        try {
          const s3Url = await uploadFileToS3(
            selectedFile,
            `private/${iitId}/${leadName.replace(/\s/g, "")}/${fileName}`
          );
          setParticipants((prevParticipants) =>
            prevParticipants.map((participant, i) =>
              i === index ? { ...participant, [field]: s3Url } : participant
            )
          );
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    }
  };

  const handleParticipantChange = (
    index: number,
    field: string,
    value: string | File
  ) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (
      confirm(
        " Warning! You may not be able to make changes to this again. Are you sure you want to proceed?"
      )
    ) {
      if (validateLeads(participants)) {
        alert("Please fill details completely");
      } else {
        const leads: leadsType = {
          contingentLead: participants[0],
          deputyContingentLead: participants[1],
          deputyContingentLead2: participants[2],
          coCas: participants[3],
        };
        axios
          .post("/iit/addLeads", leads)
          .then(function (response) {
            alert("Leads added successfully");
            router.push("/dashboard");
          })
          .catch(function (error) {
            alert("Unable to Add Leads");
          });
      }
    }
  };

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
          <div className="container mx-auto mt-5 p-5">
            {!isAdded ? (
              <div className="flex items-center ml-4 mb-4 text-3xl mt-8 font-extrabold  text-slate-800">
                Add Leads
              </div>
            ) : (
              ""
            )}

            <div>
              {isAdded ? (
                <Suspense>
                  <div className="flex items-center ml-4 text-3xl mt-8 font-extrabold text-slate-800">
                    LEADS
                  </div>

                  <div className="p-4 grid grid-cols-4 gap-4">
                    {participants.map(
                      (participant: participantType, index: number) => (
                        <div
                          key={index}
                          className="mb-4 p-4 border rounded-lg bg-white shadow-lg"
                        >
                          <h2 className="font-semibold">
                            {" "}
                            {leadsPreviewText[index]}
                          </h2>
                          <p className="text-gray-700">
                            Name: {participant.name}
                          </p>
                          <p className="text-gray-700">
                            Email: {participant.email}
                          </p>
                          <p className="text-gray-700">
                            Discord Id: {participant.discordId}
                          </p>
                          <p className="text-gray-700">
                            T-Shirt Size: {participant.tshirt}
                          </p>
                          <p className="text-gray-700">
                            Phone: {participant.phone}
                          </p>
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
                </Suspense>
              ) : (
                <form>
                  {participants.map((participant, index) => (
                    <div
                      key={index}
                      className="ml-8 mr-8 mb-4 bg-white w-3/4 border rounded-lg p-4"
                    >
                      <h2 className="text-lg font-semibold">
                        {leadsText[index]}
                      </h2>
                      <div className="grid grid-cols-2">
                        <div className="mb-2">
                          <label
                            htmlFor={`name${index}`}
                            className="block text-sm font-medium"
                          ></label>
                          <input
                            placeholder="Name"
                            type="text"
                            id={`name${index}`}
                            name={`name${index}`}
                            value={participant.name}
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="text-black focus:bg-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            required
                          />
                        </div>
                        <div className="ml-8 mb-2">
                          <label
                            htmlFor={`email${index}`}
                            className="block text-sm font-medium"
                          ></label>
                          <input
                            placeholder="Institute Email Id"
                            type="email"
                            id={`email${index}`}
                            name={`email${index}`}
                            value={participant.email}
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "email",
                                e.target.value
                              )
                            }
                            className="text-black focus:bg-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4">
                        <div className="mb-2">
                          <label
                            htmlFor={`college${index}`}
                            className="block text-sm font-medium"
                          ></label>
                          <input
                            placeholder="Phone number"
                            type="text"
                            id={`phone${index}`}
                            name={`phone${index}`}
                            value={participant.phone}
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "phone",
                                e.target.value
                              )
                            }
                            className="text-black focus:bg-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            required
                          />
                        </div>
                        <div className="ml-8 mb-2">
                          <label
                            htmlFor={`discordID${index}`}
                            className="block text-sm font-medium"
                          ></label>
                          <input
                            placeholder="Discord ID"
                            type="text"
                            id={`discordID${index}`}
                            name={`discordID${index}`}
                            value={participant.discordId}
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "discordId",
                                e.target.value
                              )
                            }
                            className="text-black focus:bg-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            required
                          />
                        </div>
                        <div className="ml-8 mb-2">
                          <label
                            htmlFor={`tshirt${index}`}
                            className="block text-sm font-medium"
                          ></label>
                          <select
                            id={`tshirt${index}`}
                            name={`tshirt${index}`}
                            value={participant.tshirt}
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "tshirt",
                                e.target.value
                              )
                            }
                            className="text-gray-600 focus:bg-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            required
                          >
                            <option value="" disabled>
                              Select Tshirt Size
                            </option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                          </select>
                        </div>

                        <div className="ml-8 mb-2">
                          <label
                            htmlFor={`foodPref${index}`}
                            className="block text-sm font-medium"
                          ></label>
                          <select
                            id={`foodPref${index}`}
                            name={`foodPref${index}`}
                            value={participant.foodPref}
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "foodPref",
                                e.target.value
                              )
                            }
                            className="text-gray-600 focus:bg-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            required
                          >
                            <option value="" disabled>
                              Select Food Preference
                            </option>
                            <option value="Jain">Jain</option>
                            <option value="Veg">Veg</option>
                            <option value="Non Veg">Non Veg</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="pt-4 mb-2 mr-8">
                          <label
                            htmlFor={`photoURL${index}`}
                            className="mt-5 px-3 py-3 font-bold bg-slate-800 text-white rounded-md cursor-pointer"
                          >
                            Photograph
                          </label>
                          <input
                            type="file"
                            id={`photoURL${index}`}
                            name={`photoURL${index}`}
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(
                                index,
                                "photo_url",
                                leadsText[index],
                                e
                              )
                            }
                            className="px-4 py-2 mt-1 border bg-slate-900 hover:bg-slate-700 rounded-lg hidden"
                            required
                          />
                          {participant.photo_url !== "" ? (
                            <a
                              href={participant.photo_url}
                              className="pl-4 text-bold"
                              target="_blank"
                            >
                              Uploaded✅
                            </a>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="pt-4 mb-2">
                          <label
                            htmlFor={`idCardUrl${index}`}
                            className="mt-5 px-3 py-3 font-bold bg-slate-800 text-white rounded-md cursor-pointer"
                          >
                            ID Card
                          </label>
                          <input
                            type="file"
                            id={`idCardUrl${index}`}
                            name={`idCardUrl${index}`}
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(
                                index,
                                "idCardUrl",
                                leadsText[index],
                                e
                              )
                            }
                            className="px-4 py-2 mt-1 border rounded-lg hidden"
                            required
                          />
                          {participant.idCardUrl !== "" ? (
                            <a
                              href={participant.idCardUrl}
                              className="pl-4 text-bold"
                              target="_blank"
                            >
                              Uploaded✅
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="ml-8 mr-8 mb-4 p-4">
                    <button
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>

                  {/* <Confirm
                  open={open}
                  title="Warning!"
                  onClose={() => setOpen(false)}
                  onConfirm={handleSubmit}
                >
                  Warning! You may not be able to make changes to this again.
                  Are you sure you want to proceed?
                </Confirm> */}
                </form>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default Home;
