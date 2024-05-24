 "use client"
 import React, {
  useState,
  useEffect, 
} from 'react';
  
  
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; 
import DefaultLayout from '@/components/Layouts/DefaultLayout';

 
function formatDate(date: string): string {
  return date.split('T')[0];  
}

var client:any =null;
export default function Chat() {
  const [IDCitizen, setIDCitizen] = useState<string>(null);
  

  const [newMessage, setNewMessage] = useState<string>();
  
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
      console.log('onConnected'); 
      client?.subscribe('/chatroom/public', onMessageReceived); 
      client.publish({
        destination: '/app/join',
        body:'663b073ccbe2ad2e7a73a861', // Replace with the actual service provider ID
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
    
    const GetID= async () => {
    
      setIDCitizen("663aff7fb5b3a47fa04fb258");
    };
  
    useEffect(() => {
      if(client==null){
        connect();
        GetID();
        console.log("connect")
      }else{
        console.log("client")
      }
   
  
      return () => {
        client?.deactivate();
      };
    }, [client]);

    useEffect(() => {    
      console.log("messages",messages);

  }, [messages]);
    const handleSendMessage = () => {

        const chatMessage = {  
         
          isCitizenSender:false,
          serviceProvider: {
            id: "663b073ccbe2ad2e7a73a861"
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
    
    };
 
    const render = (item: IMessage) => {
      console.log("item", item);
      return (
        <>
        
          {item.CitizenSender? (
            <div>
            <label>{item.citizen?.username}</label>
            <label>{item.message}</label>
            <label>{formatDate(item.timestamp)}</label>
          </div>
          ) : (
            <div> 
              <label>{item.message}</label>
              <label>{formatDate(item.timestamp)}</label>
            </div>
          )}
        </>
      );
    };
    const RenderMessage: React.FC<{ item: IMessage }>  = ({ item }:{item:IMessage}) => {
     console.log(item)
      return (
        <>
         { item.isCitizenSender ? ( 
              <div className="self-start bg-blue-100 p-4 rounded-lg mr-4 my-2 max-w-xs">
                <p className="font-bold mr-2">{item.citizen?.username}</p>
                <p>{item.message}</p>
                <p className="text-gray-500 text-sm">{formatDate(item.timestamp)}</p>
              </div>
            ) : (
              <div className="self-end bg-gray-200 p-4 rounded-lg my-2 max-w-xs"> 
                <p>{item.message}</p>
                <p className="text-gray-500 text-sm">{formatDate(item.timestamp)}</p>
              </div>
            )
           }
        </>
      );
    };
    return (
     
      <DefaultLayout>
      <div className="flex flex-col  h-screen">
        <div className="flex-1 overflow-y-auto ">
          {messages.map((item) => (
          <RenderMessage key={item.id} item={item} />
        ))}
          {/* {messages.map((item) => (
            <div key={item.id} className={`mb-4 ${item.isCitizenSender? 'self-end' : 'self-start'}`}>
              <div className={`p-2 rounded ${item.isCitizenSender ? 'bg-green-200' : 'bg-gray-200'}`}>
                {
                  item.isCitizenSender
                  ?
                  <p className="font-bold">{item.citizen.username}</p> 
                  :
                  <p className="font-bold">{item.serviceProvider.name}</p>

                }
                <p>{item.message}</p>
                <p className="text-xs">{formatDate(item.timestamp)}</p>
              </div>
            </div>
          ))} */}
        </div>
        <div className="flex  items-center p-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 mr-4 p-2 rounded border border-gray-300"
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} className="p-2 rounded bg-blue-500 text-white border-none cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </DefaultLayout>
    );
} 
  
const styles = {
  messageInputContainer: "flex-row border-2 border-gray-300 items-center bg-gray-100 rounded-2xl px-4 py-2 mx-4 mb-4",
  messageInput: "flex-1 text-base px-4 h-full border-0 focus:outline-none",
  sendButton: "ml-4 p-2 rounded-full",
  name: "text-lg font-bold mr-4",
  date: "self-end text-gray-500 text-sm",
  messageContent: "bg-gray-100 p-4 rounded-lg",
  messageText: "text-base",
  container: "flex-1 bg-white pt-4",
  ownMessageContainer: "self-end bg-blue-100 p-4 rounded-lg mr-4 my-2 max-w-xs",
  otherMessageContainer: "bg-gray-200 p-4 rounded-lg my-2 max-w-xs",
};