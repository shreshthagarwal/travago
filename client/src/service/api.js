import axios from "axios"
import { API_MESSAGES, SERVICE_URLS } from "../constants/config"
import { getAccessToken, getType } from "../utils/common-utils"

const API_URL = "https://travora-backend.vercel.app"

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
})

axiosInstance.interceptors.request.use(
    function (config){
        if (config.TYPE.params){
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + "/" + config.TYPE.query
        }
        return config;
    }, 
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        return processResponse(response);
    },
    function (error){
        return Promise.reject(processError(error))
    }
)

const processResponse = (response) => {
    if (response?.status === 200){
        return{
            isSuccess:true, data: response.data
        }
    } else {
        return {
            isFailure:true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code

        }
    }
}

const processError = (error) => {
    if (error.response) {
        console.log("Error in response: ",error.toJSON());
        return{
            isError: true,
            msg: API_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request){
        console.log("Error in request: ",error.toJSON());
        return{
            isError: true,
            msg: API_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        console.log("Error in network: ",error.toJSON());
        return{
            isError: true,
            msg: API_MESSAGES.networkIssues,
            code: error.response.status
        }
    }
}

const API = {}

for (const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] =  (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data:body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent){
                if (showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: function(progressEvent){
                if (showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }

        });
}

export {API};
