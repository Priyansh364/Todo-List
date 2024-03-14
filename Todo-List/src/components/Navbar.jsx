import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className='flex px-6 py-2 justify-between gap-4 bg-slate-700 text-white'>
        <div className='flex font-bold'> iTask</div>
        <ul className='flex gap-14'>
          <li className='cursor-pointer hover:font-bold '>Home</li>
          <li className='cursor-pointer hover:font-bold '>About</li>
        </ul>
      </nav>
      
    </>
  )
}

export default Navbar
