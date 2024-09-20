import {startServer } from "./../server.js"
 
let io;

export async function initialSocket(){
    console.log("Initialized socket")
    if (!io){
        io = await startServer();
    }
    return io;
}

export function getIo(){
    console.log("getting socket");
    console.log(io);
    if (!io){
        throw new Error("Socket io is not initialized");
    }
    return io
}