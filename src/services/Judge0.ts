import axiosInstance from "../axios";




export default class Judge0 {
    static async getLanguages(){
        const res = await axiosInstance.get("/languages", {
            headers: {
                'X-RapidAPI-Key': process.env.JUDGE0_KEY,
                'X-RapidAPI-Host': process.env.JUDGE0_HOST,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    }
}