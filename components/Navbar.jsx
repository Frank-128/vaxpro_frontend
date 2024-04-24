"use client"
import { navlinks } from '@/constants'
import { Input } from '@material-tailwind/react'
import { Menu } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar({openNavbar,setOpenNavbar}) {
    const pathname = usePathname()
  return (
    <nav className={`fixed ${openNavbar ? 'left-0 md:left-[300px] w-screen md:w-[calc(100vw-300px)] transition ease-in-out delay-150':' w-screen'}  left-0 top-0 p-2  overflow-x-scroll h-20 bg-white flex items-center justify-between   border-b-[0.5px] border-[#494747]`}>
        <div className='flex gap-2 items-center'>
            <Menu onClick={()=>setOpenNavbar(!openNavbar)} />
            <Input label='search' />
        </div>
       <div>
        <div>
            <h1>Welcome,Chief Doctor</h1>
        </div>

       </div>
    </nav>
  )
}

export default Navbar