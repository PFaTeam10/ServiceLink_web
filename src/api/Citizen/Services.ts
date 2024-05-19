// 'use server'
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const root = 'api/citizen';

// export async function SigninUser(data: any): Promise<any> {
//     try {
//         const url = `http://localhost:8080/${root}/signin`;
//         console.log(url)
//         const response = await axios.post(url, data);
//         console.log("token : " , response.data.data)
//         // Store the token in AsyncStorage
//         await AsyncStorage.setItem('token', response.data.data);

//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// export async function SignupUser(data: any): Promise<any> {
//     try {
//         const url = `http://localhost:8080/${root}/signup`;
//         const response = await axios.post(url, data);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }