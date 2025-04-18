import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddParameters() {
    
        const [ranges, setRanges] = useState([
          { id: 1, gender: 'Male', specialCondition: '', age: 'All', min: '13.8', max: '17.2' },
          { id: 2, gender: 'Female', specialCondition: '', age: 'All', min: '12.1', max: '15.1' },
          { id: 3, gender: 'Female', specialCondition: 'If pregnant', age: 'All', min: '11.0', max: '14.0' },
          { id: 4, gender: 'All', specialCondition: '', age: 'Child (1-10y)', min: '11.0', max: '14.0' },
          { id: 5, gender: 'All', specialCondition: '', age: 'Newborn', min: '14.0', max: '24.0' },
        ]);
      
        const handleAddRange = () => {
          const newId = ranges.length > 0 ? Math.max(...ranges.map(r => r.id)) + 1 : 1;
          setRanges([...ranges, { id: newId, gender: 'All', specialCondition: '', age: 'All', min: '', max: '' }]);
        };
      
        const handleDeleteRange = (id) => {
          setRanges(ranges.filter(range => range.id !== id));
        };
    
  return (
    <div className="w-full h-full  flex bg-white flex-col">
    <div className="flex justify-between items-center border-b-2 border-gray-400 p-4">
      <h1 className="text-lg font-bold">Add parameter</h1>
      <div className="flex gap-4">
          <Link to={"/"} className='bg-[#F0F2F5] border border-gray-400 px-4 py-0.5 text-sm rounded-lg'>Cancel</Link>
          <Link to={"/referral-fill"} className='cursor-pointer bg-[#0D8E83] px-4 py-1 text-sm rounded-lg text-white'>Add</Link>
      </div>
    </div>
    <div className="border border-gray-200 rounded-lg h-full p-4 bg-[#FDFDFE]">
      {/* Basic Details Section */}
      
        <h3 className="text-gray-600 font-medium uppercase text-sm mb-4">BASIC DETAILS</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Parameter <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded p-2"
              value="Hemoglobin (Hb)"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 appearance-none bg-white">
                <option>Hematology</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Unit <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 appearance-none bg-white">
                <option>g/dL</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Method
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded p-2"
              value="Cyanmethemoglobin / Automated"
            />
          </div>
        </div>
      
      
      {/* Normal Range Section */}
      <div className="mt-4">
        <h3 className="text-gray-600 font-medium uppercase text-sm mb-4">NORMAL RANGE</h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
          <p className="font-medium mb-2">Instructions on setting normal range</p>
          
          <div className="flex items-start mb-2">
            <div className="flex-shrink-0 bg-gray-700 text-white p-1 rounded mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
            </div>
            <p className="text-sm">To set a range, enter both Min and Max (e.g., 4 - 6).</p>
          </div>
          
          <div className="flex items-start mb-2">
            <div className="flex-shrink-0 bg-gray-700 text-white p-1 rounded mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm">To set "less than", enter only Max (e.g., Max = 200 → shown as &lt;200).</p>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-gray-700 text-white p-1 rounded mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm">To set "greater than", enter only Min (e.g., Min = 10 → shown as &gt;10).</p>
          </div>
        </div>
        
        <div className="bg-cyan-50 rounded overflow-hidden mb-2">
          <div className="grid grid-cols-5 gap-2 p-2 text-sm font-medium text-gray-700">
            <div>GENDER</div>
            <div>SPECIAL CONDITION</div>
            <div>AGE</div>
            <div>MIN</div>
            <div>MAX</div>
          </div>
        </div>
        
        {ranges.map((range) => (
          <div key={range.id} className="grid grid-cols-5 gap-2 mb-2">
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 appearance-none bg-white">
                <option value="Male" selected={range.gender === 'Male'}>Male</option>
                <option value="Female" selected={range.gender === 'Female'}>Female</option>
                <option value="All" selected={range.gender === 'All'}>All</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            
            <div>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter"
                value={range.specialCondition}
              />
            </div>
            
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 appearance-none bg-white">
                <option value="All" selected={range.age === 'All'}>All</option>
                <option value="Child (1-10y)" selected={range.age === 'Child (1-10y)'}>Child (1-10y)</option>
                <option value="Newborn" selected={range.age === 'Newborn'}>Newborn</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            
            <div>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded p-2"
                value={range.min}
              />
            </div>
            
            <div className="flex">
              <input 
                type="text" 
                className="flex-grow border border-gray-300 rounded-l p-2"
                value={range.max}
              />
              <button 
                onClick={() => handleDeleteRange(range.id)}
                className="bg-white border border-red-500 text-red-500 rounded-r px-2 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        <button 
          onClick={handleAddRange}
          className="mt-2 flex items-center text-teal-500 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add
        </button>
      </div>
    </div>
  </div>
  )
}