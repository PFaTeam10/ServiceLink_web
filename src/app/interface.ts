// import { Status } from "@/enum/enum";

 interface IServiceProvider {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    description?: string;
    image?: string;
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
    isCitizenSender:boolean;
  }

  

  