import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";


const NewPatientRegistration = () => {
  const notify = () =>
      toast.success("Patient added!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  const [expandedSections, setExpandedSections] = useState({
    additionalDetails: false,
    payerDetails: false,
    kinDetails: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    referralType: 'internal Doctor',
    referralCode: '',
    address: '',
    city: '',
    state: 'Kerala',
    pinCode: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    setIsOpen(false);
  };
  return (
    <div className="w-full h-full  flex bg-white flex-col overflow-auto">
      <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
        <h1 className="text-lg font-bold">Patient Master</h1>
        <div className="">
        <Link className="px-2 py-1 border border-[#D0D5DD] bg-[#F0F2F5] text-sm rounded-lg">Cancel</Link>
        <Link className="px-2 py-1 border border-[#0D8E83] bg-[#DEFCFA] text-[#0D8E83] text-sm rounded-lg mx-2">Add & continue to schedule</Link>
        <Link onClick={notify} className="px-2 py-1 border bg-[#0D8E83] text-sm rounded-lg text-white">Add Patient</Link>
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
      <div className="w-full p-4 mx-auto">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-xs font-medium text-gray-700 uppercase">
            REGISTRATION INFO
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                MRN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="AP250000021"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                National ID/IQUMA no.
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="23456789"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Patient category <span className="text-red-500">*</span>
              </label>
              <select className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md">
                <option>Select</option>
                <option>Regular</option>
                <option>Emergency</option>
                <option>VIP</option>
              </select>
            </div>
          </div>
        </div>
        {/* Patient Info Section */}
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-xs font-medium text-gray-700 uppercase">
            PATIENT INFO
          </h2>
          <div className="flex mb-4">
            <div className="mr-6">
              <div className="w-24 h-24 border border-dashed border-blue-300 rounded flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="mt-1 text-xs text-blue-500">Upload</span>
                </div>
              </div>
            </div>

            <div className="flex-grow grid grid-cols-1 gap-4 md:grid-cols-4 items-end">
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <select className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md">
                  <option>Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Given name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                  placeholder="Enter"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Middle name
                </label>
                <input
                  type="text"
                  className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                  placeholder="Enter"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Family name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                  placeholder="Enter"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Grandfather name
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="Enter"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Date of birth
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="Enter"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md">
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Marital status
              </label>
              <select className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md">
                <option>Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="eg mail@mail.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="eg.0000000000"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="Enter"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                City/town
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="Enter"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Pin code
              </label>
              <input
                type="text"
                className="text-xs w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                placeholder="Enter"
              />
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="mb-4 border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection("additionalDetails")}
            className="flex items-center gap-2 w-full p-4 text-left bg-white "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform ${
                expandedSections.additionalDetails ? "rotate-0" : "-rotate-90"
              }`}
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
            <span className="text-xs font-medium text-gray-700">
              ADDITIONAL DETAILS
            </span>
          </button>
          {expandedSections.additionalDetails && (
            <div className="w-full bg-white p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm"
                    placeholder="Indian"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Ethnicity/Race
                  </label>
                  <select className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm">
                    <option>Dravidian</option>
                    <option>Indo-Aryan</option>
                    <option>Mongoloid</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Religion
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm"
                    placeholder="Hindu"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Blood group
                  </label>
                  <select className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm">
                    <option>A positive</option>
                    <option>A negative</option>
                    <option>B positive</option>
                    <option>B negative</option>
                    <option>AB positive</option>
                    <option>AB negative</option>
                    <option>O positive</option>
                    <option>O negative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm"
                    placeholder="Business"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Home phone
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm"
                    placeholder="2345678876"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    ID prof type
                  </label>
                  <select className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm">
                    <option>Select</option>
                    <option>Passport</option>
                    <option>Driver's License</option>
                    <option>National ID</option>
                    <option>Voter ID</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    ID no
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-blue-600"
                      placeholder="876543123456"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500">
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
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Passport number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-blue-600"
                      placeholder="7654312345"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500">
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
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Language
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm"
                    placeholder="Hindi"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Referred by
                  </label>
                  <select className="w-full px-3 py-2 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md text-sm">
                    <option>Internal doctor</option>
                    <option>External doctor</option>
                    <option>Self</option>
                    <option>Friend/Family</option>
                    <option>Insurance</option>
                  </select>
                </div>

                <div className="self-end">
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 pl-3 pr-10 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleSearchChange}
                        onFocus={() => setIsOpen(true)}
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={toggleDropdown}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        <div className="p-4 text-center">
                          <div className="flex justify-center mb-2">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-50">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-teal-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-1">
                            No referral found
                          </p>
                          <div className="text-sm">
                            Referral not found?
                            <button onClick={() => setIsOpenPopup(true)} className="cursor-pointer ml-1 text-teal-500 font-medium hover:text-teal-600">
                              Add new
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection("payerDetails")}
            className="flex items-center gap-2 w-full p-4 text-left bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform ${
                expandedSections.payerDetails ? "rotate-0" : "-rotate-90"
              }`}
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
            <span className="text-xs font-medium text-gray-700">
              PAYER DETAILS
            </span>
          </button>
          {/* {expandedSections.payerDetails && (
            <p className="text-xs text-gray-500">Payer details content</p>
        )} */}
        </div>

        <div className="mb-4 border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection("kinDetails")}
            className="flex items-center gap-2 w-full p-4 text-left bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform ${
                expandedSections.kinDetails ? "rotate-0" : "-rotate-90"
              }`}
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
            <span className="text-xs font-medium text-gray-700">
              NEXT TO KIN DETAILS
            </span>
          </button>
          {/* {expandedSections.kinDetails && (
            <p className="text-xs text-gray-500">Next of kin details content</p>
        )} */}
        </div>
      </div>
      <div className="flex flex-col items-center">
      {isOpenPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-full max-w-lg relative">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <span className="text-teal-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
                <h2 className="text-lg font-medium">Add referral</h2>
              </div>
              <button 
                onClick={() => setIsOpenPopup(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Form content */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-bold uppercase text-gray-700 mb-3">REFERRAL DETAILS</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Shain"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="SHarma"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm mb-1">
                      Referral type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="referralType"
                      value={formData.referralType}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="internal Doctor">internal Doctor</option>
                      <option value="external Doctor">external Doctor</option>
                      <option value="Patient">Patient</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Referral code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="0012"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold uppercase text-gray-700 mb-3">CONTACT DETAILS</h3>
                <div className="mb-4">
                  <label className="block text-sm mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="abcd street, xyz lane"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Ernakulam"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Kerala">Kerala</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Pin code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="123456"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="1234557890"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  onClick={() => setIsOpenPopup(false)}
                  className="cursor-pointer px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpenPopup(false)}
                  className="cursor-pointer px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );

};

export default NewPatientRegistration;
