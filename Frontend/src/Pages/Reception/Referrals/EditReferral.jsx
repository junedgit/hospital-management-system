import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReferralForm from "../../../Components/ReferralForm";
import { Bounce, toast, ToastContainer } from "react-toastify";

const EditReferral = () => {
  const navigate = useNavigate();
  const notify = () =>
    toast.success("Referral Edited!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      onClose: () => {
        setTimeout(() => {
          navigate('/referral-fill');
        }, 500);
      }
    });
  return (
    <div className="w-full h-full  flex bg-white flex-col">
    <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
      <h1 className="text-lg font-bold">Edit Referral</h1>
      <div className="flex gap-4">
        <Link
          to={"/referral-fill"}
          className="bg-[#F0F2F5] border border-gray-400 px-4 py-0.5 text-sm rounded-lg"
        >
          Cancel
        </Link>
        <button
          onClick={notify}
          className="cursor-pointer bg-[#0D8E83] px-4 py-1 text-sm rounded-lg text-white"
        >
          Update
        </button>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Bounce} 
          
        />
      </div>
    </div>
    <div className="h-full p-4 bg-[#FDFDFE]">
      <ReferralForm />
    </div>
  </div>
  );
};

export default EditReferral;
