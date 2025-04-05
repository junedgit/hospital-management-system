import { Link } from "react-router-dom";

export default function IpCareManagement() {
  const todayAppointments = [
    {
      mrn: "1234543243",
      ipNumber: "1234543243",
      name: "Arrav Sharma",
      age: "25Y",
      gender: "Male",
      phoneNumber: "1234567890",
      Admitedby: "Dr. Karan Verma",
      bed:"Room 11 - Bed 4",
    },
    {
      mrn: "5678623523",
      ipNumber: "5678623523",
      name: "Priya Desai",
      age: "54Y",
      gender: "Male",
      phoneNumber: "1234567890",
      Admitedby: "Dr. Karan Verma",
      bed:"Room 11 - Bed 4",
    },
    {
      mrn: "9876543210",
      ipNumber: "9876543210",
      name: "Rohan Patel",
      age: "98Y",
      gender: "Female",
      phoneNumber: "1234567890",
      Admitedby: "Dr. Karan Verma",
      bed:"Room 11 - Bed 4",
    },
    {
      mrn: "1122334455",
      ipNumber: "1122334455",
      name: "Ananya Gupta",
      age: "32Y",
      gender: "Male",
      phoneNumber: "1234567890",
      Admitedby: "Dr. Karan Verma",
      bed:"Room 11 - Bed 4",
    },
    {
      mrn: "1122334455",
      ipNumber: "1122334455",
      name: "Ananya Gupta",
      age: "76Y",
      gender: "Male",
      phoneNumber: "1234567890",
      Admitedby: "Dr. Karan Verma",
      bed:"Room 11 - Bed 4",
    },
    {
      mrn: "1122334455",
      ipNumber: "1122334455",
      name: "Ananya Gupta",
      age: "44Y",
      gender: "Male",
      phoneNumber: "1234567890",
      Admitedby: "Dr. Karan Verma",
      bed:"Room 11 - Bed 4",
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
                    <Link to={"/admission-note"}>
                      {appointment[key]}
                    </Link>
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
        <h1 className="text-lg font-bold">IP care management</h1>
      </div>

      <div className="bg-gray-100 p-4 flex flex-col gap-6 h-full">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="search flex items-center border-2 border-gray-400 px-3 py-1 rounded-lg bg-white">
              <input
                type="text"
                placeholder="Search"
                className="w-60 outline-0 p-1"
              />
              <button className="cursor-pointer">
                <img
                  className="w-5 h-4 object-cover"
                  src="/images/search icon.svg"
                  alt=""
                />
              </button>
            </div>
            <div className="search flex items-center border-2 border-gray-400 px-3 py-1 rounded-lg bg-white">
              <input
                type="text"
                placeholder="MRN "
                className="w-60 outline-0 p-1"
              />
              <button className="cursor-pointer">
                <img
                  className="w-5 h-4 object-cover"
                  src="/images/search icon.svg"
                  alt=""
                />
              </button>
            </div>
            <button className="flex items-center border-2 px-3 py-1 border-gray-400 rounded-lg gap-1 font-semibold cursor-pointer">
              <img
                className="w-5 h-4 object-cover"
                src="/images/Leading icon.svg"
                alt=""
              />
              Filter
            </button>
          </div>
        </div>
        <div className="rounded-lg h-3/4 overflow-auto">
          <div className="container mx-auto">
            {renderTable("", todayAppointments, [
              "MRN",
              "IP Number",
              "Name",
              "Age",
              "Gender",
              "Phone Number",
              "Admited by",
              "Bed",
            ])}
          </div>
        </div>
      </div>
    </div>
  );
}
