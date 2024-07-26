"use server" 

 import { IReclamation } from "@/app/interfaces/interface";
import axios from "axios";  
import { cookies } from "next/headers";

const root = "api/reclamation"  
 
export async function getReclamationsAccepted(): Promise<any> {
    try { 
        const token = cookies().get('token-cookie');
        if(token!=undefined){
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/serviceprovider/accepted`
        
            const cookie_ = token.value
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${cookie_}`
                }
            }); 
            return response.data.data 
         } 
    } catch (error) {
        throw error;
    }
}

export async function getReclamationsIgnored(): Promise<any> {
    try { 
        const token = cookies().get('token-cookie');
        if(token!=undefined){
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/serviceprovider/ignored`
 
        const cookie_ = token.value
         const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${cookie_}`
            }
        });
        return response.data.data 
        }
    } catch (error) {
        throw error;
    }
}


export async function updateReclamation(data:IReclamation): Promise<any> {
    try { 
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/${data.id}`

        console.log(url)
        console.log(data) 
       
        const token = cookies().get('token-cookie');
        if(token!=undefined){
        const cookie_ = token.value
         const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${cookie_}`
            }
        });
        return response.data.data 
 }
    } catch (error) {
        throw error;
    }
}


export async function DeleteReclamation(id:string): Promise<any> {
    try { 
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/${id}`

        console.log(url) 
        const token = cookies().get('token-cookie');
        if(token!=undefined){
        const cookie_ = token.value
         const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${cookie_}`
            }
        });
        return response.data.data 
    } 
    } catch (error) {
        throw error;
    }
}
export async function GetReclamationById(id:string): Promise<any> {
    try { 
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/${id}`

        console.log(url)  
        const token = cookies().get('token-cookie');
        if(token!=undefined){
        const cookie_ = token.value
         const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${cookie_}`
            }
        });
        return response.data.data 
    }
    } catch (error) {
        throw error;
    }
}