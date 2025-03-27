import { Link } from "react-router-dom";

export default function Service() {
  const patient = {
    id: '1234567890',
    title: 'Mr.',
    firstName: 'Manoj',
    lastName: 'Kumar',
    dob: '12/12/1998',
    age: '27 Y',
    gender: 'Male',
    phone: '1234567890',
    email: 'alpha@mail.com',
  };
  return (
    <div className="w-full h-full  flex flex-col">
      <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-bold">Services</h1>
        </div>
      </div>
      <div className="w-full h-full p-4 relative">

       <div className="flex gap-4">
       <div className="w-1/3 relative">
          <input
            type="text"
            className="w-full px-3 py-2 pl-3 pr-10 border border-[#D0D5DD] bg-[#F7F9FC] rounded-md"
            placeholder="MRN"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
          <button 
          className="bg-[#0D8E83] px-4 py-1 text-sm rounded-lg text-white"
          >search</button>
       </div>
       {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <img src="/images/EmptyDocuments.png" alt="" />
          <p>
          search for patient 
          </p>
          
        </div>  */}
        <div className="flex items-start gap-4 my-6">
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <img 
            src="/api/placeholder/96/96" 
            alt="Patient" 
            className="w-full h-full object-cover bg-gray-500"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">{patient.title} {patient.firstName} {patient.lastName}</h1>
            <span className="text-gray-500">|</span>
            <span className="text-gray-500">MRN: {patient.id}</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm">
            <div className="flex items-center gap-1 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{patient.dob} | {patient.age}</span>
            </div>
            
            <div className="flex items-center gap-1 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <span>{patient.gender}</span>
            </div>
            
            <div className="flex items-center gap-1 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{patient.phone}</span>
            </div>
            
            <div className="flex items-center gap-1 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{patient.email}</span>
            </div>
          </div>
          <button className="cursor-pointer mt-2 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          Add service
        </button>
        </div>
        
        
      </div>
      </div>
    </div>
  );
}
