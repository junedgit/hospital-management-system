import { Link } from 'react-router-dom'
import ViewReferralData from '../Components/ViewReferralData'

const ViewReferral = () => {
  return (
    <div className="w-full h-full  flex bg-white flex-col">
          <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
            <div className="flex gap-2 items-center">
            <Link to={"/referral-fill"}><img src="/images/Back.svg" alt="" /></Link>
            <h1 className="text-lg font-bold">View Referral</h1>
            </div>
            <div className="flex gap-4">
                <Link to={"/edit-referral"} className='cursor-pointer bg-[#0D8E83] px-4 py-1 text-sm rounded-lg text-white'>Edit</Link>
            </div>
          </div>
          <div className="h-full p-4 bg-[#FDFDFE]">
            <ViewReferralData/>
          </div>
        </div>
  )
}

export default ViewReferral