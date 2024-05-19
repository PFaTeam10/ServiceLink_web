 import axios from "axios";

import Cookies from 'universal-cookie';


const root = "api/reclamation"
const cookie = new Cookies() 

// export async function AddReclamation(data:Reclamation): Promise<any> {
//     try {
//         const token = await AsyncStorage.getItem('token');
//         console.log(data)
//         const url = `http://localhost:8080/${root}/create`;
//         const response = await axios.post(url,data,{
//             headers: {
//                 'Authorization': token
//             }});
//         console.log(response.data)
//         return response.data.data;
//     } catch (error) {
//         throw error;
//     }
// }

export async function getReclamations(): Promise<any> {
    try {
        // const cookie_ = cookie.get('token-cookie') 
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/serviceprovider`

        console.log(url)
        const response = await axios.get(url, {
            headers: {
                'Authorization': "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTYxNDE0NjgsImV4cCI6MTcxODczMzQ2OH0.v6wgJtXfpNNdkbtcp4aEZHZoYjUYH-DxJ-qxZTRPitwteyG9gtUnVDFBu59ng8XZiaV_wneL3Eu4zFBM2Btlhg"
            }
            
        })
        return response.data.data 
 
    } catch (error) {
        throw error;
    }
}
export async function updateReclamation(data:IReclamation): Promise<any> {
    try {
        // const cookie_ = cookie.get('token-cookie') 
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/${data.id}`

        console.log(url)
        const response = await axios.put(url,data,{
            headers: {
                'Authorization': "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTYxNDE0NjgsImV4cCI6MTcxODczMzQ2OH0.v6wgJtXfpNNdkbtcp4aEZHZoYjUYH-DxJ-qxZTRPitwteyG9gtUnVDFBu59ng8XZiaV_wneL3Eu4zFBM2Btlhg"
            }
            
        })
        return response.data.data 
 
    } catch (error) {
        throw error;
    }
}