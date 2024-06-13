"use client"
import globalUser from '@/store/user';
import axios from '../../../axios';
import React,{useEffect, useState} from 'react'
import { useEcho } from '@/constants/echo';


const ChatContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader />
      <MessageList />
      <ChatInput />
    </div>
  );
};

const MessageItem = ({ user, text }) => {
    return (
      <div className="mb-4">
        <div className="text-sm text-gray-500">{user}</div>
        <div className="bg-white p-2 rounded shadow-md">{text}</div>
      </div>
    );
  };

const ChatHeader = () => {
    const loggedInUser = globalUser(state=>state.loggedInUser)
    console.log(loggedInUser)
    return (
      <div className="p-4 bg-blue-600 text-white text-center">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <span>Hi, {loggedInUser?.id}</span>
      </div>
    );
  };


  const messages = [
    { id: 1, user: 'Alice', text: 'Hi there!' },
    { id: 2, user: 'Bob', text: 'Hello!' },
  ];
  
  const MessageList = () => {
    return (
      <div className="flex-1 p-4 overflow-auto">
        {messages.map(message => (
          <MessageItem key={message.id} user={message.user} text={message.text} />
        ))}
      </div>
    );
  };

  const ChatInput = () => {
    const [message, setMessage] = useState('');
    const loggedInUser = globalUser(state=>state.loggedInUser)
    const authenticatedToken = globalUser(state=>state.authenticatedToken)


    const sendMessage = async() => {
      if (message.trim()) {
       const res = await axios.post('send_message',{sender:loggedInUser.id,receiver:102,message}, {
            headers: {
              Authorization: `Bearer ${authenticatedToken}`,
            }})
        
            console.log(res.data)

        setMessage('');
      }
    };
  
    return (
      <div className="p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
      </div>
    );
  };
  
  
  
  


function ChatMessage() {
  const loggedInUser = globalUser(state=>state.loggedInUser)
    const echo = useEcho()
    useEffect(() => {
        if(echo && loggedInUser?.id){
            echo.private(`chat.${loggedInUser?.id}`).listen('MessageSent',event=>{
              console.log('Real time event received',event)
            })
          }
    }, [echo,loggedInUser?.id]);
  return (
    <ChatContainer />
  )
}

export default ChatMessage