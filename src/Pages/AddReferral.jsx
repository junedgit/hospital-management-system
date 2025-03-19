import ReferralForm from '../Components/ReferralForm'
import { Link } from 'react-router-dom'

const AddReferral = () => {
  return (
    <div className="w-full h-full  flex bg-white flex-col">
    <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
      <h1 className="text-lg font-bold">Add Referral</h1>
      <div className="flex gap-4">
          <Link to={"/"} className='bg-[#F0F2F5] border border-gray-400 px-4 py-0.5 text-sm rounded-lg'>Cancel</Link>
          <Link to={"/referral-fill"} className='cursor-pointer bg-[#0D8E83] px-4 py-1 text-sm rounded-lg text-white'>Add</Link>
      </div>
    </div>
    <div className="h-full p-4 bg-[#FDFDFE]">
      <ReferralForm/>
    </div>
  </div>
  )
}

export default AddReferral