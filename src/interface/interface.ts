import { Status } from "@/enum/enum";

export interface IServiceProvider {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    description?: string;
    image?: string;
  }
   export interface ICitizen {
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
 
  export interface IMessage{
    id:String;
    citizen: ICitizen;  
    serviceProvider: IServiceProvider;  
    message: string;
    timestamp: Date;
  }

  
  export interface IReclamation {
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
  
  