import { Status } from "@/enum/enum";

export interface IReclamation {
    id:string;
    title: string;
    description: string;
    localization: string;
    priority: string;
    serviceProvider: Object; 
    date: Date;
    citizen?: ICitizen;
    media?: []; 
    status: Status
  }
  