import { axiosInstance } from "../api/axios"


export const login = (email,password)=>{
    return new Promise((resolve,reject)=>{
        axiosInstance.post('/auth/login',{email,password}).then((response)=>{
            resolve(response.data)
        }).catch((error)=>{
            console.log(error);
            
            reject(error.response.data)
        })
    })

}


