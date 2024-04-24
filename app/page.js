import { HomeMax } from '@mui/icons-material'
import React from 'react'

function Home() {
  return (
    <div className=''>
      {Array(100).fill().map((index)=>(<div key={index}>lorem50</div>))}
    </div>
  )
}

export default Home