import { useState } from "react";
import { Link } from "react-router-dom";

export default function OpAssessment() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const todayAppointments = [
    {
      mrn: "1234543243",
      name: "Arrav Sharma",
      Consultedby: "Dr. Karan Verma",

      age: "25Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "08:30am",
      status: "Recorded",
    },
    {
      mrn: "5678623523",
      name: "Priya Desai",
      Consultedby: "Dr. Karan Verma",

      age: "54Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "09:30am",
      status: "Recorded",
    },
    {
      mrn: "9876543210",
      name: "Rohan Patel",
      Consultedby: "Dr. Karan Verma",

      age: "98Y",
      gender: "Female",
      phoneNumber: "1234567890",
      time: "10:30am",
      status: "Recorded",
    },
    {
      mrn: "1122334455",
      name: "Ananya Gupta",
      Consultedby: "Dr. Karan Verma",
      age: "32Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "11:00am",
      status: "Pending",
    },
    {
      mrn: "1122334455",
      name: "Ananya Gupta",
      Consultedby: "Dr. Karan Verma",

      age: "76Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "11:30am",
      status: "Pending",
    },
    {
      mrn: "1122334455",
      name: "Ananya Gupta",
      Consultedby: "Dr. Karan Verma",

      age: "44Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "12:00pm",
      status: "Pending",
    },
  ];
  const renderTable = (title, appointments, columns) => (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-4 text-gray-700">{title}</h2>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider bg-[#DEFCFA] "
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {Object.keys(appointment).map((key) => (
                  <td
                    key={key}
                    className={`px-6 py-3 whitespace-nowrap text-sm text-gray-900 
                              ${
                                key === "status" &&
                                appointment[key] === "Recorded"
                                  ? "text-green-600"
                                  : key === "status" &&
                                    appointment[key] === "Pending"
                                  ? "text-orange-600"
                                  : ""
                              }`}
                  >
                    <button onClick={() => setIsPopupOpen(true)}>
                      {appointment[key]}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  return (
    <div className="w-full h-full  flex bg-white flex-col">
      <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
        <h1 className="text-lg font-bold">OP Assessment</h1>
      </div>

      <div className="bg-gray-100 p-4 flex flex-col gap-6 h-full">
        <div className="container mx-auto">
          {renderTable("Appointments for Today", todayAppointments, [
            "MRN",
            "Name",
            "Consulting Dr.",
            "Age",
            "Gender",
            "Phone Number",
            "Time",
            "Status",
          ])}
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
