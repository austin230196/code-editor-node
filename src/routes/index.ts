import {Router} from "express";

import {getRoom, createRoom, getRooms, joinRoom, changeRoomLanguage, updateRoomCode, getCompilers} from "../controllers/room";
import { validateRoomId, validateOwner, validateUser } from "../middlewares";

const router = Router();


router.get("/rooms/:roomId", validateRoomId, getRoom);

router.get("/rooms", getRooms);

router.post("/room/new", validateOwner, createRoom);

router.patch("/room/language", validateRoomId, changeRoomLanguage);

router.get("/compilers", getCompilers);

// router.patch("/room/update", validateRoomId, updateRoomCode);

router.post("/room/join", validateRoomId, validateUser, joinRoom);


export default router;