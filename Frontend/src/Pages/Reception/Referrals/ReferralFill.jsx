import { Link } from "react-router-dom";

const ReferralFill = () => {
  return (
    <div className="w-full h-full  flex bg-white flex-col">
          <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
            <h1 className="text-lg font-bold">Referral</h1>
          </div>
          <div className="flex gap-4 p-4 text-gray-500 font-medium">
            <h3 className="text-base border-b-2 border-[#0D8E83] text-[#0D8E83]">
              Referral
            </h3>
            <h3 className="text-base ">Referral type</h3>
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
            <div className="h-full bg-white rounded-lg relative">
              <table className="w-full">
                <tr className="flex justify-between px-4 py-2 bg-[#DEFCFA] rounded-t-lg text-sm text-[#05171AE5]">
                  <th>Name</th>
                  <th>Referral Type</th>
                  <th>Referral Code</th>
                  <th>Speciality</th>
                  <th>Email</th>
                  <th className="mr-16">Phone</th>
                  <th></th>
                </tr>
                <Link to={"/view-referral"}><tr className="flex justify-between px-4 py-2 text-gray-500">
                  <td>John Doe</td>
                  <td>General Practitioner</td>
                  <td>REF12345</td>
                  <td>Cardiology</td>
                  <td>johndoe@example.com</td>
                  <td>123-456-7890</td>
                  <td>
                    <Link to={"/edit-referral"} className="cursor-pointer">
                      <img src="/images/pen.svg" alt="" />
                    </Link>
                  </td>
                </tr></Link>
              </table>
            </div>
          </div>
        </div>
  );
};

export default ReferralFill;
