import { Status } from "@/enum/enum";

interface IServiceProvider {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  }
   interface ICitizen {
    id:String;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string; 
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    city: string;
  }
 
  interface IMessage{
    id:String;
    citizen: ICitizen;  
    serviceProvider: IServiceProvider;  
    message: string;
    timestamp: Date;
  }
  interface IReclamation {
    id:string;
    title: string;
    description: string;
    localization: string;
    priority: string;
    serviceProvider: Object;
    status: Status;
    date?: string;
    citizen?: ICitizen;
    media?: []; 
  }
  
  