import React, { useState } from 'react';

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    referralType: '',
    referralCode: '',
    speciality: '',
    qualification: '',
    hospitalName: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-7xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="border border-[#D0D5DD] rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-gray-700 font-medium uppercase text-sm mb-4">Referral Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="block text-sm">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">Middle name</label>
              <input
                type="text"
                placeholder="Enter"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">
                Referral type <span className="text-red-500">*</span>
              </label>
              <select
                name="referralType"
                value={formData.referralType}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
                required
                
              >
                <option value="">Select</option>
                <option value="Referral type 1">Referral tpe 1</option>
                <option value="Referral type 2">Referral type 2</option>
                <option value="Referral type 3">Referral type 3</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">
                Referral code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">Speciality</label>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              >
                <option value="">Select</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">Qualification</label>
              <input
                type="text"
                placeholder="Enter"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">Hospital/clinic name</label>
              <input
                type="text"
                placeholder="Enter"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="border border-[#D0D5DD] rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-gray-700 font-medium uppercase text-sm mb-4">Contact Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 space-y-1">
              <label className="block text-sm">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">City</label>
              <input
                type="text"
                placeholder="Enter"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">Pin code</label>
              <input
                type="text"
                placeholder="Enter"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder='Enter'
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder='Enter'
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] bg-[#F7F9FC] rounded p-2 text-sm"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReferralForm;