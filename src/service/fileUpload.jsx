import { axiosInstance } from "../api/axios"



export const uploadFile = (formData)=>{
    return new Promise((resolve, reject) => {
        axiosInstance.post('/uploadData',formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            }
        ).then((response)=>{
            console.log(response);
            
        })
    })
}