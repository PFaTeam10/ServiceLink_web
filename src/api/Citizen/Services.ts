import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies() 
const root = 'api/citizen';

export async function GetAllCitizens() {
    try {
        const cookie_ = cookie.get('token-cookie');
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`
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