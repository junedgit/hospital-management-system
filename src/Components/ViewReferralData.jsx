import React from 'react';

const ViewReferralData = () => {
  const referralData = {
    name: 'Rohil Reghu R',
    referralType: 'Internal Doctor',
    referralCode: '00100',
    speciality: 'Speciality sample 1',
    qualification: 'Sample qualification',
    hospitalName: 'Alpha clinic',
    address: 'abc street, xyz road',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: '111045',
    email: 'rohil@mail.com',
    phone: '1234567890'
  };

  const DataField = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="border-2 border-[#D0D5DD] rounded-lg p-4 bg-white shadow-xs">
          <h2 className="text-gray-700 font-medium uppercase text-sm mb-4">Referral Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
            <DataField label="Name" value={referralData.name} />
            <DataField label="Referral type" value={referralData.referralType} />
            <DataField label="Referral code" value={referralData.referralCode} />
            <DataField label="Speciality" value={referralData.speciality} />
            <DataField label="Qualification" value={referralData.qualification} />
            <DataField label="Hospital/clinic name" value={referralData.hospitalName} />
          </div>
        </div>
        
        {/* Contact Details Section */}
        <div className="border-2 border-[#D0D5DD] rounded-lg p-4 bg-white shadow-xs">
          <h2 className="text-gray-700 font-medium uppercase text-sm mb-4">Contact Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
            <DataField label="Address" value={referralData.address} />
            <DataField label="City" value={referralData.city} />
            <DataField label="State" value={referralData.state} />
            <DataField label="Pin Code" value={referralData.pinCode} />
            <DataField label="Email" value={
              <span className="text-blue-600">{referralData.email}</span>
            } />
            <DataField label="Phone" value={referralData.phone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReferralData;