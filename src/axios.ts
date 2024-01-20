import axios from "axios";



const instance = axios.create({
    baseURL: process.env.JUDGE0_URL,
    validateStatus: status => {
        return status >= 200 && status < 600
    }
})


export default instance;