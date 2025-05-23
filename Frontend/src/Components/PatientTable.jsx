import React from 'react';
import { Link } from 'react-router-dom';

const PatientTable = () => {
  const patients = [
    { mrn: '12345432343', name: 'Array Sharma', age: '25Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '5678623523', name: 'Priya Desai', age: '54Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '9876543210', name: 'Rohan Patel', age: '98Y', gender: 'Female', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '1122334455', name: 'Ananya Gupta', age: '32Y', gender: 'Male', phone: '1234567890', appointmentActive: false, admissionActive: true },
    { mrn: '7777777777', name: 'Vikram Singh', age: '76Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '8888888888', name: 'Nisha Mehta', age: '44Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '0000000000', name: 'Sonia Choudhary', age: '21Y', gender: 'Female', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '7777777777', name: 'Vikram Singh', age: '76Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '8888888888', name: 'Nisha Mehta', age: '44Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '0000000000', name: 'Sonia Choudhary', age: '21Y', gender: 'Female', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '7777777777', name: 'Vikram Singh', age: '76Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '8888888888', name: 'Nisha Mehta', age: '44Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '0000000000', name: 'Sonia Choudhary', age: '21Y', gender: 'Female', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '7777777777', name: 'Vikram Singh', age: '76Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '8888888888', name: 'Nisha Mehta', age: '44Y', gender: 'Male', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '0000000000', name: 'Sonia Choudhary', age: '21Y', gender: 'Female', phone: '1234567890', appointmentActive: true, admissionActive: true },
    { mrn: '1111111111', name: 'Aarav Kumar', age: '63Y', gender: 'Male', phone: '1234567890', appointmentActive: false, admissionActive: true } 
  ];

  return (
    <div className="rounded-lg h-3/4 overflow-auto">
      <table className="w-full bg-white rounded-lg">
          <thead className="bg-[#DEFCFA]">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">MRN</th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">NAME</th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">AGE</th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">GENDER</th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">PHONE NUMBER</th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ACTION</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
           {patients.map((patient, index) => (
             <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{patient.mrn}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700"><Link to={"/patient-record"}>{patient.name}</Link></td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{patient.age}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{patient.gender}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{patient.phone}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm">
                  <div className="flex space-x-2 items-center">
                    <Link to={"/"} className={`px-3 py-1 rounded ${patient.appointmentActive ? 'text-[#0D8E83]' : 'text-gray-400'}`}>
                      Appointment
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link to={"/"} className="px-3 py-1 text-[#0D8E83] rounded">
                      Admission
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default PatientTable;