import React from 'react'

function Sidebar({openNavbar}) {
  return (
    <div className={`${!openNavbar ? '-left-[300px]' : ''} w-[300px] fixed h-screen bg-[#212b36] md:block hidden`}>
        <div>
            <h1 className='font-monte-1 text-white text-3xl text-center p-2'>VaxPro</h1>
        </div>

    </div>
  )
}

export default Sidebar