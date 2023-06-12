import {privateAxios} from "./axios.service"
// product related api calls
export const addCategory=(category)=>{
    return privateAxios
    .post(`/categories`,category)
    .then(response=>response.data)


}