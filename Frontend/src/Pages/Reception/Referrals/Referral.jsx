import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllReferrals } from "../../../api/receptionService";

const Referral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const response = await getAllReferrals();
      if (response && Array.isArray(response)) {
        setReferrals(response);
      } else {
        // If the response is not an array, initialize with empty array
        setReferrals([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching referrals:", err);
      setError("Failed to load referrals. Please try again.");
      setReferrals([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredReferrals = referrals.filter((referral) => {
    if (!searchTerm) return true;

    return (
      referral.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.phone?.includes(searchTerm) ||
      referral.referralCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="w-full h-full flex bg-white flex-col">
      <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
        <h1 className="text-lg font-bold">Referral</h1>
      </div>
      <div className="flex gap-4 p-4 text-gray-500 font-medium">
        <h3 className="text-base border-b-2 border-[#0D8E83] text-[#0D8E83]">
          Referral
        </h3>
        <h3 className="text-base">Referral type</h3>
      </div>
      <div className="bg-gray-100 p-4 py-2 flex flex-col gap-6 h-full">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="search flex items-center border-2 border-gray-400 px-3 py-1 rounded-lg bg-white">
              <input
                type="text"
                placeholder="Search"
                className="w-60 p-1 outline-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          <Link to={"/add-referral"} className="text-center p-3 bg-[#0D8E83] text-white text-sm rounded-lg">
            Add referrals
          </Link>
        </div>
        <div className="h-full bg-white rounded-lg relative">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0D8E83]"></div>
            </div>
          ) : filteredReferrals.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="flex justify-between px-4 py-2 bg-[#DEFCFA] rounded-t-lg text-sm text-[#05171AE5]">
                  <th className="w-1/5 text-left">Name</th>
                  <th className="w-1/5 text-left">Referral Type</th>
                  <th className="w-1/5 text-left">Referral Code</th>
                  <th className="w-1/5 text-left">Email</th>
                  <th className="w-1/5 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.map((referral) => (
                  <tr
                    key={referral._id}
                    className="flex justify-between px-4 py-3 border-b text-sm hover:bg-gray-50"
                  >
                    <td className="w-1/5">{referral.name}</td>
                    <td className="w-1/5">{referral.referralType}</td>
                    <td className="w-1/5">{referral.referralCode}</td>
                    <td className="w-1/5">{referral.email}</td>
                    <td className="w-1/5">{referral.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <img src="/images/EmptyDocuments.png" alt="" />
              <p>No referrals added yet</p>
              <Link to={"/add-referral"} className="border-2 border-[#0D8E83] px-3 py-2 bg-[#DEFCFA] text-[#0D8E83] text-sm rounded-lg cursor-pointer">
                Add referrals
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referral;
