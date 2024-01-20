import redisClient from "../utils/redis";


export default class CacheService {
    static async set(k: string, v: string){
        const res = await redisClient.set(k, v);
        return res;
    }

    static async get(k: string){
        const res = await redisClient.get(k);
        return res;
    }
}