import axios from "axios";
import { privateAxios } from "./axios.service";

const apiEndPoint = "http://localhost:9090/api/v1/recommand";

//get product recommendation by product title

export const GetRecommendation=async(title)=>{
    const result=await privateAxios.post(`/api/v1/recommand/content-tdidf`,title)
    return result.data
}   