import type { Request, Response, NextFunction } from "express";

import AdvancedError from "../utils/AdvancedError";
import Room from "../models/Room";
import getId from "../utils/getId";
import Judge0 from "../services/Judge0";
import CacheService from "../services/CacheService";



export const getRoom = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const roomId = req.params.roomId;
        const room = await Room.findOne({
            roomId
        });
        
        if(!room) throw new AdvancedError("Room not found", 404);
        return res.status(200).json({
            message: "Room found successfully",
            success: true,
            data: room
        })
    }catch(e){ next(e);}
}


export const getCompilers = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //get apis
        let languages = await CacheService.get("languages");
        if(!languages){
            const res = await Judge0.getLanguages();
            if(!res.success) throw new AdvancedError(res.message, 500);
            languages = res.data;
            await CacheService.set("languages", JSON.stringify(languages));
        }
        console.log({languages})
        return res.status(200).json({
            message: "Compilers fetched successfully",
            success: true,
            data: languages
        });
    }catch(e){next(e)}
}


export const getRooms = async(_: Request, res: Response, next: NextFunction) => {
    try{
        const rooms = await Room.find();
        return res.status(200).json({
            message: "Rooms fetched successfully",
            success: true,
            data: rooms
        })
    }catch(e){ next(e);}
}


export const joinRoom = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {roomId, user} = req.body;
        const room = await Room.findOne({
            roomId
        });
        
        if(!room) throw new AdvancedError("Room not found", 404);
        if(!room.participants.includes(user)){
            room.participants = [...room.participants, user];
            await room.save();
        }

        return res.status(201).json({
            message: "Room joined successfully",
            success: true,
            data: room
        })
    }catch(e){ next(e);}
}


export const createRoom = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //create new room
        let newRoom = new Room({
            roomId: getId(16),
            owner: req.body.owner,
            code: "",
            participants: [req.body.owner],
            programmingLanguage: "C++"
        })
        await newRoom.save();

        return res.status(201).json({
            message: "Room created successfully",
            success: true,
            data: newRoom
        })
    }catch(e){ next(e);}
}


export const changeRoomLanguage = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {roomId, language} = req.body;
        const room = await Room.findOne({roomId});
        if(!room) throw new AdvancedError("Room not found", 404);
        room.programmingLanguage = language;
        room.code = "";
        await room.save();

        return res.status(201).json({
            message: "Language switch to " + language,
            success: true,
            data: room
        })
    }catch(e){next(e)}
}


export const updateRoomCode = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {roomId, code} = req.body;
        const room = await Room.findOne({roomId});
        if(!room) throw new AdvancedError("Room not found", 404);
        room.code = code;
        await room.save();

        res.status(201);
        return res.json({
            message: "Room code updated successfully",
            success: true
        });
    }catch(e){next(e)}
}