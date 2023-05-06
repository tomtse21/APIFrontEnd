import axios from 'axios';
import { api } from '../components/common/http-common';
    
export const regAcc = async (postUser:any) =>{
    // Post request
    axios.post(`${api.uri}/users`, postUser, {
    // headers:  
    //     authHeader() // for auth 
    }).then((res) => {
       return res.status;
    });
}
  


