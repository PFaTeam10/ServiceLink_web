import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from 'universal-cookie';

const root = 'api/serviceprovider';
const cookie = new Cookies() 

// export async function GetServiceProviders(): Promise<any> {
//     try {
//         const token = await AsyncStorage.getItem('token');
//         const url = `http://localhost:8080/${root}/all`;
//         const response = await axios.get(url,{
//             headers: {
//                 'Authorization': token
//             }});
//         console.log(response.data)
//         return response.data.data;
//     } catch (error) {
//         throw error;
//     }
// }


// export async function GetServiceProviderById(id:string): Promise<any> {
//     try {
//         const token = await AsyncStorage.getItem('token');
//         const url = `http://localhost:8080/${root}/${id}`;
//         const response = await axios.get(url,{
//             headers: {
//                 'Authorization': token
//             }});
//         console.log(response.data)
//         return response.data.data;
//     } catch (error) {
//         throw error;
//     }
// }

export async function SigninServiceProvider(data:any): Promise<any> {
     try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/signin`
        const response = await axios.post(url, data);
        const cookies = new Cookies(response.data.data); 
        cookies.set('token-cookie',response.data.data, {
            path: '/'
        })
        console.log(cookies)
        return response;   
    } catch (error:any) {
       throw error
    }
}

export async function SignupServiceProvider(data:any): Promise<any> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/signup`
        const response = await axios.post(url, data);
        return response
    } catch (error:any) {
        throw error
    }
}

export function logoutServiceProvider() {
    const cookies = new Cookies();
    cookies.remove('token-cookie', { path: '/' });
}

export async function GetServiceProvidersDetails() {
    try {
        const cookie_ = cookie.get('token-cookie');
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/`
        const response = await axios.get(url,{
            headers: {
                'Authorization': cookie_
            }
        });
        console.log(response)
        return response.data.data
    } catch (error:any) {
        throw error
    }
}
