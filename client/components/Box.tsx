import { getAxios } from "@/utils/apiService";
interface BoxProps {
  name: string;
  ps_id: string;
  description: string;
  isRegistered: string;
  noOfParticipants: number;
}
import { useRouter } from "next/navigation";
export default function Box({
  name,
  description,
  ps_id,
  isRegistered,
  noOfParticipants,
}: BoxProps) {
  let router = useRouter();
  let accessToken = localStorage.getItem("token") ?? "";
  const axios = getAxios(accessToken);

  const handleContentionClick = () => {
    const params = new URLSearchParams();
    params.append("id", `${ps_id}`);
    params.append("name", `${name}`);
    router.push(`contention?${params.toString()}`);
  };
  const handlesubmit = () => {
    const params = new URLSearchParams();
    params.append("id", `${ps_id}`);
    router.push(`submission?${params.toString()}`);
  };
  const handleClick = async () => {
    localStorage.setItem("ps_id", ps_id);
    if (isRegistered === "true") {
      await axios
        .get("/iit/getTeamMembers", {
          params: {
            ps_id: ps_id,
          },
        })
        .then(function (response) {
          const myObject: any = {
            psname: ps_id,
            participants: response.data.team_members,
          };
          const jsonString = JSON.stringify(myObject);
          localStorage.setItem("userDetails", jsonString);
          const params = new URLSearchParams();
          params.append("registered", "true");
          params.append("name", `${name}`);
          router.push(`preview?${params.toString()}`);
        });
    } else {
      const params = new URLSearchParams();
      params.append("id", `${ps_id}`);
      params.append("noOfParticipants", `${noOfParticipants}`);
      params.append("name", `${name}`);
      router.push(`/registration?${params.toString()}`);
    }
  };
  let buttonText = isRegistered === "true" ? "View" : "Register";
  return (
    <div className="bg-white p-4 rounded-md shadow-md m-2">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <button
        className="bg-slate-800 hover:bg-slate-700 text-white mt-2 py-2 px-4 rounded-md"
        onClick={handleClick}
      >
        Team
      </button>
      <button
        className="ml-2 bg-slate-800 hover:bg-slate-700 text-white mt-2 py-2 px-4 rounded-md"
        onClick={handlesubmit}
      >
        Submission
      </button>
      <button
        className="ml-2 bg-slate-800 hover:bg-slate-700 text-white mt-2 py-2 px-4 rounded-md"
        onClick={handleContentionClick}
      >
        Contentions
      </button>
    </div>
  );
}
