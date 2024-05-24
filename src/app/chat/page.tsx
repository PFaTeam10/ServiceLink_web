 "use client"
 import React, {
  useState,
  useEffect, 
} from 'react';
  
  
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; 
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { GetServiceProvidersDetails, getIDService } from '@/api/ServiceProvider/Services';
 
 
function formatDate(date: string): string {
  return date.split('T')[0];  
}

var client:any =null;
 
export default function Chat() {

  const [newMessage, setNewMessage] = useState<string>();
  const [idService, setIDService] = useState<string|null>(null);

   const [messages, setMessages] = useState<IMessage[]>([]); 

 
    const onMessageReceived = (payload) => { 
      const payloadData = JSON.parse(payload.body);
      console.log("onMessageReceived : ",payloadData)
    
      // Check if payload is valid and has the "MESSAGE" command
      if (payloadData != null && payload.command === "MESSAGE") {
        if(Array.isArray(payloadData)){
          setMessages(payloadData);   
        }else{
          setMessages((prev:IMessage) => [...prev, payloadData]);  
        }
       }
    }; 
    
  
    const onConnected = () => {
      console.log('onConnected',idService);
     
        client?.subscribe('/chatroom/public', onMessageReceived); 
        client.publish({
          destination: '/app/join',
          body:idService, // Replace with the actual service provider ID
        });
     
     
    };
    const connect = () => {
      console.log('connect');
      client = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws`),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = onConnected;
      client.activate(); 
   
    }; 
  
    useEffect(() => {
        if(idService==null){
          const id =getIDService();
          setIDService(id)
          
          console.log("connect") 
        }else{
          connect(); 
        }
     
   
    }, [idService]);

 
    const handleSendMessage = () => { 
      console.log("client : ",client)
      if(client){

        const chatMessage = {   
          citizen:{

          },
          citizenSender:false,
          serviceProvider: {
            id: idService
          },
          timestamp:new Date(),
          message: newMessage,
        };  
        console.log("newMessage ",newMessage)
    
          client.publish({
            destination: '/app/message',
            body: JSON.stringify(chatMessage),
          });
        
        setNewMessage('');  
      } 
    };
 
 
    const RenderMessage: React.FC<{ item: IMessage }>  = ({ item }:{item:IMessage}) => {
    
      return (
        <>
         { item.citizenSender ? ( 
              <div className="self-start bg-blue-100 dark:bg-blue-600 p-4 rounded-lg mr-4 my-2 max-w-xs">
                <p className="text-dark font-bold mr-2 dark:text-white">{item.citizen?.username}</p>
                <p className='text-gray-500 dark:text-white'>{item.message}</p>
                <p className="text-gray-500  dark:text-white text-xs">{formatDate(item.timestamp)}</p>
              </div>
            ) : (
              <div className="self-end bg-cyan-100 dark:bg-cyan-600  p-4 rounded-lg my-2 max-w-xs"> 
                <p className='text-gray-500 dark:text-white'>{item.message}</p>
                <p className="text-gray-500  dark:text-white  text-xs">{formatDate(item.timestamp)}</p>
              </div>
            )
           }
        </>
      );
    };
    return (
     
      <DefaultLayout>
    <div className={styles.container}> 
      <div className='flex flex-col max-h- overflow-y-auto'>
      {messages.map((item) => (
          <RenderMessage key={item.id} item={item} />
        ))}
              
      </div>
        

      <div className={styles.messageInputContainer}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.messageInput}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Send
          </button>
      </div>
      </div>
    </DefaultLayout>
    );
} 
const styles = {
  container: "flex flex-col h-full p-4   rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", // Full height, white background, padding
  messageInputContainer: "flex flex-row space-x-2  px-4 py-2  bg-transparent mb-4", // Row, centered, light gray background, rounded corners, padding, margin
  messageInput: "rounded border-2 border-blue-400 flex-grow px-4 py-2 h-full bg-transparent",
  sendButton: "p-2 rounded bg-blue-400 text-white border-none cursor-pointer",  
  // ... other styles remain the same ...
};
// const styles = {
//   messageInputContainer: "flex-row border-2 border-gray-300 items-center bg-gray-100 rounded-2xl px-4 py-2 mx-4 mb-4",
//   messageInput: "flex-1 text-base px-4 h-full border-0 focus:outline-none",
//   sendButton: "ml-4 p-2 rounded-full",
//   name: "text-lg font-bold mr-4",
//   date: "self-end text-gray-500 text-sm",
//   messageContent: "bg-gray-100 p-4 rounded-lg",
//   messageText: "text-base",
//   container: "flex-1 bg-white pt-4",
//   ownMessageContainer: "self-end bg-blue-100 p-4 rounded-lg mr-4 my-2 max-w-xs",
//   otherMessageContainer: "bg-gray-200 p-4 rounded-lg my-2 max-w-xs",
// };