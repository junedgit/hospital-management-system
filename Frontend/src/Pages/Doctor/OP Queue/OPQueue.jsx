import { Link } from "react-router-dom";

export default function OPQueue() {
  const todayAppointments = [
    {
      mrn: "1234543243",
      name: "Arrav Sharma",
      age: "25Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "08:30am",
      status: "Completed",
    },
    {
      mrn: "5678623523",
      name: "Priya Desai",
      age: "54Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "09:30am",
      status: "Completed",
    },
    {
      mrn: "9876543210",
      name: "Rohan Patel",
      age: "98Y",
      gender: "Female",
      phoneNumber: "1234567890",
      time: "10:30am",
      status: "Awaiting",
    },
    {
      mrn: "1122334455",
      name: "Ananya Gupta",
      age: "32Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "11:00am",
      status: "Awaiting",
    },
    {
      mrn: "1122334455",
      name: "Ananya Gupta",
      age: "76Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "11:30am",
      status: "Awaiting",
    },
    {
      mrn: "1122334455",
      name: "Ananya Gupta",
      age: "44Y",
      gender: "Male",
      phoneNumber: "1234567890",
      time: "12:00pm",
      status: "Awaiting",
    },
  ];

  const futureAppointments = [
    {
      mrn: "1234543243",
      name: "Arrav Sharma",
      age: "25Y",
      gender: "Male",
      phoneNumber: "1234567890",
      date: "12/12/2024",
      time: "1234567890",
    },
    {
      mrn: "5678623523",
      name: "Priya Desai",
      age: "54Y",
      gender: "Male",
      phoneNumber: "1234567890",
      date: "18/01/2025",
      time: "1234567890",
    },
    {
      mrn: "9876543210",
      name: "Rohan Patel",
      age: "98Y",
      gender: "Female",
      phoneNumber: "1234567890",
      date: "02/02/2025",
      time: "1234567890",
    },
    {
      mrn: "1122334455",
      name: "Ananya Gupta",
      age: "32Y",
      gender: "Male",
      phoneNumber: "1234567890",
      date: "04/04/2025",
      time: "1234567890",
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
                            key === "status" && appointment[key] === "Completed"
                              ? "text-green-600"
                              : key === "status" &&
                                appointment[key] === "Awaiting"
                              ? "text-orange-600"
                              : key === "status" &&
                                appointment[key] === "Scheduled"
                              ? "text-blue-600"
                              : ""
                          }`}
                  >
                    <Link to={"/patient-record-medicalform"}>{appointment[key]}</Link>
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
        <h1 className="text-lg font-bold">OP Queue</h1>
      </div>

      <div className="bg-gray-100 p-4 flex flex-col gap-6 h-full">
        <div className="container mx-auto">
          {renderTable("Appointments for Today", todayAppointments, [
            "MRN",
            "Name",
            "Age",
            "Gender",
            "Phone Number",
            "Time",
            "Status",
          ])}
          {renderTable("Future Appointments", futureAppointments, [
            "MRN",
            "Name",
            "Age",
            "Gender",
            "Phone Number",
            "Date",
            "Time",
          ])}
        </div>
      </div>
    </div>
  );
}
