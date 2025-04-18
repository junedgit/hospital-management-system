export default function AdmissionNotes() {
  const admissions = [
    {
      id: 1,
      admittedOn: '12/12/2024, 10:30AM',
      dischargedOn: null,
      reason: 'This is a sample reason for admission',
      admittedBy: 'Dr. Raj Kumar',
      ward: 'Sample ward',
      roomNumber: '24',
      bedNumber: '08',
      status: 'active'
    },
    {
      id: 2,
      admittedOn: '12/12/2024, 10:30AM',
      dischargedOn: '25/12/2024, 05:30AM',
      reason: 'This is a sample reason for admission',
      admittedBy: 'Dr. Raj Kumar',
      ward: 'Sample ward',
      roomNumber: '24',
      bedNumber: '08',
      status: 'discharged'
    },
    {
      id: 3,
      admittedOn: '12/12/2024, 10:30AM',
      dischargedOn: '25/12/2024, 05:30AM',
      reason: 'This is a sample reason for admission',
      admittedBy: 'Dr. Raj Kumar',
      ward: 'Sample ward',
      roomNumber: '24',
      bedNumber: '08',
      status: 'discharged'
    }
  ];

  return (
    <div className="w-full h-full  flex bg-white flex-col">
          <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
            <h1 className="text-lg font-bold">Admission Note</h1>
            <button className="text-white px-3 py-1 bg-[#0D8E83] rounded-lg text-sm">New patient registration</button>
          </div>
          <div className="flex gap-4 p-4 text-gray-500 font-medium">
            <h3 className="text-base">Details</h3>
            <h3 className="text-base">Appoinment</h3>
            <h3 className="text-base border-b-2 border-[#0D8E83] text-[#0D8E83]">
            Admission
            </h3>
          </div>
          <div className="space-y-4 p-4">
      {admissions.map(admission => (
        <div key={admission.id} className="border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between mb-1">
            <div className="text-gray-500 text-sm">
              ADMITTED ON: {admission.admittedOn}
              {admission.dischargedOn && (
                <>
                  <span className="mx-2">|</span>
                  DISCHARGED ON: {admission.dischargedOn}
                </>
              )}
            </div>
            <div className="flex items-center">
              {admission.status === 'discharged' && (
                <span className="bg-red-100 text-red-500 text-sm px-2 py-1 rounded mr-2">
                  Discharged
                </span>
              )}
              {admission.status === 'active' && (
                <span className="text-teal-600 font-medium">
                  Administrator patient
                </span>
              )}
              {admission.status === 'discharged' && (
                <span className="text-teal-600 font-medium">
                  View details
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-gray-800 mb-4">
            {admission.reason}
          </div>
          
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            <div className="pr-4">
              <div className="text-gray-500 text-sm mb-1">Admitted by</div>
              <div className="font-medium">{admission.admittedBy}</div>
            </div>
            <div className="px-4">
              <div className="text-gray-500 text-sm mb-1">Ward</div>
              <div className="font-medium">{admission.ward}</div>
            </div>
            <div className="px-4">
              <div className="text-gray-500 text-sm mb-1">Room number</div>
              <div className="font-medium">{admission.roomNumber}</div>
            </div>
            <div className="pl-4">
              <div className="text-gray-500 text-sm mb-1">Bed number</div>
              <div className="font-medium">{admission.bedNumber}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
  )
}



