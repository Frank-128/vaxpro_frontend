"use client"

import React, { useEffect } from 'react'
import SarufiChatbox from "react-sarufi-chatbox"
  
// usage

function ChatPage() {
 
  return (
    <div className='w-screen h-screen  flex items-center justify-center'>
        <div className=''>
            <p className='text-5xl'>Karibu katika huduma kwa wateja ya VaxPro</p>
            <p className='text-2xl'>Kwa maswali yoyote wasiliana nasi kupitia +255745884011,</p>
            <p className='italic text-lg'>pia unaweza kuongea na mtoa huduma wetu anaepatikana masaa yote kupitia tovuti hii,
                bonyeza kitufe cha bluu kuanza
                 </p>

        </div>
        <SarufiChatbox botId={3506} />
    </div>
  )
}

export default ChatPage