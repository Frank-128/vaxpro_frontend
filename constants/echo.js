import globalUser from "@/store/user";
import Echo from "laravel-echo";
import Pusher from 'pusher-js';
import { useState,useEffect } from "react";
import axios from '../axios';


window.Pusher = Pusher;

export const useEcho = ()=>{
    const [echoInstance,setEchoInstance] = useState(null);
    const authenticatedToken = globalUser((state) => state.authenticatedToken);
   
    useEffect(()=>{
        if (!authenticatedToken) return;

        const echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            authorizer: (channel) => {
                return {
                    authorize: (socketId, callback) => {
                        axios.post('/broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name,
                            headers: {
                                Authorization: `Bearer ${authenticatedToken}`,
                              },
                        })
                        .then(response => {
                            callback(false, response.data);
                        })
                        .catch(error => {
                            callback(true, error);
                        });
                    }
                };
            },
            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
            wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
            wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
            forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });
        setEchoInstance(echo)        
    },[])

    return echoInstance;
}

