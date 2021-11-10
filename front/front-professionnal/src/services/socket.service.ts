import { Injectable, isDevMode } from '@angular/core';
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment';

const IO_ROOM = "testRoom"

@Injectable({
    providedIn: 'root'
  })
export class SocketService {
    private socket
    constructor(){}
    
    socketInit(){
        this.socket = io(environment.apiUrl)
        this.socket.emit("joinRoom", IO_ROOM)
        this.socket.on("message", (message) => {
            console.log("[SOCKET] Message recu : ", message)
        })
    }

    sendMessage(message: any){
        this.socket.emit("message", ({room: IO_ROOM, message:message}))    }
}