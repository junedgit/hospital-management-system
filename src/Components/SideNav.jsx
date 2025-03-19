import React from 'react'
import Menu from './Menu'

const SideNav = () => {
  const openMenu = () => {
    const menu = document.querySelector('.menu');
    menu.classList.remove('hidden');
  }
  return (
    <div className="flex h-full">
      <div className='bg-[#06413C] w-20 px-2 flex flex-col justify-between text-white'>
      <div className='flex flex-col items-center gap-4 mt-6'>
        <div className="logo">
          <img className='w-12 h-10 object-cover' src="/images/logo.svg" alt="" />
        </div>
        <div className="flex flex-col items-center gap-4">
        <img className='w-8 h-8 object-cover' src="images/sheild.svg" alt="" />
          <button className='cursor-pointer' onClick={openMenu}><img className='w-8 h-8 object-cover' src="images/person-add.svg" alt="" /></button>
          <img className='w-8 h-8 object-cover' src="images/stethoscope.svg" alt="" />
          <img className='w-8 h-8 object-cover' src="images/biotech.svg" alt="" />
          <img className='w-8 h-8 object-cover' src="images/home_storage.svg" alt="" />
          <img className='w-8 h-8 object-cover' src="images/cap.svg" alt="" />
          <img className='w-8 h-8 object-cover' src="images/receipt.svg" alt="" />
        </div>
        </div>
        <div className="flex flex-col items-center mb-6 gap-4 cursor-pointer">
          <img className='w-8 h-8 object-cover' src="/images/settings.svg" alt="" />
          <img className='w-8 h-8 object-cover' src="/images/log-out.svg" alt="" />
        </div>
      </div>
      <Menu/>
    </div>
  )
}

export default SideNav