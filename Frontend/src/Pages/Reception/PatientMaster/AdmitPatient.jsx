import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AdmitPatient = () => {
  const navigate = useNavigate();
  const notify = () =>
    toast.success("Patient admited!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      onClose: () => {
        setTimeout(() => {
          navigate("/patient-master");
        }, 500);
      },
    });
  const [formData, setFormData] = useState({
    admissionDate: "12/12/2024",
    admissionTime: "12:00",
    admittingDoctor: "",
    reasonForAdmission: "",
    ward: "",
    roomType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full h-full  flex flex-col">
      <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
        <div className="flex gap-2 items-center">
          <Link to={"/patient-master"}>
            <img src="/images/Back.svg" alt="back" />
          </Link>
          <h1 className="text-lg font-bold">Patient name</h1>
        </div>
        <div className="flex gap-4">
          <Link
            to={"/patient-record"}
            className="cursor-pointer px-4 py-1 text-sm rounded-lg  border"
          >
            Cancel
          </Link>
          <button
            onClick={notify}
            className="cursor-pointer bg-[#0D8E83] px-4 py-1 text-sm rounded-lg text-white"
          >
            Admit
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
        <div className="w-full mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Admission Details Section */}
            <div className="mb-6 border rounded-lg p-4 shadow-sm">
              <h2 className="text-gray-700 font-semibold mb-4 uppercase text-sm">
                Admission Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm mb-1">
                    Admission date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="admissionDate"
                      value={formData.admissionDate}
                      onChange={handleChange}
                      className="w-full border rounded p-2 pr-8 custom-date"
                    />
                    <div className="absolute right-2 top-2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Admission Time */}
                <div>
                  <label className="block text-sm mb-1">
                    Admission time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="admissionTime"
                      value={formData.admissionTime}
                      onChange={handleChange}
                      className="w-full border rounded p-2 pr-8"
                    />
                    <div className="absolute right-2 top-2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Admitting Doctor */}
                <div>
                  <label className="block text-sm mb-1">
                    Admitting doctor <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="admittingDoctor"
                      value={formData.admittingDoctor}
                      onChange={handleChange}
                      className="w-full border rounded p-2 pr-8 appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="dr-smith">Dr. Smith</option>
                      <option value="dr-johnson">Dr. Johnson</option>
                      <option value="dr-williams">Dr. Williams</option>
                    </select>
                    <div className="absolute right-2 top-2 text-gray-400 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Reason for Admission */}
                <div>
                  <label className="block text-sm mb-1">
                    Reason for admission <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="reasonForAdmission"
                    value={formData.reasonForAdmission}
                    onChange={handleChange}
                    placeholder="Enter"
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
            </div>

            {/* Bed Assignment Section */}
            <div className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-gray-700 font-semibold mb-4 uppercase text-sm">
                Bed Assignment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Ward */}
                <div>
                  <label className="block text-sm mb-1">Ward</label>
                  <input
                    type="text"
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    placeholder="Enter"
                    className="w-full border rounded p-2"
                  />
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm mb-1">Room type</label>
                  <div className="relative">
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full border rounded p-2 pr-8 appearance-none"
                    >
                      <option value="">Enter</option>
                      <option value="private">Private</option>
                      <option value="semi-private">Semi-Private</option>
                      <option value="general">General</option>
                    </select>
                    <div className="absolute right-2 top-2 text-gray-400 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    type="button"
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 rounded p-2"
                  >
                    Search for available rooms
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmitPatient;
