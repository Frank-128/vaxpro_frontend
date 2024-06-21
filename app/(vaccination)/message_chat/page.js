"use client"
import globalUser from '@/store/user';
import axios from '../../../axios';
import React,{useEffect, useState} from 'react'
import { useEcho } from '@/constants/echo';
import { Howl } from 'howler';
import { Button,  } from '@material-tailwind/react';
import {  Notifications, Send } from '@mui/icons-material';
import { Badge } from '@mui/icons-material';
import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';



const ChatContainer = () => {
  const loggedInUser = globalUser(state=>state.loggedInUser)
  const [messages,setMessages] = useState([]);
  const [recipient,setRecipient] = useState(1)
  const echo = useEcho()
  const sound = new Howl({
    src:['/sound/new_message.wav']
  })

  const handleNewMessage = (message)=>{
    sound.play()
    setMessages(prev=>[...prev,message])
  }

  useEffect(() => {
      if(echo){
          echo.private(`chat.${loggedInUser.id}`).listen('MessageSent',event=>{
            console.log('Real time event received',event)
            handleNewMessage(event);
          })
        }
  }, [echo,loggedInUser?.id]);
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-100">
      <ChatHeader messages={messages} setRecipient={setRecipient} />
      <MessageList messages={messages} />
      <ChatInput recipient={recipient}  />
    </div>
  );
};

const MessageItem = ({ user, text,is_sender }) => {
    return (
    <>
      <div className={`${is_sender ?'self-end':'self-start'}  w-fit`}>
        <div className={`text-sm ${is_sender?"text-end":"text-start"} text-gray-500`}>{user}</div>
        
        <div class="w-max grid">
        <div class={`px-3.5 py-2 bg-white rounded-3xl ${is_sender ? 'rounded-tl-none' :'rounded-br-none'} justify-start  items-center gap-3 inline-flex`}>
          <h5 class="text-gray-900 text-sm font-normal leading-snug">{text}</h5>
        </div>
        <div class="justify-end items-center inline-flex mb-2.5">
          <h6 class="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h6>
        </div>
      </div>
      </div>
      <br/>
      <div className='mb-2'/>
    </>
    );
  };

const ChatHeader = ({messages,setRecipient}) => {
    const loggedInUser = globalUser(state=>state.loggedInUser)
     const iconRef = useRef(null)


    const handleVibrate = () => {
      const icon = iconRef.current;
      if (icon) {
        icon.classList.add('vibrate');
        setTimeout(() => {
          icon.classList.remove('vibrate');
        }, 500); // Duration of the vibration effect
      }
    };

    useEffect(()=>{
      
        handleVibrate()
      
    },[messages])

    return (
      <div className="p-4 bg-blue-600 text-white text-center">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <span>Hi, {loggedInUser?.id}</span> 
        <select onChange={(e)=>setRecipient(e.target.value)} name="" id="">
          <option value="1">Ministry</option>
          <option value="103">Nurse</option>
        </select>
        <IconButton ref={iconRef} className="message-icon">
        <Notifications/>
      </IconButton>
      </div>
    );
  };


  
  const MessageList = ({messages}) => {
    return (
      <div className="flex-1 p-4 flex flex-col overflow-auto">
        {messages.length == 0 ?"No New message":messages?.map((message,index) => (
          <MessageItem key={index} user={message.sender.id} text={message.message} is_sender={message.sender.id == 102} />
        ))}
      </div>
    );
  };

  const ChatInput = ({recipient}) => {
    const [message, setMessage] = useState('');
    const loggedInUser = globalUser(state=>state.loggedInUser)
    const authenticatedToken = globalUser(state=>state.authenticatedToken)


    const sendMessage = async() => {
      if (message.trim()) {
       const res = await axios.post('send_message',{sender:loggedInUser.id,receiver:recipient,message}, {
            headers: {
              Authorization: `Bearer ${authenticatedToken}`,
            }})
        

        setMessage('');
      }
    };
  
    return (
      <div className="p-4 bg-white border-t flex border-gray-200">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <Button onClick={()=>{
          sendMessage()
        }}>
          <Send/>
        </Button>
      </div>
    );
  };
  
  
  
  


function ChatMessage() {
 
  return (
    <ChatContainer />
  )
}

export default ChatMessage