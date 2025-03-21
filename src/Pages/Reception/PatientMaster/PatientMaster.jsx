import { Link } from "react-router-dom";
import PatientTable from "../../../Components/PatientTable";

const PatientMaster = () => {
  return (
    <div className="w-full h-full  flex bg-white flex-col">
          <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
            <h1 className="text-lg font-bold">Patient Master</h1>
            <button>New patient registration</button>
          </div>
          <div className="flex gap-4 p-4 text-gray-500 font-medium">
            <h3 className="text-base border-b-2 border-[#0D8E83] text-[#0D8E83]">
            Out Patient
            </h3>
            <h3 className="text-base">In Patient</h3>
          </div>
          <div className="bg-gray-100 p-4 flex flex-col gap-6 h-full">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="search flex items-center border-2 border-gray-400 px-3 py-1 rounded-lg bg-white">
                  <input type="text" placeholder="Search" className="w-60 outline-0 p-1" />
                  <button className="cursor-pointer">
                    <img
                      className="w-5 h-4 object-cover"
                      src="/images/search icon.svg"
                      alt=""
                    />
                  </button>
                </div>
                <div className="search flex items-center border-2 border-gray-400 px-3 py-1 rounded-lg bg-white">
                  <input type="text" placeholder="Search" className="w-60 outline-0 p-1" />
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
              <Link
                to={"/add-referral"}
                className="text-center p-3 bg-[#0D8E83] text-white text-sm rounded-lg"
              >
                Add referrals
              </Link>
            </div>
            <div className="h-full">
              <PatientTable/>
            </div>
          </div>
        </div>
  );
};

export default PatientMaster;
