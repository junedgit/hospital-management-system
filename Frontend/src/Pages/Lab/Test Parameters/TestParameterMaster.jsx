import { Link } from "react-router-dom"


export default function TestParameterMaster() {
  return (
    <div className="w-full h-full  flex bg-white flex-col">
    <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
      <h1 className="text-lg font-bold">Test Parameter Master</h1>
    </div>
    <div className="flex gap-4 p-4 text-gray-500 font-medium">
      <h3 className="text-base border-b-2 border-[#0D8E83] text-[#0D8E83]">
      Parameter 
      </h3>
      <h3 className="text-base ">Groups</h3>
    </div>
    <div className="bg-gray-100 p-4 py-2 flex flex-col gap-6 h-full">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="search flex items-center border-2 border-gray-400 px-3 py-1 rounded-lg bg-white">
            <input type="text" placeholder="Search" className="w-60 p-1 outline-0" />
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
        <Link to={"/add-parameter"} className="text-center p-3 bg-[#0D8E83] text-white text-sm rounded-lg">
          Add Parameter
        </Link>
      </div>
      <div className="h-full bg-white rounded-lg relative">
        <table className="w-full">
          <thead>
          <tr  className="flex justify-between px-4 py-2 bg-[#DEFCFA] rounded-t-lg text-sm text-[#05171AE5] uppercase font-semibold"> 
            <th>Parameter</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Normal Value</th>
            <th className="mr-14">Method</th>
          </tr>
          </thead>
          
        </table>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <img src="/images/EmptyDocuments.png" alt="" />
          <p>
          No referrals added yet 
          </p>
          <Link to={"/referral-form"} className="border-2 border-[#0D8E83] px-3 py-2 bg-[#DEFCFA] text-[#0D8E83] text-sm rounded-lg cursor-pointer">
          Add referrals
        </Link>
        </div>
      </div>
    </div>
  </div>
  )
}