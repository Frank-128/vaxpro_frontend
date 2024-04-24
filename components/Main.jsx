"use client"
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Main({children}) {
    const [openNavbar,setOpenNavbar] = useState(true);
  return (
    <main>
        <Sidebar openNavbar={openNavbar} />
        
       <Navbar openNavbar={openNavbar} setOpenNavbar={setOpenNavbar} />
       <section>

{children}
       </section>
        </main>
  )
}

export default Main