"use client";
// pages/index.tsx
import background from "@/assets/background.svg";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { userDetailsType } from "../preview/page";
import Image from "next/image";
import uploadFileToS3 from "@/utils/fileUpload";
import { v4 as uuidv4 } from "uuid";

const allowedFileTypes = ["png", "jpeg", "jpg"];
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

const nameRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const phoneRegex = /^[0-9]{10}$/;

const Home: React.FC = () => {
  const [token, setToken] = useState("");
  const params = useSearchParams();
  const noOfParticipants = Number(params.get("noOfParticipants")) ?? 0;
  const psId = params.get("id") ?? "";
  const name = params.get("name") ?? "";
  const router = useRouter();
  const [iitId, setIitId] = useState<string>("");
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
  ]);

  useEffect(() => {
    const tokenNew = localStorage.getItem("token") ?? "";
    if (tokenNew === "") {
      window.location.replace("/login");
    } else {
      setToken(tokenNew);
      setIitId(localStorage.getItem("iitId") ?? "");
      const storedJsonString = localStorage.getItem("userDetails") ?? "";
      if (storedJsonString !== "") {
        const parsedData: userDetailsType = JSON.parse(storedJsonString);
        if (psId === parsedData.psname)
          setParticipants((participants) => {
            return parsedData.participants;
          });
      }
    }
  }, [psId]);
  const handleRemoveParticipant = (indexToRemove: number) => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleAddParticipant = () => {
    if (participants.length < noOfParticipants) {
      setParticipants([
        ...participants,
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
    }
  };

  const handleParticipantChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant
      )
    );
  };

  const handleFileUpload = async (
    index: number,
    field: string,
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
            `private/${iitId}/${psId}/${fileName}`
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

  const handleSubmit = (e: React.FormEvent) => {
    const hasInvalidFields = participants.some((participant) =>
      Object.entries(participant).some(([key, value]) => {
        if (key === "name") {
          return !nameRegex.test(value);
        }
        if (key === "email") {
          return !emailRegex.test(value);
        }
        if (key === "phone") {
          return !phoneRegex.test(value);
        }
        // Handle additional fields and regex patterns here if needed
        return false; // Default case
      })
    );
    if (
      participants.some((participant) =>
        Object.values(participant).some((value) => value === "")
      )
    ) {
      alert("Please fill all the participants' details completely");
    } else if (hasInvalidFields) {
      alert(
        "Please fill all the fields correctly. Check the name, email and phone of one or more participants."
      );
    } else {
      const ps_id = localStorage.getItem("ps_id") ?? "";
      e.preventDefault();
      const myObject: any = {
        psname: ps_id,
        participants: participants,
      };
      const params = new URLSearchParams();
      params.append("name", `${name}`);
      params.append("id", `${psId}`);
      params.append("noOfParticipants", `${noOfParticipants}`);
      const jsonString = JSON.stringify(myObject);
      localStorage.setItem("userDetails", jsonString);
      router.push(`/preview?${params.toString()}`);
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
          <div className="container mx-auto mt-5">
            <div className="flex items-center ml-4 mb-4 text-3xl mt-8 font-extrabold text-slate-800">
              Participants Form - {name}
            </div>
            <form>
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="ml-8 mr-8 mb-4 bg-white w-3/4 border rounded-lg p-4"
                >
                  <h2 className="text-lg font-semibold">
                    Participant {index + 1}
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
                          handleParticipantChange(index, "name", e.target.value)
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
                          handleFileUpload(index, "photo_url", e)
                        }
                        className="px-4 py-2 mt-1 border rounded-lg hidden"
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
                          handleFileUpload(index, "idCardUrl", e)
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
                  {index != 0 ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveParticipant(index)}
                      className="px-4 py-2 font-bold mt-4 bg-red-500 text-white rounded-lg"
                    >
                      Remove Participant
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              <div className="flex mb-5 pb-5">
                {participants.length < noOfParticipants ? (
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="ml-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Add Participant
                  </button>
                ) : (
                  ""
                )}
                <button
                  onClick={handleSubmit}
                  className=" ml-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default Home;
