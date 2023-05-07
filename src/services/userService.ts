import axios from 'axios';
import { api } from '../components/common/http-common';
    

class AuthService {


    regAcc  (postUser:any){
        // Post request
        return axios.post(`${api.uri}/users`, postUser, {
        // headers:  
        //     authHeader() // for auth 
        });
    }
  
}


export default new AuthService();

