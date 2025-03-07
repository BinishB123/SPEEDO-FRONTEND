import { axiosInstance } from "../api/axios"
import speedoApi from "../api/speedo.jsx"



export const uploadFile = (formData) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post(speedoApi.upload, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        ).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}


export const fetchTrips = (id)=>{
    return new Promise((resolve, reject) => {
        axiosInstance.get(speedoApi.fetchTrips+`/${id}`).then((response)=>{
            
            resolve(response)
        }).catch((error)=>{
            console.log(error);
            
            reject(error.response)
        })
    })
}


export const fetchTripDataWithrequiredData = (id)=>{
    return new Promise((resolve,reject)=>{
        axiosInstance.get(speedoApi.fetchTripDataWithrequiredData+`/${id}`).then((response)=>{
            console.log(response);
            
            resolve(response)
        }).catch((error)=>{
            reject(error.response)
        })
    })
}

export const deleteTripsApi = (ids,userid)=>{
    return new Promise((resolve, reject) => {
        axiosInstance.delete(speedoApi.deleteTrips+`/${ids}/${userid}`).then((response)=>{
            resolve(response)
        }).catch((error)=>{
            reject(error)
        })
    })
}
