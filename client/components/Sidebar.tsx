import React, { useState, useEffect } from "react";
import { getAxios } from "@/utils/apiService";

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [feeApproved, setFeeApproved] = useState<string>("");
  const [feeToBePaid, setFeeToBePaid] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    const axios = getAxios(token);
    axios.get("iit/getUser").then(function (response: any) {
      setFeeApproved(response.data.feeApproved ?? "");
      setFeeToBePaid(response.data.feeToBePaid ?? "");
      localStorage.setItem("iitId", response.data.id ?? "");
    });
  }, []);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-gray-100 transform ${
        isOpen ? "translate-x-0" : "translate-x-64"
      } transition-transform ease-in-out duration-300`}
    >
      <div className="p-4">
        {/* Your sidebar content goes here */}

        <div className="flex justify-between">
          <h2 className="text-xl font-semibold ">Payment Status</h2>

          <button
            onClick={onClose}
            className="bg-red-500 text-white px-2 rounded-md"
          >
            X
          </button>
        </div>
        <div>
          {/* <p className="mt-5 pt-5">Fee to be paid : {feeToBePaid}</p> */}
          <p className="mt-5 pt-5">Fee Approved : {feeApproved}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
