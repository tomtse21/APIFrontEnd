import axios from "axios";
import { api } from "../components/common/http-common";
import authHeader from "../services/authHeader";

export default class AuthService {

    static getCurrentUser = ()=>{
        return  localStorage.getItem('atoken');
    }

   static LogoutOut = () =>{
    localStorage.removeItem("atoken");
    }
}

