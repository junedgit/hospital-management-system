import ReferralForm from '../../../Components/ReferralForm'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AddReferral = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmitSuccess = (response) => {
    console.log('Referral added successfully:', response);
    navigate('/referral');
  };

  return (
    <div className="w-full h-full flex bg-white flex-col">
      <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
        <h1 className="text-lg font-bold">Add Referral</h1>
        <div className="flex gap-4">
          <Link to={"/referral"} className='bg-[#F0F2F5] border border-gray-400 px-4 py-0.5 text-sm rounded-lg'>Cancel</Link>
          <button
            type="submit"
            form="referral-form"
            disabled={loading}
            className={`cursor-pointer ${loading ? 'bg-gray-400' : 'bg-[#0D8E83]'} px-4 py-1 text-sm rounded-lg text-white flex items-center`}
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Add
          </button>
        </div>
      </div>
      <div className="h-full p-4 bg-[#FDFDFE]">
        <ReferralForm id="referral-form" onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </div>
  )
}

export default AddReferral