import { useState , useEffect, useContext } from 'react'
import { getTokenFromLocalStorage } from '../auth/HelperAuth'
import { isJwtExpired } from "jwt-check-expiration"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'



const useJwtTokenExpiration = () => {
    const [flag,setFlag]=useState(false)
   const navigate = useNavigate()
  const {logout}= useContext(UserContext)
 useEffect(()=>{
    const token = getTokenFromLocalStorage();
  try {
   if(isJwtExpired(token))
   {
      console.log("Token is expired");
      //perform other operation
      setFlag(true);
      toast.error("Session Expired !!")
      logout();
      navigate("/login");
   }
   
  } catch (error) {
   console.log(error);
  }
 },[]);
 return flag;
}

export default useJwtTokenExpiration