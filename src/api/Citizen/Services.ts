"use server"
import axios from 'axios'; 
import { cookies } from "next/headers";

const root = 'api/citizen';

export async function GetAllCitizens() {
    try {
        const token = cookies().get('token-cookie');
        if(token!=undefined){
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`
        
            const cookie_ = token.value
             const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${cookie_}`
                }
            });
            console.log(response)
            return response.data.data
        }
       
    } catch (error:any) {
        throw error
    }
}