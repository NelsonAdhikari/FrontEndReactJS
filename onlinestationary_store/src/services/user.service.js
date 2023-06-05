//user related API calls
import { publicAxios } from "./axios.service";

//userData ko through bataw data aauxa in json from API

//register new user
export const registerUser=(userData)=>{
  return  publicAxios.post('/users',userData).then((response)=>response.data);
};
//login User
export const loginUser=(loginData)=>{
  return publicAxios.post('/auth/login',loginData).then((response)=>response.data);

};