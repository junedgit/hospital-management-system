import { useState } from "react";
import { Link } from "react-router-dom";


export default function AdmissionNotePatient() {
  
  const EmptyStateIcon = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
      <path d="M60 20H40C33.373 20 28 25.373 28 32V60C28 66.627 33.373 72 40 72H60C66.627 72 72 66.627 72 60V32C72 25.373 66.627 20 60 20Z" fill="#E6FFFD" stroke="#4DC0B5" strokeWidth="2"/>
      <path d="M52 8H32C25.373 8 20 13.373 20 20V48C20 54.627 25.373 60 32 60H52C58.627 60 64 54.627 64 48V20C64 13.373 58.627 8 52 8Z" fill="#E6FFFD" stroke="#4DC0B5" strokeWidth="2"/>
      <path d="M30 28H46M30 36H42M30 44H38" stroke="#4DC0B5" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  
  const AddButton = ({ text }) => (
    <button className="flex items-center text-teal-500 font-medium cursor-pointer"
    onClick={() => setIsPopupOpen(true)}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      Add
    </button>
  );
  
  const SectionHeader = ({ title, onAdd }) => (
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-gray-600 font-medium uppercase text-sm">{title}</h3>
      <AddButton onClick={onAdd} />
    </div>
  );
  
  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <EmptyStateIcon />
      <p>{message}</p>
    </div>
  );
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  return (
    <div className="w-full h-full  flex bg-white flex-col">
      <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
        <div className="flex gap-2 items-center">
          <Link to={"/ip-dashboard"}>
            <img src="/images/Back.svg" alt="" />
          </Link>
          <h1 className="text-lg font-bold">Admission Note Patient name</h1>
        </div>
        <Link
          to={"/"}
          className="cursor-pointer bg-red-700 px-4 py-1 text-sm rounded-lg text-white"
        >
          Initiate Discharge
        </Link>
      </div>
      <div className="p-2 w-full bg-[#1D2739] text-[#D0D5DD] text-sm">
        <ul className="flex gap-3 list-disc list-inside">
          <li>MRN:123456789</li>
          <li>DOB:12/12/2025</li>
          <li>AGE:44Y</li>
          <li>PHONE:543541354654</li>
          <li>EMAIL:example@gmail.com</li>
          <li>
            <Link className="text-[#0D8E83]">
              Open patient record
              <span>
                <img className="inline ml-1" src="/images/arrow.svg" alt="" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="space-y-6 p-4 overflow-auto">
      {/* Vitals Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <SectionHeader title="VITALS" />
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-8 bg-cyan-50 text-xs font-medium text-gray-600">
            <div className="p-3">DATE & TIME</div>
            <div className="p-3">BLOOD PRESSURE</div>
            <div className="p-3">HEART RATE</div>
            <div className="p-3">TEMP</div>
            <div className="p-3">SPO2</div>
            <div className="p-3">HEIGHT</div>
            <div className="p-3">WEIGHT</div>
            <div className="p-3">BMI</div>
          </div>
          <EmptyState message="Vitals recorded will be displayed here" />
        </div>
      </div>

      {/* Lab Tests Section */}
      <div className="border border-gray-200 rounded-lg p-5">
        <SectionHeader title="LAB TESTS" />
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 bg-cyan-50 text-xs font-medium text-gray-600">
            <div className="p-3">DATE & TIME</div>
            <div className="p-3">TEST</div>
            <div className="p-3">STATUS</div>
            <div className="p-3">DONE ON</div>
          </div>
          <EmptyState message="Lab tests will be displayed here" />
        </div>
      </div>

      {/* Medications Section */}
      <div className="border border-gray-200 rounded-lg p-5">
        <SectionHeader title="MEDICATIONS" />
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-cyan-50 text-xs font-medium text-gray-600">
            <div className="p-3">DATE & TIME</div>
            <div className="p-3">DRUG</div>
            <div className="p-3">DURATION</div>
          </div>
          <EmptyState message="Lab tests will be displayed here" />
        </div>
      </div>

      {/* Observations & Notes Section */}
      <div className="border border-gray-200 rounded-lg p-5">
        <SectionHeader title="OBSERVATIONS & NOTES" />
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-cyan-50 text-xs font-medium text-gray-600">
            <div className="p-3">DATE & TIME</div>
            <div className="p-3">OBSERVATION/NOTE</div>
          </div>
          <EmptyState message="Lab tests will be displayed here" />
        </div>
      </div>
    </div>
    <VitalRecordsPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
const VitalRecordsPopup = ({ isOpen, onClose }) => {
    const [patientData, setPatientData] = useState({
      name: "Mr. Manoj Kumar",
      mrn: "1234567890",
      dob: "12/12/2025",
      age: "35Y",
      gender: "Male",
      phone: "1234567890",
      email: "1234567890",
    });
  
    const [vitals, setVitals] = useState({
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      spo2: '',
      height: '',
      weight: '',
      bmi: '--'
    });
    const handleInputChange = (field, value) => {
      const newData = { ...patientData, [field]: value };
  
      // Calculate BMI if height and weight are provided
      if (field === "height" || field === "weight") {
        if (newData.height && newData.weight) {
          const heightInMeters = parseFloat(newData.height) / 100;
          const weightInKg = parseFloat(newData.weight);
          if (heightInMeters > 0 && weightInKg > 0) {
            newData.bmi = (
              weightInKg /
              (heightInMeters * heightInMeters)
            ).toFixed(1);
          }
        }
      }
  
      setPatientData(newData);
    };
  
    
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Record Vitals</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <img src="/images/close.svg" alt="" />
            </button>
          </div>
  
          {/* Patient Info */}
          <div className="bg-gray-900 text-white p-4">
            <h3 className="font-medium mb-2">{patientData.name}</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">MRN:</span>
                {patientData.mrn}
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">DOB:</span>
                {patientData.dob}
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">Age:</span>
                {patientData.age}
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">Gender:</span>
                {patientData.gender}
              </div>
              <div className="flex items-center col-span-2">
                <span className="text-gray-400 mr-1">Phone:</span>
                {patientData.phone}
              </div>
              <div className="flex items-center col-span-3">
                <span className="text-gray-400 mr-1">Email:</span>
                {patientData.email}
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood pressure
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter"
                  value={vitals.bloodPressure}
                  onChange={(e) =>
                    handleInputChange("bloodPressure", e.target.value)
                  }
                  className="border rounded px-3 py-2 w-full text-gray-700"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                  mmHG
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heart Rate
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter"
                  value={vitals.heartRate}
                  onChange={(e) => handleInputChange("heartRate", e.target.value)}
                  className="border rounded px-3 py-2 w-full text-gray-700"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                  bpm
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter"
                  value={vitals.temperature}
                  onChange={(e) =>
                    handleInputChange("temperature", e.target.value)
                  }
                  className="border rounded px-3 py-2 w-full text-gray-700"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                  °F
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SPO2
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter"
                  value={vitals.spo2}
                  onChange={(e) => handleInputChange("spo2", e.target.value)}
                  className="border rounded px-3 py-2 w-full text-gray-700"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                  %
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter"
                    value={vitals.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    className="border rounded px-3 py-2 w-full text-gray-700"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                    cm
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter"
                    value={vitals.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="border rounded px-3 py-2 w-full text-gray-700"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                    kg
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BMI
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={vitals.bmi}
                  readOnly
                  className="border rounded px-3 py-2 w-full text-gray-500 bg-gray-100"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                  kg/m²
                </div>
              </div>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="flex space-x-2 p-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
              Save
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };