import { Link } from "react-router-dom";
import PatientProfile from "../../../Components/PatientProfile";
export default function PatientRecord() {
  return (
    <div className="w-full h-full  flex bg-white flex-col">
          <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
            <div className="flex gap-2 items-center">
            <Link to={"/patient-master"}><img src="/images/Back.svg" alt="" /></Link>
            <h1 className="text-lg font-bold">Patient name</h1>
            </div>
            <div className="flex gap-4">
                <Link to={"/admit-patient"} className='cursor-pointer px-4 py-1 text-sm rounded-lg  border border-[#0D8E83] bg-[#DEFCFA] text-[#0D8E83]'>Admit patient</Link>
                <Link to={"/book-appoinment"} className='cursor-pointer bg-[#0D8E83] px-4 py-1 text-sm rounded-lg text-white'>Book Appointment</Link>
            </div>
          </div>
          <div className="h-full p-4 bg-[#FDFDFE]">
            <PatientProfile/>
          </div>
        </div>
  )
}