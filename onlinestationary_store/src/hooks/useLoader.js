import React, {useState, useEffect} from 'react'
import { privateAxios } from '../services/axios.service';

import Swal from 'sweetalert2';

const useLoader = () => {
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        //request interceptor
        privateAxios.interceptors.request.use(
          (config)=>{
          setLoading(true);
          return config;
        },
        (error)=>{
          return Promise.reject(error);
        })
     
      //response interceptor
      privateAxios.interceptors.response.use((config)=>{
        setLoading(false);
        return config;
      },(error)=>{
        setLoading(false);
        if(error.code==='ERR_NETWORK'){
          // toast.error("Backend Server is Down!!");
          Swal.fire({
            title:'Network Error!!',
            html:'BackEnd Server is Down!!',
            icon:'error'
    
          })
    
        }
        return Promise.reject(error);
      })
    },[])
  return loading;
}

export default useLoader