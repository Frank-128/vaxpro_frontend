"use client"
import React from 'react';
import { Menu } from '@mui/icons-material';
import { Input } from '@material-tailwind/react';
// import { usePathname } from 'next/navigation';

function Navbar({ openNavbar, setOpenNavbar }) {
//   const pathname = usePathname();

  return (
    <nav
      className={`fixed left-0 top-0 p-2 overflow-x-scroll h-20 bg-white flex items-center justify-between border-b-[0.5px] border-[#494747] transition-all duration-300 ${
        openNavbar ? 'md:left-[300px] md:w-[calc(100vw-300px)] ' : 'md:left-0  md:w-screen'
      }`}
    >
      <div className='flex gap-2 items-center'>
        <Menu onClick={() => setOpenNavbar(!openNavbar)} />
        <Input label='search' />
      </div>
      <div>
        <div>
          <h1>Welcome, Chief Doctor</h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
