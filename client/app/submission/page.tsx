"use client";
import { useEffect, useState } from "react";
import background from "@/assets/background.svg";
import uploadFileToS3 from "@/utils/fileUpload";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getAxios } from "@/utils/apiService";
import SubmissionBox from "./submissionBox";

interface subResType {
  id: string;
  pSTeamId: string;
  time: string;
  submissionType: string;
  submissionURL: string;
  description: string;
}
interface time {
  midStart: string;
  midEnd: string;
  finalStart: string;
  finalEnd: string;
}

const Submission = () => {
  const [description, setDescription] = useState("");
  const [token, setToken] = useState<string>("");
  const [iitId, setIitId] = useState<string>("");
  const [time, setTime] = useState<time | {}>({});
  const [submissionDetails, setSubmissionDetails] = useState<{
    mid: subResType | null;
    final: subResType | null;
  }>();
  const [showPastSubmissions, setShowPastSubmissions] = useState(false);
  const params = useSearchParams();
  const psId = params.get("id") ?? "";
  const [isuploaded, setisuploaded] = useState(false);
  const [submissionType, setSubmissionType] = useState<"MID" | "FINAL" | "">(
    ""
  );
  const [fileUrl, setFileUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const tokenNew = localStorage.getItem("token") ?? "";
    if (tokenNew === "") {
      window.location.replace("/login");
    } else {
      const queryParams = new URLSearchParams({
        iitId: localStorage.getItem("iitId") ?? "",
        psId: psId,
      }).toString();
      const axios = getAxios(tokenNew);
      axios
        .get(`/submission/get?${queryParams}`, {
          data: { iitId: localStorage.getItem("iitId") ?? "", psId: psId },
        })
        .then((res: any) => {
          const newTime: time = {
            midStart: res.data.midStart,
            midEnd: res.data.midEnd,
            finalStart: res.data.finalStart,
            finalEnd: res.data.finalEnd,
          };
          setSubmissionDetails({ mid: res.data.mid, final: res.data.final });
          setSubmissionType(() => {
            const now = new Date();
            if (
              res.data.mid === null &&
              newTime.midStart !== null &&
              newTime.midEnd !== null &&
              now > new Date(newTime.midStart) &&
              now < new Date(newTime.midEnd)
            )
              return "MID";
            else if (
              res.data.final === null &&
              newTime.finalStart !== null &&
              newTime.finalEnd !== null &&
              now > new Date(newTime.finalStart) &&
              now < new Date(newTime.finalEnd)
            )
              return "FINAL";
            else return "";
          });
          setTime(newTime);
        })
        .catch((error: any) => {});
      setIitId(localStorage.getItem("iitId") ?? "");
      setToken(tokenNew);
    }
  }, []);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop() ?? "zip";
      const fileName = `${uuidv4()}.${fileType}`;
      try {
        const s3Url = await uploadFileToS3(
          selectedFile,
          `private/submissions/${iitId}/${psId}/${fileName}`
        );
        setFileUrl(s3Url);
        setisuploaded(true);
      } catch (error) {
        alert("Error uploading file: " + error);
        setisuploaded(false);
      }
    }
  };
  const handleSubmit = () => {
    if (submissionType == "") alert("Invalid Submission");
    else if (fileUrl === "") {
      alert("Please upload file");
    } else {
      if (
        confirm(
          "You are about to make submission for this PS. Once submitted, you cannot change it."
        )
      ) {
        const axios = getAxios(token);
        axios
          .post("/submission/create", {
            psId: psId,
            submissionType: submissionType,
            description: description,
            submissionURL: fileUrl,
          })
          .then((response: any) => {
            alert("Submitted Successfully");
            router.push("/dashboard");
          })
          .catch((error: any) => {
            alert("Unable to submit");
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
          <div className="flex items-center ml-4 mb-4 text-3xl mt-8 font-extrabold text-slate-800">
            Submissions
          </div>
          <button
            className="bg-slate-800 hover:bg-slate-700 font-bold text-white ml-5 mt-2 py-2 px-4 rounded-md"
            type="button"
            onClick={() => setShowPastSubmissions(!showPastSubmissions)}
          >
            {showPastSubmissions ? "Hide" : "View Past"} Submissions
          </button>
          {showPastSubmissions && (
            <div className="flex justify-items-center">
              {[submissionDetails?.mid, submissionDetails?.final].map((sub) => {
                if (sub !== null)
                  return (
                    <div className="w-[300px] h-[250px] bg-gray-100 p-4 m-4">
                      <span className="text-bold text-center">
                        {sub?.submissionType} SUBMISSION
                      </span>
                      <div className="m-2 p-2 bg-white min-h-[100px] max-h-[150px] rounded-md border-solid border-black overflow-y-scroll">
                        {sub?.description}
                      </div>
                      <a
                        href={sub?.submissionURL}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        View Submission
                      </a>
                    </div>
                  );
              })}
              {submissionDetails?.mid === null &&
                submissionDetails?.final === null && (
                  <div className="py-2 pl-5">None</div>
                )}
            </div>
          )}
          {submissionType !== "" && (
            <SubmissionBox
              description={description}
              setDescription={setDescription}
              handleFileUpload={handleFileUpload}
              isuploaded={isuploaded}
              handleSubmit={handleSubmit}
              submissionType={submissionType}
            />
          )}
        </div>
      </>
    );
};

export default Submission;
