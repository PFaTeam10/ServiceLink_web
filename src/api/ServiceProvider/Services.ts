"use server";

import axios from 'axios';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

const root = 'api/serviceprovider';

export async function SigninServiceProvider(data: any): Promise<any> {
    try {
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/signin`;
        const response = await axios.post(url, data);
 
        cookies().set("token-cookie",response.data.data,{
            path: '/', 
            maxAge: 3600,
        })
    
        return response.data;  
    } catch (error: any) {
        console.log(error)
        throw error;
    }
}

export async function SignupServiceProvider(data: any): Promise<any> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/signup`;
        const response = await axios.post(url, data);
        return response;
    } catch (error: any) {
        throw error;
    }
}


export async function GetServiceProvidersDetails() {
    try {
        const token = cookies().get('token-cookie');
        if(token!=undefined){
        const cookie_ = token.value
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/`;
   
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${cookie_}`
            }
        });
        return response.data.data;}
    } catch (error: any) {
        throw error;
    }
}

// export async function GetServiceProviderID() {
//     try {
//         const token = cookies().get('token-cookie'); 
//         if (token !== undefined) {

//             console.log(token.value)
//             const id = jwtDecode(token.value).sub;
//             console.log(id)
//             return id;
//         }
//     } catch (error: any) {
//         throw error;
//     }
// }

export async function LogoutServiceProvider() {
    try {
      
        cookies().delete('token-cookie');
          
    } catch (error: any) {
        console.error("Logout error:", error);
        throw error; // Rethrow the error for further handling
    }
}