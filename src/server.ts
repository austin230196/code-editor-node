import http from "http";
import type { AddressInfo } from "net";

import express, {NextFunction, Request, Response} from "express";
import loadEnv from "dotenv";
import mongoose from "mongoose";
import {WebSocketServer} from "ws";
const setupWSConnection = require("y-websocket/bin/utils").setupWSConnection;

//load env
loadEnv.config();

import apiRoutes from "./routes";
import AdvancedError from "./utils/AdvancedError";
import redisClient from "./utils/redis";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});
exports.app = app;

//json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Credentials", String(true));
    res.setHeader("Access-Control-Allow-Max-Age", 24 * 60 * 60);
    next();
})


//register routes
app.use("/api/v1", apiRoutes);
app.use("/", (req, res, next) => {
    return res.status(200).json({
        message: "API ALIVE!!!",
        success: true
    })
})

//wayward route handler
app.use((req, res, next) => {
    const e = new AdvancedError("Page not found", 404);
    next(e);
})

//general express error handler
app.use((error: AdvancedError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Server error',
        success: false
    });
});

server.on("error", err => {
    console.log("Sever error emitter: ", err.message);
    redisClient.disconnect();
})


wss.on("connection", (ws, req) => {
    console.log(ws);
    console.log(req);
    setupWSConnection(ws, req);
})


server.listen(process.env.PORT || 8000, async () => {
    try{
        await redisClient.connect();
        await mongoose.connect(process.env.MONGO_URL!, {});
        const address = server.address() as AddressInfo;
        console.log(`Server has started on http://${address.address}:${address.port}`);
    }catch(e: any){ console.log("Mongoose error: " + e.message) }
})
