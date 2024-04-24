import React from 'react';

function Sidebar({ openNavbar }) {
  return (
    <div
      className={`w-[300px] transition-all duration-300 fixed h-screen bg-[#212b36] ${
        openNavbar ? 'left-0' : '-left-[300px]'
      } md:block hidden`}
    >
      <div>
        <h1 className='font-monte-1 text-white text-3xl text-center p-2'>VaxPro</h1>
      </div>
    </div>
  );
}

export default Sidebar;
