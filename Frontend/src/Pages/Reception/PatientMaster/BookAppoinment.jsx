import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const BookAppoinment = () => {
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
  const [date, setDate] = useState("12/12/2024");
  const [department, setDepartment] = useState("");

  // Sample departments
  const departments = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Orthopedics" },
    { id: 4, name: "Pediatrics" },
    { id: 5, name: "Dermatology" },
  ];

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
            className="cursor-pointer px-4 py-1 text-sm rounded-lg  border border-[#0D8E83] bg-[#DEFCFA] text-[#0D8E83]"
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
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1 text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded w-full pr-10 custom-date"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="department" className="mb-1 text-gray-700">
              Department
            </label>
            <div className="relative">
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded w-full appearance-none pr-10"
              >
                <option value="">Select</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <button
              className="px-4 py-1 cursor-pointer rounded hover:bg-emerald-100 transition-colors border border-[#0D8E83] bg-[#DEFCFA] text-[#0D8E83]"
            >
              Show available doctors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppoinment;
